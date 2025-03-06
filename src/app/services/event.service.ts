import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScheduledEventDTO } from '../models/scheduled-event';



@Injectable({
  providedIn: 'root'
})
export class EventService {
 
  private apiUrl = 'Events'; 

  constructor(private http: HttpClient) {}

  

  addEvent(event: ScheduledEventDTO): Observable<any> {
    return this.http.post(this.apiUrl, event); // POST pentru a adăuga un nou eveniment
  }

  getEvents() {
    throw new Error('Method not implemented.');
  }
}
