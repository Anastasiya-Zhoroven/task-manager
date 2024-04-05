import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor (private readonly http: HttpClient) { }

  getUsers (): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/users');
  }
}
