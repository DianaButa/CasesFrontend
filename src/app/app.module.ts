import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogState } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatList, MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ClientiComponent } from './clienti/clienti.component';
import { AddFileDialogComponent } from './add-file-dialog/add-file-dialog.component';
import { AddEventDialogComponent } from './add-event-dialog/add-event-dialog.component';
import { NotiteComponent } from './notite/notite.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatSelectModule } from '@angular/material/select';
import { FileDetailsDialogComponent } from './file-details-dialog/file-details-dialog.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DosareComponent } from './dosare/dosare.component';
import { EditFileDialogComponent } from './dosare/edit-file-dialog/edit-file-dialog.component';
import { AddClientDialogComponent } from './clienti/add-client-dialog/add-client-dialog.component';
import { NotificationComponent } from './notification/notification.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CalendarComponent,
    DosareComponent,
    ClientiComponent,
    AddFileDialogComponent,
    AddEventDialogComponent,
    NotiteComponent,
    LoginComponent,
    RegisterComponent,
    FileDetailsDialogComponent,
    SidenavComponent,
    EditFileDialogComponent,
    AddClientDialogComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule,
    BrowserAnimationsModule, 
    MatButtonModule,
    MatDialogModule,
    MatButtonModule,
    MatSidenavModule,
    MatSelectModule,
    MatToolbarModule,
    MatListModule,
    MatSidenav,
    MatList,
    MatTableModule,
    MatIconModule,
    RouterModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatChipsModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }