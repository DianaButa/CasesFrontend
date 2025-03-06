import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'Account';

  constructor(private httpService: HttpService) {}

  // Înregistrare utilizator
  register(email: string, password: string): Observable<any> {
    return this.httpService.post(`${this.apiUrl}/register`, { email, password });
  }

  // Autentificare utilizator
  login(email: string, password: string): Observable<{ token: string }> {
    return this.httpService.post<{ token: string }>(`${this.apiUrl}/login`, { email, password });
  }

  // Verificare dacă utilizatorul este autentificat
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Verificăm dacă există un token în localStorage
  }

  // Logout utilizator
  logout(): void {
    localStorage.removeItem('token');
  }
}
