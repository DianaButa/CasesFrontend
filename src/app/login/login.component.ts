import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        if (response && response.token) {
          console.log('Token primit:', response.token);
          localStorage.setItem('token', response.token); // Salvează token-ul corect
          console.log('Navigare către calendar...');
          setTimeout(() => {
            this.router.navigate(['/calendar']);
          }, 100);
        } else {
          console.log('Token-ul nu a fost primit');
        }
      },
      (error) => {
        console.error('Eroare login:', error);
        this.errorMessage = 'Email sau parolă incorecte!';
      }
    );
  }
}  
