import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-file-details-dialog',
  standalone: false,
  templateUrl: './file-details-dialog.component.html',
  styleUrl: './file-details-dialog.component.css'
})
export class FileDetailsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FileDetailsDialogComponent>
  ) {}

  onClose(): void {
    this.dialogRef.close(); // Închide dialogul
  }
}

