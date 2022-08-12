import { CommonService } from 'src/app/services/common.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class DepartmentService {
	departments = new BehaviorSubject([]);

	constructor(private http: HttpClient, private commonService: CommonService) {}

	getDepartments = () => {
		this.http
			.get(`${this.commonService.getApi()}/api/Departments/GetDepartments`)
			.subscribe((response: any) => {
				this.departments.next(response.data);
				this.commonService.loading.next(false);
			});
	};
	getDepartmentsByCostCenterId = (id) => {
		return this.http.get(
			`${this.commonService.getApi()}/api/Departments/DepartmentsForDropdownByCostCentre/${id}`,
		);
	};

	getDepartmentList = () =>
		this.http.get(`${this.commonService.getApi()}/api/Departments/DepartmentsForDropdown`);

	getDepartmentById = (id: any) =>
		this.http.get(`${this.commonService.getApi()}/api/Departments/GetDepartment/${id}`);

	updateDepartmentById = (id: any, data: any) =>
		this.http.put(
			`${this.commonService.getApi()}/api/Departments/PutDepartment/${id}`,
			data,
		);

	addDepartment = (data: any) =>
		this.http.post(`${this.commonService.getApi()}/api/Departments/PostDepartment`, data);

	deleteDepartment = (id: any) =>
		this.http.delete(
			`${this.commonService.getApi()}/api/Departments/DeleteDepartment/${id}`,
			{},
		);
}
