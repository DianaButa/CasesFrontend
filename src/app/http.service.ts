import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    private url = 'https://localhost:7096/api/'; 
    constructor(private http: HttpClient) { }

    // Metoda GET
    public get<T>(endpoint: string): Observable<T> {
        const headers = this._setHeaders();
        return this.http.get<T>(`${this.url}${endpoint}`, { headers }).pipe(
            catchError(error => throwError(() => error.error))
        );
    }

    // Metoda POST
    public post<T>(endpoint: string, data: any): Observable<T> {
        const headers = this._setHeaders();
        return this.http.post<T>(`${this.url}${endpoint}`, data, { headers }).pipe(
            catchError(error => throwError(() => error.error))
        );
    }

    // Metoda PUT
    public put<T>(endpoint: string, data: any): Observable<T> {
        const headers = this._setHeaders();
        return this.http.put<T>(`${this.url}${endpoint}`, data, { headers }).pipe(
            catchError(error => throwError(() => error.error))
        );
    }

    // Metoda DELETE
    public delete<T>(endpoint: string): Observable<T> {
        const headers = this._setHeaders();
        return this.http.delete<T>(`${this.url}${endpoint}`, { headers }).pipe(
            catchError(error => throwError(() => error.error))
        );
    }

    // Setează antetele pentru cereri HTTP
    private _setHeaders() {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        });
        return headers;
    }
}
