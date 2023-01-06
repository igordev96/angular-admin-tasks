import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  @Output()
  addEvent = new EventEmitter<FormControl<string>>();

  task = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(/[\S]/)],
  });

  constructor() {}

  addTask() {
    this.addEvent.emit(this.task);
  }
}
