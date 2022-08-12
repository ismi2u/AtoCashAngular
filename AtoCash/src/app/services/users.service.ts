import { CommonService } from 'src/app/services/common.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	users = new BehaviorSubject([]);

	constructor(private http: HttpClient, private commonService: CommonService) {}

	getUsers = () => {
		this.http
			.get(`${this.commonService.getApi()}/api/Administration/ListUsers`)
			.subscribe((response: any) => {
				this.users.next(response.data);
				this.commonService.loading.next(false);
			});
	};
	getUserById = (id: any) =>
		this.http.get(`${this.commonService.getApi()}/api/Administration/GetUserByUserId/${id}`);

	updateUser = (id: any, data: any) =>
		this.http.put(`${this.commonService.getApi()}/api/Administration/EditUser`, data);

	addUser = (data: any) =>
		this.http.post(`${this.commonService.getApi()}/api/Account/Register`, data);

	deleteUser = (id: any) =>
		this.http.delete(
			`${this.commonService.getApi()}/api/Administration/DeleteUser?id=${id}`,
			{},
		);

	assignUserRole = (data: any) =>
		this.http.post(`${this.commonService.getApi()}/api/Administration/AssignRole`, data);
}
