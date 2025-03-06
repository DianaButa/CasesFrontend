import { ClientiDTO } from "./clienti.model";


export interface IFileDTO {
    id: number;
    fileNumber: string;
    client: ClientiDTO; // Aici schimbăm clientName cu un obiect ClientiDTO
    details: string;
    notite?: string;
    tipDosar: string;
}

export interface IFileFormValue {
    id: number;
    fileNumber: string;
    client: ClientiDTO;  // Client ca obiect
    details: string;
    notite?: string;
    tipDosar: string;
}

export class FileDTO implements IFileDTO {
    id: number;
    fileNumber: string;
    client: ClientiDTO; // Client ca obiect de tip ClientiDTO
    details: string;
    notite?: string;
    tipDosar: string;

    constructor(formValue: IFileDTO) {
        this.id = formValue.id;
        this.client = formValue.client;  // Atribuim direct obiectul ClientiDTO
        this.fileNumber = formValue.fileNumber;
        this.details = formValue.details;
        this.notite = formValue.notite;
        this.tipDosar = formValue.tipDosar;
    }
}