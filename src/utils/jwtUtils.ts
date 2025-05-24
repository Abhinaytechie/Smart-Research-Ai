// utils/tokenUtils.ts
import{jwtDecode} from 'jwt-decode';

export function getTokenExpiry(token: string): number | null {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    return decoded.exp * 1000; // Convert to milliseconds
  } catch (err) {
    console.error('Invalid token:', err);
    return null;
  }
}
