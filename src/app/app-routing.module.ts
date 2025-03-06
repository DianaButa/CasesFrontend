import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ClientiComponent } from './clienti/clienti.component';
import { NotiteComponent } from './notite/notite.component';
import { DosareComponent } from './dosare/dosare.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthGuard } from './services/authguard';
import { SidenavComponent } from './sidenav/sidenav.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dosare', component: DosareComponent },
  { path: 'clienti', component: ClientiComponent },
  { path: 'notite', component: NotiteComponent },
  { path: 'home', component: HomeComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'sidenav', component: SidenavComponent },
  { path: '', redirectTo: '/calendar', pathMatch: 'full' }, // Redirect to login/register by default
  { path: '**', redirectTo: '/calendar' },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
