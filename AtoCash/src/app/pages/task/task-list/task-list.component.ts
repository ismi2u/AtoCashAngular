import { CommonService } from 'src/app/services/common.service';
import { TranslateService } from '@ngx-translate/core';

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
	selector: 'app-task-list',
	templateUrl: './task-list.component.html',
	styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
	tasks: any;
	tasksHeaders: any = [
		'tableHeader.task.subProject',
		'tableHeader.task.taskName',
		'tableHeader.task.taskDescription',

	];

	constructor(
		private _cdr: ChangeDetectorRef,
		private taskService: TasksService,
		private router: Router,
    private commonService:CommonService
	) {}

	ngOnInit(): void {
    this.commonService.loading.next(true);
		this.taskService.getTasks();
		this.taskService.tasks.subscribe((data) => {
			this.tasks = data;
			this._cdr.detectChanges();
		});
	}

	deleteRecord = (event) => {
    this.commonService.loading.next(true);
		this.taskService.deleteTaskById(event.id).subscribe(() => {
			this.taskService.getTasks();
		});
	};

	editRecord = (event) => {
		this.router.navigateByUrl(`/task/action/edit/${event.id}`);
	};
}
