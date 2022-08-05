import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ITask } from './task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit, OnChanges {
  todoForm: FormGroup;
  tasks: ITask[] = [];
  updateIndex: any;
  isEditEnabled: boolean = false;
  checked = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({ item: ['', Validators.required] });
  }
  ngOnChanges() {
    console.log(this.checked);
  }

  drop(event: CdkDragDrop<ITask[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

  addTask() {
    const hadTask = this.tasks.some(
      (item) =>
        item.description.toLowerCase().trim() ===
        this.todoForm.value.item.toLowerCase().trim()
    );

    if (!hadTask) {
      this.tasks.push({
        description: this.todoForm.value.item,
        done: false,
      });
      this.todoForm.get('item')?.reset();
    }
  }

  deleteTask(i: number) {
    this.tasks = this.tasks.filter((_, ind) => ind !== i);
  }

  onEditTask(item: ITask, i: number) {
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }

  updateTask() {
    this.tasks[this.updateIndex].description = this.todoForm.value.item;
    this.tasks[this.updateIndex].done = false;
    this.todoForm.reset();
    this.isEditEnabled = false;
    this.updateIndex = undefined;
  }
}
