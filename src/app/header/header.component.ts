import { Component } from '@angular/core';
import { ToDoService } from '../services/to-do.service';
import { Observable, map } from 'rxjs';
import { ToDo } from '../models/ToDo.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  title = 'Welcome, Admin';
  numberOfTodos$?: Observable<number>;

  constructor(private toDoService: ToDoService) {}

  ngOnInit() {
    this.numberOfTodos$ = this.toDoService.uncompletedTasks$.asObservable();
  }
}
