import { environment } from '../configs/environment';

export function url(path: string): string {
  return `${environment.api.baseURL}${path}`;
}
