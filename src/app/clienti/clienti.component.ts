import { Component, OnInit } from '@angular/core';
import { ClientiService } from '../services/clienti.service';
import { ClientiDTO } from '../models/clienti.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddClientDialogComponent } from './add-client-dialog/add-client-dialog.component';

@Component({
  selector: 'app-clienti',
  standalone: false,
  templateUrl: './clienti.component.html',
  styleUrl: './clienti.component.css'
})
export class ClientiComponent implements OnInit {
  clienti: ClientiDTO[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'actions'];
  isLoading = false;

  constructor(
    private clientiService: ClientiService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadClienti();
  }

  loadClienti(): void {
    this.isLoading = true;
    this.clientiService.getAllClients().subscribe({
      next: (data: ClientiDTO[]) => {
        this.clienti = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error()
        this.isLoading = false;
      }
    });
  }

  openAddClientDialog(): void {
    const dialogRef = this.dialog.open(AddClientDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadClienti(); // Refresh the list after adding a new client
      }
    });
  }
}
