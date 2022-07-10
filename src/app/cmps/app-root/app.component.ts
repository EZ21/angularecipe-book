import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularecipe-book';

  pageLoaded = 'recipe';

  onNavigate(page: string) {
    this.pageLoaded = page;
  };
};
