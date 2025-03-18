import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientiDTO } from '../models/clienti.model';
import { FileDTO } from '../models/file.model';
import { MyFile } from '../models/my-file.model';
import { ClientiService } from '../services/clienti.service';
import { DosareService } from '../services/dosare.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-file-dialog',
  standalone: false,
  templateUrl: './add-file-dialog.component.html',
  styleUrl: './add-file-dialog.component.css'
})
export class AddFileDialogComponent implements OnInit {
  fileData: Partial<FileDTO> = {
    fileNumber: '',
    client: undefined,
    details: '',
    tipDosar: '',
    notite: ''
  };

  clients: ClientiDTO[] = [];
  isLoading = false;
  isSaving = false;

  constructor(
    private dialogRef: MatDialogRef<AddFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { file: MyFile | FileDTO },
    private dosareService: DosareService,
    private clientiService: ClientiService,
    private snackBar: MatSnackBar
  ) {
    if (data?.file) {
      // Convert MyFile to FileDTO if needed
      if ('details' in data.file) {
        const myFile = data.file as MyFile;
        this.fileData = {
          id: myFile.id,
          fileNumber: myFile.fileNumber,
          details: myFile.details.numar,
          tipDosar: myFile.details.categorieCaz,
          notite: ''
        };
      } else {
        const fileDTO = data.file as FileDTO;
        this.fileData = {
          id: fileDTO.id,
          fileNumber: fileDTO.fileNumber,
          client: fileDTO.client,
          details: fileDTO.details,
          tipDosar: fileDTO.tipDosar,
          notite: fileDTO.notite
        };
      }
    }
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.clientiService.getAllClients().subscribe({
      next: (clients) => {
        this.clients = clients;
        console.log('Loaded clients:', this.clients);
        if (this.fileData.client?.id) {
          const selectedClient = this.clients.find(client => client.id === this.fileData.client?.id);
          if (selectedClient) {
            this.fileData.client = selectedClient;
          }
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading clients:', error);
        this.snackBar.open('Error loading clients. Please try again.', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  save(): void {
    console.log('Current fileData:', this.fileData);
    console.log('Selected client:', this.fileData.client);

    if (!this.fileData.fileNumber || !this.fileData.client?.id || !this.fileData.tipDosar) {
      this.snackBar.open('Please fill in all required fields!', 'Close', { duration: 3000 });
      return;
    }

    this.isSaving = true;
    
    const fileToSave: FileDTO = {
      id: this.fileData.id || 0,
      fileNumber: this.fileData.fileNumber,
      client: this.fileData.client,
      details: this.fileData.details || '',
      tipDosar: this.fileData.tipDosar,
      notite: this.fileData.notite || ''
    };

    console.log('File being sent to backend:', fileToSave);

    const operation = this.fileData.id 
      ? this.dosareService.editFile(this.fileData.id, fileToSave)
      : this.dosareService.addFile(fileToSave);

    operation.subscribe({
      next: (result: FileDTO) => {
        this.snackBar.open(
          this.fileData.id ? 'File updated successfully!' : 'File added successfully!',
          'Close',
          { duration: 3000 }
        );
        this.dialogRef.close(result);
      },
      error: (error) => {
        console.error('Error saving file:', error);
        this.snackBar.open('Error saving file. Please try again.', 'Close', { duration: 3000 });
        this.isSaving = false;
      }
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
