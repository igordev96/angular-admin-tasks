import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ToDo } from 'src/app/models/ToDo.model';
import { ToDoService } from 'src/app/services/to-do.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
  @Input()
  task?: ToDo;

  @Output()
  deleteEvent = new EventEmitter<string>();

  @ViewChild('card')
  card?: ElementRef<HTMLElement>;

  constructor(private toDoService: ToDoService) {}

  ngAfterViewInit() {
    if (this.task?.completed) {
      this.card?.nativeElement.classList.toggle('checked');
    }
  }

  completeHandler() {
    if (this.task) {
      this.task.completed = !this.task.completed;
      this.toDoService.updateTodo(this.task).subscribe();
      this.card?.nativeElement.classList.toggle('checked');
    }
  }

  deleteHandler(id: string, event: Event) {
    event.stopPropagation();
    this.deleteEvent.emit(id);
  }
}
