import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('email') && !!localStorage.getItem('name');
  }

  logout(): void {
    localStorage.removeItem('email');
  }
}
