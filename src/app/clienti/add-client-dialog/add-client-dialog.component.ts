import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientiService } from '../../services/clienti.service';
import { ClientiDTO } from '../../models/clienti.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-client-dialog',
  standalone: false,
  templateUrl: './add-client-dialog.component.html',
  styleUrl: './add-client-dialog.component.css'
})
export class AddClientDialogComponent {
  clientForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddClientDialogComponent>,
    private fb: FormBuilder,
    private clientiService: ClientiService,
    private snackBar: MatSnackBar
  ) {
    this.clientForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      const newClient: ClientiDTO = {
        id: 0, // The backend will assign the ID
        firstName: this.clientForm.get('firstName')?.value,
        lastName: this.clientForm.get('lastName')?.value,
        email: this.clientForm.get('email')?.value
      };

      this.clientiService.addClient(newClient).subscribe({
        next: (response) => {
          this.snackBar.open('Client adăugat cu succes!', 'Închide', {
            duration: 3000
          });
          this.dialogRef.close(response);
        },
        error: (error) => {
          console.error('Error adding client:', error);
          this.snackBar.open('Eroare la adăugarea clientului. Vă rugăm să încercați din nou.', 'Închide', {
            duration: 3000
          });
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}