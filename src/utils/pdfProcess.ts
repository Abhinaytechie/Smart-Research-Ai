import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import workerSrc from 'pdfjs-dist/legacy/build/pdf.worker?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

export const extractLinesAndRebuildPDF = async (file: File, fontBase64: string): Promise<File> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await (pdfjsLib as any).getDocument({ data: arrayBuffer }).promise;
  const newPdf = await PDFDocument.create();
  newPdf.registerFontkit(fontkit);

  const fontBytes = Uint8Array.from(atob(fontBase64), c => c.charCodeAt(0));
  const font = await newPdf.embedFont(fontBytes);

  for (let i = 0; i < pdf.numPages; i++) {
    const page = await pdf.getPage(i + 1);
    const viewport = page.getViewport({ scale: 1 });
    const textContent = await page.getTextContent();
    const newPage = newPdf.addPage([viewport.width, viewport.height]);

    // Group text items by Y position (line detection)
    const linesMap = new Map<number, { x: number; text: string; size: number }[]>();
    const tolerance = 2; // tolerance for grouping lines (you can fine-tune this)

    for (const item of textContent.items as any[]) {
      const text = item.str?.trim();
      if (!text) continue;

      const transform = item.transform;
      const x = transform[4];
      const y = transform[5];
      const fontSize = Math.sqrt(transform[0] ** 2 + transform[1] ** 2);

      // Find the closest Y match within tolerance
      let matchedY: number | undefined = undefined;
      for (const existingY of linesMap.keys()) {
        if (Math.abs(existingY - y) <= tolerance) {
          matchedY = existingY;
          break;
        }
      }

      const key = matchedY !== undefined ? matchedY : y;
      if (!linesMap.has(key)) {
        linesMap.set(key, []);
      }
      linesMap.get(key)!.push({ x, text, size: fontSize });
    }

    // Sort lines by Y descending (top to bottom)
    const sortedLines = [...linesMap.entries()].sort((a, b) => b[0] - a[0]);

    for (const [y, lineItems] of sortedLines) {
      const sortedItems = lineItems.sort((a, b) => a.x - b.x);
      const combinedText = sortedItems.map(item => item.text).join(' ');
      const avgFontSize = sortedItems.reduce((sum, t) => sum + t.size, 0) / sortedItems.length;

      newPage.drawText(combinedText, {
        x: sortedItems[0].x,
        y: viewport.height - y,
        font,
        size: avgFontSize || 10,
        color: rgb(0, 0, 0),
      });
    }
  }

  const rebuiltPdfBytes = await newPdf.save();
  return new File([rebuiltPdfBytes], `rebuilt-${file.name}`, {
    type: 'application/pdf',
    lastModified: Date.now(),
  });
};
