import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';
import { UserFilters } from '../interfaces/userFilters.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl: string = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  getUsers(options?: UserFilters): Observable<User[]> {
    let params = new HttpParams();

    if (options?.userEmail) {
      params = params.append('email', options.userEmail);
    }
    if (options?.userPassword) {
      params = params.append('password', options.userPassword);
    }
    if (options?.query) {
      params = params.append('q', options.query);
    }
    if (options?.ids) {
      for (let id of options.ids) {
        params = params.append('id', id);
      }
    }

    return this.http.get<User[]>(`${this.apiUrl}/users`, { params: params }).pipe(
      catchError(error => {
        console.error('An error occurred:', error);
        return throwError('Something went wrong; please try again later.');
      })
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user).pipe(
      catchError(error => {
        console.error('An error occurred:', error);
        return throwError('Something went wrong; please try again later.');
      })
    );
  }
}
