import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Notification } from '../models/notification.model';
import { NotificationService } from '../services/notification.service';
import { FileDetailsDialogComponent } from '../file-details-dialog/file-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-notification',
  standalone: false,
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];
  displayedColumns: string[] = ['timestamp', 'type', 'title', 'message', 'fileNumber', 'isRead', 'actions'];
  dataSource: MatTableDataSource<Notification>;
  isLoading = false;
  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<Notification>();
  }

  ngOnInit(): void {
    this.loadNotifications();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadNotifications() {
    this.notificationService.getNotifications().subscribe({
      next: (data) => {
        this.notifications = data; // Stocăm notificările
      },
      error: (err) => console.error('Eroare la încărcarea notificărilor:', err)
    });
  }
  onNotificationClick(notification: Notification): void {
    const numarDosar = encodeURIComponent(notification.fileNumber);
    const endpoint = `https://localhost:7096/api/Files/${numarDosar}`;
  
    this.http.get(endpoint).subscribe(
      (response) => {
        this.openFileDetailsDialog(response);
      },
      (error: HttpErrorResponse) => {
        console.error('Eroare la obținerea datelor despre dosar', error);
      }
    );
  }
  
  openFileDetailsDialog(fileDetails: any): void {
    const dialogRef = this.dialog.open(FileDetailsDialogComponent, {
      width: '600px',
      maxHeight: '80vh',
      data: fileDetails
    });
  
    dialogRef.afterClosed().subscribe(() => {
      console.log('Dialog închis');
    });
  }
  



  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadNotifications();
  }

  markAsRead(notification: Notification): void {
    if (!notification.isRead) {
      this.notificationService.markAsRead(notification.id).subscribe({
        next: () => {
          notification.isRead = true;
          this.snackBar.open('Notification marked as read', 'Close', { duration: 3000 });
        },
        error: (error: any) => {
          console.error('Error marking notification as read:', error);
          this.snackBar.open('Error marking notification as read. Please try again.', 'Close', { duration: 3000 });
        }
      });
    }
  }

  getTypeIcon(type: string): string {
    switch (type) {
      case 'file_new':
        return 'description';
      case 'file_update':
        return 'edit';
      case 'sedinta_new':
        return 'event';
      case 'sedinta_update':
        return 'event_note';
      case 'solutie_update':
        return 'gavel';
      default:
        return 'notifications';
    }
  }

  getTypeColor(type: string): string {
    switch (type) {
      case 'file_new':
        return 'primary';
      case 'file_update':
        return 'accent';
      case 'sedinta_new':
        return 'warn';
      case 'sedinta_update':
        return 'warn';
      case 'solutie_update':
        return 'primary';
      default:
        return '';
    }
  }
}
