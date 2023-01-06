import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  Subject,
  tap,
} from 'rxjs';
import { ToDo } from '../models/ToDo.model';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  private tasksURL = 'https://nestjs-to-do-list-angular.vercel.app/tasks';
  private tasksList: ToDo[] = [];
  tasksSubject$ = new Subject<ToDo[]>();
  uncompletedTasks$ = new BehaviorSubject<number>(this.tasksList.length);

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getTodos(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(this.tasksURL).pipe(
      tap((data) => {
        this.tasksList = data;
        this.tasksSubject$.next(this.tasksList);
        this.uncompletedTasks$.next(
          this.tasksList.filter((task) => task.completed === false).length
        );
      }),
      catchError((error: any): Observable<any> => {
        console.log(error);
        return of([] as any);
      })
    );
  }

  addTodo(task: ToDo): Observable<ToDo> {
    return this.http.post<ToDo>(this.tasksURL, task, this.httpOptions).pipe(
      tap((task) => {
        this.tasksList.push(task);
        this.tasksSubject$.next(this.tasksList);
        this.uncompletedTasks$.next(
          this.tasksList.filter((task) => task.completed === false).length
        );
      }),
      catchError((error: any): Observable<any> => {
        console.log(error);
        return of([] as any);
      })
    );
  }

  updateTodo(task: ToDo): Observable<ToDo> {
    return this.http
      .put<ToDo>(`${this.tasksURL}/${task.id}`, task, this.httpOptions)
      .pipe(
        tap((response) => {
          this.tasksList.forEach((task) => {
            if (task.id === response.id) {
              task.completed = response.completed;
            }
          });
          this.tasksSubject$.next(this.tasksList);
          this.uncompletedTasks$.next(
            this.tasksList.filter((task) => task.completed === false).length
          );
        }),
        catchError((error: any): Observable<any> => {
          console.log(error);
          return of([] as any);
        })
      );
  }

  deleteTodo(id: string): Observable<ToDo> {
    return this.http.delete<ToDo>(`${this.tasksURL}/${id}`).pipe(
      tap(() => {
        this.tasksList = this.tasksList.filter((task) => task.id !== id);
        this.tasksSubject$.next(this.tasksList);
        this.uncompletedTasks$.next(
          this.tasksList.filter((task) => task.completed === false).length
        );
      }),
      catchError((error: any): Observable<any> => {
        console.log(error);
        return of([] as any);
      })
    );
  }
}
