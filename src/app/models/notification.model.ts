export interface Notification {
    id: number;
    title: string;
    message: string;
    timestamp: Date;
    type: 'file_new' | 'file_update' | 'sedinta_new' | 'sedinta_update' | 'solutie_update';
    fileNumber: string;
    isRead: boolean;
    details?: {
        sedintaDate?: string;
        sedintaOra?: string;
        sedintaComplet?: string;
        solutieSumar?: string;
    };
} 