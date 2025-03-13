import { Component, OnInit } from '@angular/core';
import { DosareService } from '../services/dosare.service';
import { FileDetailsDTO, MyFile } from '../models/my-file.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FileDTO } from '../models/file.model';
import { EditFileDialogComponent } from './edit-file-dialog/edit-file-dialog.component';
import { AddFileDialogComponent } from '../add-file-dialog/add-file-dialog.component';

@Component({
  selector: 'app-dosare',
  standalone: false,
  templateUrl: './dosare.component.html',
  styleUrl: './dosare.component.css'
})
export class DosareComponent implements OnInit {
  dosare: MyFile[] = [];
  displayedColumns: string[] = ['numarDosar', 'numeClient', 'obiectDosar', 'sedinte', 'notes', 'actions'];
  isLoading = false;

  constructor(
    private dosareService: DosareService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadDosare();
  }
 
  loadDosare(): void {
    this.isLoading = true;
    this.dosareService.getFiles().subscribe({
      next: (data: MyFile[]) => {
        console.log('Files data:', data);
        this.dosare = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading files:', error);
        this.snackBar.open('Error loading files. Please try again later.', 'Close', {
          duration: 3000
        });
        this.isLoading = false;
      }
    });
  }

  editFile(file: FileDTO): void {
    const dialogRef = this.dialog.open(EditFileDialogComponent, {
      data: file
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dosareService.editFile(result.id, result).subscribe({
          next: (response: FileDTO) => {
            this.snackBar.open('File updated successfully', 'Close', {
              duration: 3000
            });
            this.loadDosare();
          },
          error: (error: any) => {
            console.error('Error updating file:', error);
            this.snackBar.open('Error updating file. Please try again later.', 'Close', {
              duration: 3000
            });
          }
        });
      }
    });
  }

  deleteFile(file: FileDTO): void {
    if (confirm(`Are you sure you want to delete file ${file.fileNumber}?`)) {
      this.dosareService.deleteFile(file.id).subscribe({
        next: () => {
          this.snackBar.open('File deleted successfully', 'Close', {
            duration: 3000
          });
          this.loadDosare();
        },
        error: (error) => {
          console.error('Error deleting file:', error);
          this.snackBar.open('Error deleting file. Please try again later.', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }

  openAddFileDialog(): void {
    const dialogRef = this.dialog.open(AddFileDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadDosare();
      }
    });
  }
}

