import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/interfaces/task.interface';
import { User } from 'src/app/interfaces/user.interface';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @Input() task!: Task;
  @Input() users!: User[];
  @Output() editTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<Task>();
  selectedAssignees: User[] = [];
  assigneesToAdd: User[] = [];

  constructor(private readonly tasksService: TasksService) { }

  ngOnInit() {
    this.filterAssignees();
  }

  filterAssignees() {
    this.selectedAssignees = this.users.filter(user => user?.id && this.task.assignees.includes(user?.id));
    this.assigneesToAdd = this.users.filter(user => user?.id && !this.task.assignees.includes(user?.id));
  }

  editTaskClick(): void {
    this.editTask.emit(this.task);
  }

  deleteTaskClick(): void {
    this.deleteTask.emit(this.task);
  }

  selectAssignee(userId?: number) {
    if (userId) {
      this.task.assignees.push(userId);
      this.tasksService.updateTask(this.task).subscribe(
        (response) => this.filterAssignees()
      )
    }
  }
}
