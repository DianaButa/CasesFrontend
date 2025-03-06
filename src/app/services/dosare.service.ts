import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { FileDTO } from '../models/file.model';
import { MyFile } from '../models/my-file.model';



@Injectable({
    providedIn: 'root'
})

export class DosareService {
    deleteFile(id: number) {
      throw new Error('Method not implemented.');
    }

    private url = "Files";


    constructor(private httpService: HttpService) { }

    getFiles(): Observable<MyFile[]> {
        return this.httpService.get<MyFile[]>(this.url);
    }

    addFile(file: FileDTO): Observable<FileDTO> {
      return this.httpService.post<FileDTO>(`${this.url}/files`, file);
    }
    
    updateFile(file: FileDTO): Observable<FileDTO> {
      return this.httpService.put<FileDTO>(`${this.url}/files/${file.id}`, file);
    }
    
    
}