import { Observable } from 'rxjs';

export abstract class IApi {
  abstract get<T>(url: string, options?: any): Observable<T>;
  abstract post<T>(url: string, data: any | null, options?: any): Observable<T>;
  abstract put<T>(url: string, data: any | null, options?: any): Observable<T>;
  abstract delete<T>(url: string, options?: any): Observable<T>;
  abstract patch<T>(url: string, data: any | null, options?: any): Observable<T>;

}
