import { CommonService } from 'src/app/services/common.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class TasksService {
	tasks = new BehaviorSubject([]);

	constructor(private http: HttpClient, private commonService: CommonService) {}

	getTasks = () => {
		this.http
			.get(`${this.commonService.getApi()}/api/WorkTasks/GetWorkTasks`)
			.subscribe((response: any) => {
				this.tasks.next(response.data);
				this.commonService.loading.next(false);
			});
	};

	getTasksList = () =>
		this.http.get(`${this.commonService.getApi()}/api/WorkTasks/WorkTasksForDropdown`);

	getSTaskListBySubProject = (id) =>
		this.http.get(
			`${this.commonService.getApi()}/api/WorkTasks/GetWorkTasksForSubProjects/${id}`,
		);

	getTasksListBySubProject = (projectId: any) =>
		this.http.get(
			`${this.commonService.getApi()}/api/WorkTasks/WorkTasksBySubProjectForDropdown?id=${projectId}`,
		);

	getTaskById = (id: any) =>
		this.http.get(`${this.commonService.getApi()}/api/WorkTasks/GetWorkTask/${id}`);

	updateTaskById = (id: any, data: any) =>
		this.http.put(`${this.commonService.getApi()}/api/WorkTasks/PutWorkTask/${id}`, data);

	addTask = (data: any) =>
		this.http.post(`${this.commonService.getApi()}/api/WorkTasks/PostWorkTask`, data);

	deleteTaskById = (id: any) =>
		this.http.delete(
			`${this.commonService.getApi()}/api/WorkTasks/DeleteWorkTask/${id}`,
			{},
		);
}
