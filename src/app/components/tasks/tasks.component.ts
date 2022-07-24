import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks:Task[])=>{
      this.tasks = tasks;
    });
  }

  deleteTask(elem:Task){
    this.taskService.deleteTask(elem).subscribe(()=>{
      this.tasks = this.tasks.filter(t => t.id != elem.id);
    });
  }

  toggleReminder(elem:Task){
    elem.reminder = !elem.reminder;
    this.taskService.updateTaskReminder(elem).subscribe();
  }

  addTask(algo:Task){
    this.taskService.addTask(algo).subscribe((algo)=>{
      this.tasks.push(algo);
    })
  }
}
