import { Component, OnInit } from '@angular/core';
import { DosareService } from '../services/dosare.service';
import { FileDetailsDTO, MyFile } from '../models/my-file.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dosare',

  templateUrl: './dosare.component.html',
  styleUrl: './dosare.component.css'
})
export class DosareComponent implements OnInit {

  dosare: MyFile[] = [];
  displayedColumns: string[] = ['numarDosar', 'numeClient', 'obiectDosar', 'sedinte', 'delete'];

  constructor(
    private dosareService: DosareService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadDosare();
  }
 
  loadDosare(): void {
    this.dosareService.getFiles().subscribe((data: MyFile[]) => {
      this.dosare = data;
    });
  }
}

