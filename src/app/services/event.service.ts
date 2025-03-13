import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScheduledEventDTO } from '../models/scheduled-event';



@Injectable({
  providedIn: 'root'
})
export class EventService {
 
  private apiUrl = 'https://localhost:7096/api/Events'; 

  constructor(private http: HttpClient) {}

  

  addEvent(event: ScheduledEventDTO): Observable<any> {
    return this.http.post(this.apiUrl, event); // POST pentru a adăuga un nou eveniment
  }

  getEvents(): Observable<ScheduledEventDTO[]> {
    return this.http.get<ScheduledEventDTO[]>(this.apiUrl);
  }
}
