import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  constructor(private router: Router) { }

  getActiveIcon(): string {
    const currentUrl = this.router.url;
    if (currentUrl === '/' || currentUrl.includes('tasks')) {
      return 'projects';
    } else if (currentUrl === '/users') {
      return 'users';
    }
    return '';
  }

  getTitle(): string {
    const currentUrl = this.router.url;
    if (currentUrl === '/') {
      return 'Dashboard';
    } else if (currentUrl === '/users') {
      return 'Users';
    } else if (currentUrl.includes('tasks')) {
      return 'Tasks';
    }
    return '';
  }
}
