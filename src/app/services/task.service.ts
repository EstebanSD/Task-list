import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Task } from 'src/app/Task';
import { TASKS } from 'src/app/mock-tasks';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/tasks';

  constructor(private http:HttpClient) { }
/*
  //Viejo setvicio usando el mock
  getTasks(): Observable<Task[]>{
    const tasks = of (TASKS);
    return tasks;
  }
*/
  //Devuelve la lista de tareas
  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(this.apiUrl);
  }
  //Elimina un tarea
  deleteTask(elem:Task): Observable<Task>{
    const url = `${this.apiUrl}/${elem.id}`;
    return this.http.delete<Task>(url);
  }
  //Actualiza en la base de datos el valor de "reminder"
  updateTaskReminder(elem:Task): Observable<Task>{
    const url = `${this.apiUrl}/${elem.id}`;
    return this.http.put<Task>(url, elem, httpOptions);
  }

  addTask(elem:Task): Observable<Task>{
    return this.http.post<Task>(this.apiUrl, elem, httpOptions);
  }
}
