import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  navbarCollapsed: boolean = true;

  constructor(private dataStorageService: DataStorageService) { };

  ngOnInit(): void {
  };

  // HAMBURGER MENU:
  onToggleNavbarCollapsed(): void {
    this.navbarCollapsed = !this.navbarCollapsed;
    console.log('navbarCollapsed:', this.navbarCollapsed);
  };

  onSaveData() {
    this.dataStorageService.save();
  };

  onFetchData() {
    this.dataStorageService.fetch().subscribe();
  };
};