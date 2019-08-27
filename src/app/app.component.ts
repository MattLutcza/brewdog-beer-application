import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  /**
   * Scroll to top on route change
   */
  onActivate(event): void {
    window.scroll(0,0);
  }
}
