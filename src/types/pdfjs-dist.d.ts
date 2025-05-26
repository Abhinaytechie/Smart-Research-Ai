declare module 'pdfjs-dist/build/pdf' {
  export const GlobalWorkerOptions: any;
  export function getDocument(src: any): any;
  // add other exports you use with 'any' type
}

declare module 'pdfjs-dist/legacy/build/pdf.worker.entry?url' {
  const workerSrc: string;
  export default workerSrc;
}
