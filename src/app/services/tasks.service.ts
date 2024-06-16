import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subscription, throwError } from 'rxjs';
import { Task } from '../interfaces/task.interface';
import { TaskFilters } from '../interfaces/taskFilters.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  apiUrl: string = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  getTasks(projectId: number, queryString?: string, filters?: TaskFilters): Observable<Task[]> {
    let params = new HttpParams();

    params = params.append('project_id', projectId);

    if (queryString) {
      params = params.append('q', queryString);
    }

    if (filters?.dueDate?.start) {
      params = params.append('due_date_gte', filters.dueDate.start);
    }

    if (filters?.dueDate?.end) {
      params = params.append('due_date_lte', filters.dueDate.end);
    }

    if (filters?.sortBy) {
      params = params.append('_sort', filters.sortBy);
      if (filters?.orderBy) {
        params = params.append('_order', filters.orderBy);
      }
    }

    return this.http.get<Task[]>(`${this.apiUrl}/tasks`, { params: params }).pipe(
      map((tasks: Task[]) => {
        if (filters?.assignees?.length) {
          tasks = tasks.filter(task => filters?.assignees?.filter(assigneeId => task.assignees.includes(assigneeId)).length)
        }
        return tasks;
      }),
      catchError(error => {
        console.error('An error occurred:', error);
        return throwError('Something went wrong; please try again later.');
      })
    );
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/tasks/${task.id}`, task);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/tasks`, task).pipe(
      catchError(error => {
        console.error('An error occurred:', error);
        return throwError('Something went wrong; please try again later.');
      })
    );
  }

  deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(`${this.apiUrl}/tasks/${task.id}`).pipe(
      catchError(error => {
        console.error('An error occurred:', error);
        return throwError('Something went wrong; please try again later.');
      })
    );
  }
}
