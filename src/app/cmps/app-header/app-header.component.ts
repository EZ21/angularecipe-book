import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  collapsed = true;

  @Output() pageSelected = new EventEmitter<string>();

  constructor() { };

  ngOnInit(): void {
  };

  onSelect(page: string) {
    this.pageSelected.emit(page);
  };
};