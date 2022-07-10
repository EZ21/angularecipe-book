import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit, OnDestroy {

  navbarCollapsed: boolean = true;

  private userSubscription: Subscription;
  isAuthenticated = false;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
  ) { };

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  };

  // HAMBURGER MENU:
  onToggleNavbarCollapsed(): void {
    this.navbarCollapsed = !this.navbarCollapsed;
  };

  onSaveData() {
    this.dataStorageService.save();
  };

  onFetchData() {
    this.dataStorageService.fetch().subscribe();
  };

  onLogout() {
    this.authService.logout();
  };

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  };
};