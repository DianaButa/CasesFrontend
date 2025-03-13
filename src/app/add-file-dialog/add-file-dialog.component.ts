import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientiDTO } from '../models/clienti.model';
import { FileDTO } from '../models/file.model';
import { ClientiService } from '../services/clienti.service';
import { DosareService } from '../services/dosare.service';

@Component({
  selector: 'app-add-file-dialog',
  standalone: false,
  templateUrl: './add-file-dialog.component.html',
  styleUrl: './add-file-dialog.component.css'
})
export class AddFileDialogComponent implements OnInit {
  fileData: FileDTO = {
    id: 0,
    fileNumber: '',
    client: { id: 0, firstName: '', lastName: '', email: '' },
    details: '',
    tipDosar: '',
    notite: ''
  };

  clients: ClientiDTO[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { file: FileDTO },
    private dosareService: DosareService,
    private clientiService: ClientiService
  ) {
    if (data?.file) {
      this.fileData = { ...data.file };
    }
  }

  ngOnInit(): void {
    this.clientiService.getAllClients().subscribe(clients => {
      this.clients = clients;
      if (this.fileData.client.id) {
        const selectedClient = this.clients.find(client => client.id === this.fileData.client.id);
        if (selectedClient) {
          this.fileData.client = selectedClient;
        }
      }
    });
  }

  save(): void {
    if (!this.fileData.fileNumber || !this.fileData.client.id || !this.fileData.tipDosar) {
      alert('Please fill in all required fields!');
      return;
    }

    if (this.fileData.id) {
      this.dosareService.editFile(this.fileData.id, this.fileData).subscribe(result => {
        this.dialogRef.close(result);
      });
    } else {
      this.dosareService.addFile(this.fileData).subscribe(result => {
        this.dialogRef.close(result);
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}

