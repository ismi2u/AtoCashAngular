import { CommonService } from 'src/app/services/common.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class SubProjectsService {
	subProjects = new BehaviorSubject([]);

	constructor(private http: HttpClient, private commonService: CommonService) {}

	getSubProjectListByProject = (id) =>
		this.http.get(
			`${this.commonService.getApi()}/api/SubProjects/GetSubProjectsForProjects/${id}`,
		);

	getSubProjects = () => {
		this.http
			.get(`${this.commonService.getApi()}/api/SubProjects/GetSubProjects`)
			.subscribe((response: any) => {
				this.subProjects.next(response.data);
				this.commonService.loading.next(false);
			});
	};

	getSubProjectList = () =>
		this.http.get(`${this.commonService.getApi()}/api/SubProjects/SubProjectsForDropdown`);

	getSubProjectsListByProject = (projectId: any) =>
		this.http.get(
			`${this.commonService.getApi()}/api/SubProjects/SubProjectsByProjectForDropdown?id=${projectId}`,
		);

	getSubProjectById = (id: any) =>
		this.http.get(`${this.commonService.getApi()}/api/SubProjects/GetSubProject/${id}`);

	updateSubProjectById = (id: any, data: any) =>
		this.http.put(
			`${this.commonService.getApi()}/api/SubProjects/PutSubProject/${id}`,
			data,
		);

	addSubProject = (data: any) =>
		this.http.post(`${this.commonService.getApi()}/api/SubProjects/PostSubProject`, data);

	deleteSubProjectById = (id: any) =>
		this.http.delete(
			`${this.commonService.getApi()}/api/SubProjects/DeleteSubProject/${id}`,
			{},
		);
}
