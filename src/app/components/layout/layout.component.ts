import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @Output() search = new EventEmitter<string>();

  searchControl = new FormControl();
  currentUserName:string | null = localStorage.getItem("name");
  currentUserEmail:string | null = localStorage.getItem("email");

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(searchTerm => {
        this.search.emit(searchTerm);
      });
  }

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

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
