import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileDTO } from '../../models/file.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-file-dialog',
  standalone: false,
  templateUrl: './edit-file-dialog.component.html',
  styleUrl: './edit-file-dialog.component.css'
})
export class EditFileDialogComponent implements OnInit {
    fileForm: FormGroup;
  
    constructor(
      private dialogRef: MatDialogRef<EditFileDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: FileDTO,
      private fb: FormBuilder
    ) {
      this.fileForm = this.fb.group({
        id: [data.id],
        fileNumber: [data.fileNumber, Validators.required],
        client: [data.client],
        details: [data.details],
        notite: [data.notite],
        tipDosar: [data.tipDosar, Validators.required]
      });
    }
  
    ngOnInit(): void {
    }
  
    onSubmit(): void {
      if (this.fileForm.valid) {
        this.dialogRef.close(this.fileForm.value);
      }
    }
  
    onCancel(): void {
      this.dialogRef.close();
    }
}