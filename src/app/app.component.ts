import { Component } from '@angular/core';
import { ToDoService } from './services/to-do.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private toDoService: ToDoService) {}

  ngOnInit() {
    this.toDoService.getTodos().subscribe();
  }
}
