import { Component, OnInit } from '@angular/core';
import { AddEventDialogComponent } from '../add-event-dialog/add-event-dialog.component';
import { FileDTO } from '../models/file.model';
import { AddFileDialogComponent } from '../add-file-dialog/add-file-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EventService } from '../services/event.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ScheduledEventDTO } from '../models/scheduled-event';
import { FileDetailsDialogComponent } from '../file-details-dialog/file-details-dialog.component';




interface ScheduledEvent {
  id: number;
  fileNumber: string;
  startTime: Date;
  endTime?: Date;
  tipDosar: string;
  description: string;
  clientName: string;
  color: string;
}

interface CalendarEvent {
  id: number;
  description: string;
  start: Date;
  end: Date;
}


@Component({
  selector: 'app-calendar',
  standalone: false,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  currentMonth: number;
  currentYear: number;
  daysInView: (Date | null)[] = [];
  weeksInView: (Date | null)[][] = [];
  currentWeekIndex: number = 0;
  view: 'week' | 'month' = 'week';

  events: ScheduledEvent[] = [];
  additionalEvents: CalendarEvent[] = [];
  selectedDate: Date | null = null;

  constructor(public dialog: MatDialog,
    private http: HttpClient, private eventService: EventService) {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
  }

  ngOnInit(): void {
    this.loadScheduledEvents();
    // this.loadAdditionalEvents();
    this.updateView();
  }

  getCurrentMonthAndYear(): string {
    const date = new Date(this.currentYear, this.currentMonth, 1);
    return date.toLocaleDateString('ro-RO', { month: 'long', year: 'numeric' });
  }

  toggleView(): void {
    this.view = this.view === 'week' ? 'month' : 'week';
    this.updateView();
  }

  loadScheduledEvents(): void {
    this.http.get<ScheduledEvent[]>('https://localhost:7096/api/Files/scheduled-events').subscribe(
      (data) => {
        this.events = data.map(event => ({
          ...event,
          startTime: new Date(event.startTime),
          endTime: new Date(new Date(event.startTime).getTime() + 60 * 60 * 1000),
        }));
      },
      (error) => {
        console.error('Error loading scheduled events', error);
      }
    );
  }

  // loadAdditionalEvents(): void {
  //   this.eventService.getEvents().subscribe(
  //     (data) => {
  //       this.additionalEvents = data.map(event => ({
  //         ...event,
  //         start: new Date(event.dateTime), // Aici convertești dateTime în Date
  //         end: new Date(new Date(event.dateTime).getTime() + 60 * 60 * 1000) // Adaugă 1 oră la eveniment
  //       }));
  //       this.updateView(); // Actualizează vizualizarea calendarului
  //     },
  //     (error) => {
  //       console.error('Error loading events from Events API', error);
  //     }
  //   );
  // }





  getEventsForDay(day: Date | null): ScheduledEvent [] {
    if (day === null) return [];
    return this.events
      .filter(event => {
        const eventStart = new Date(event.startTime);
        return eventStart.toDateString() === day.toDateString();
      })
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  }

  getAdditionalEventsForDay(day: Date | null): CalendarEvent[] {
    if (day === null) return [];
    return this.additionalEvents
      .filter(event => {
        const eventStart = new Date(event.start);
        return eventStart.toDateString() === day.toDateString();
      })
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  }



  updateView(): void {
    if (this.view === 'week') {
      this.generateWeeksInMonth();
    } else {
      this.generateDaysInMonth();
    }
  }

  generateWeeksInMonth(): void {
    this.weeksInView = [];
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    let currentWeek: (Date | null)[] = [];
    const startDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7; // Ajustează pentru a începe de luni

    for (let i = 0; i < startDayOfWeek; i++) {
      currentWeek.push(null); // Zile goale pentru aliniere
    }

    // Adaugă zilele lunii curente
    const date = new Date(this.currentYear, this.currentMonth, 1);
    while (date.getMonth() === this.currentMonth) {
      currentWeek.push(new Date(date));
      if (currentWeek.length === 7) {
        this.weeksInView.push(currentWeek);
        currentWeek = [];
      }
      date.setDate(date.getDate() + 1);
    }

    // Adaugă săptămâna incompletă rămasă
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      this.weeksInView.push(currentWeek);
    }

    // Calculează indexul săptămânii curente
    this.setCurrentWeekIndex();
  }

  setCurrentWeekIndex(): void {
    const today = new Date();
    for (let i = 0; i < this.weeksInView.length; i++) {
      if (this.weeksInView[i].some(day => day && this.isToday(day))) {
        this.currentWeekIndex = i; // Setează săptămâna curentă
        break;
      }
    }
  }


  prevWeek(): void {
    if (this.currentWeekIndex > 0) {
      this.currentWeekIndex--;
    }
  }

  nextWeek(): void {
    if (this.currentWeekIndex < this.weeksInView.length - 1) {
      this.currentWeekIndex++;
    }
  }

  generateDaysInMonth(): void {
    this.daysInView = [];
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const startDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7; // Ajustează pentru a începe de luni

    for (let i = 0; i < startDayOfWeek; i++) {
      this.daysInView.push(null);
    }

    const date = new Date(this.currentYear, this.currentMonth, 1);
    while (date.getMonth() === this.currentMonth) {
      this.daysInView.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    const endDayOfWeek = new Date(this.currentYear, this.currentMonth + 1, 0).getDay();
    for (let i = (endDayOfWeek + 6) % 7 + 1; i < 7; i++) {
      this.daysInView.push(null);
    }
  }

  prevMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.updateView();
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.updateView();
  }

  selectDay(day: Date | null): void {
    if (day !== null) {
      this.selectedDate = day;
    }
  }

  isToday(day: Date | null): boolean {
    if (day === null) return false;
    const today = new Date();
    return day.getDate() === today.getDate() &&
      day.getMonth() === today.getMonth() &&
      day.getFullYear() === today.getFullYear();
  }

  getDayName(day: Date | null): string {
    if (!day) return '';
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return daysOfWeek[(day.getDay() + 6) % 7]; // Ajustare pentru a începe de luni
  }

  onEventClick(event: ScheduledEvent): void {
    const numarDosar = encodeURIComponent(event.fileNumber);
    const endpoint = `https://localhost:7096/api/Files/${numarDosar}`;
  
    this.http.get(endpoint).subscribe(
      (response) => {
        this.openFileDetailsDialog(response);
      },
      (error: HttpErrorResponse) => {  // Explicitly define the type of 'error'
        console.error('Eroare la obținerea datelor despre dosar', error);
      }
    );
  }

  openFileDetailsDialog(fileDetails: any): void {
    const dialogRef = this.dialog.open(FileDetailsDialogComponent, {
      width: '600px',
      data: fileDetails
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog închis');
    });
  }

  getOraFromDescription(description: string): string {
    const regex = /Ora:\s*(\d{2}:\d{2})/;
    const match = description.match(regex);
    return match ? match[1] : 'Ora indisponibilă';
  }

  getInstantaFromDescription(description: string): string {
    const regex = /Institu[țt]ie:\s*([^\s]+)/i;
    const match = description.match(regex);
    return match ? match[1] : 'Instanță indisponibilă';
  }



  openAddFileDialog(): void {
    const dialogRef = this.dialog.open(AddFileDialogComponent, {
      width: '400px',
      data: {
        fileNumber: '',
        clientName: '',
        details: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addFile(result);  // Dacă dialogul se închide cu succes, trimitem dosarul la server
      }
    });
  }

  // Funcția care adaugă dosarul la baza de date
  addFile(file: FileDTO): void {
    const url = 'https://localhost:7096/api/Files';  // Endpoint-ul API-ului

    this.http.post(url, file).subscribe(
      response => {
        console.log('Dosar adăugat cu succes:', response);
        // Aici poți adăuga logica suplimentară, cum ar fi actualizarea listei de dosare
      },
      error => {
        console.error('Eroare la adăugarea dosarului:', error);
      }
    );
  }


  openAddEventDialog(): void {
    const dialogRef = this.dialog.open(AddEventDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addEvent(result);
      }
    });
  }

  addEvent(eventData: any): void {
    this.eventService.addEvent(eventData).subscribe(
      (response) => {
        console.log('Eveniment adăugat cu succes:', response);
        this.loadScheduledEvents(); // Reîncarcă evenimentele
      },
      (error) => {
        console.error('Eroare la adăugarea evenimentului:', error);
      }
    );
  }
}