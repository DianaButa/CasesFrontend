import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpService } from '../http.service';
import { ClientiDTO } from '../models/clienti.model';



@Injectable({
  providedIn: 'root'
})

    export class ClientiService {
        private url = "Client";
    
        constructor(private httpService: HttpService) { }
    
        public getAllClients(): Observable<Array<ClientiDTO>> {
            return this.httpService.get<Array<ClientiDTO>>(`${this.url}`);
        }
}
