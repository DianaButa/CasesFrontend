import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from '../http.service';
import type { Notification } from '../models/notification.model';
import * as signalR from '@microsoft/signalr';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private hubConnection!: signalR.HubConnection;
    private notifications = new BehaviorSubject<Notification[]>([]);
    private url = "Notification";

    constructor(private httpService: HttpService) {
        this.initializeSignalR();
    }

    private initializeSignalR() {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('/notificationHub')
            .build();

        this.hubConnection.start()
            .catch(err => console.error('Error while establishing connection: ' + err));

        this.hubConnection.on('ReceiveNotification', (notification: Notification) => {
            const currentNotifications = this.notifications.value;
            this.notifications.next([notification, ...currentNotifications]);
        });
    }

    getNotifications(): Observable<Notification[]> {
        return this.httpService.get<Notification[]>(`${this.url}`);
    }
    
    markAsRead(notificationId: number): Observable<void> {
        return this.httpService.post(`${this.url}/MarkAsRead/${notificationId}`, {});
    }

    getUnreadCount(): Observable<number> {
        return this.httpService.get(`${this.url}/GetUnreadCount`);
    }
}