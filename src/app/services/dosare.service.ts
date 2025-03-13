import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { FileDTO } from '../models/file.model';
import { MyFile } from '../models/my-file.model';

@Injectable({
    providedIn: 'root'
})
export class DosareService {
    private url = "Files";

    constructor(private httpService: HttpService) { }

    getFiles(): Observable<MyFile[]> {
        return this.httpService.get<MyFile[]>(this.url);
    }

    addFile(file: FileDTO): Observable<FileDTO> {
        return this.httpService.post<FileDTO>(this.url, file);
    }

    deleteFile(id: number): Observable<any> {
        return this.httpService.delete(`${this.url}/${id}`);
    }

    editFile(id: number, file: FileDTO): Observable<FileDTO> {
        return this.httpService.put<FileDTO>(`${this.url}/${id}`, file);
    }
}