import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root',
})
export class EmployeeTypesService {
	employeeTypes = new BehaviorSubject([]);

	constructor(private http: HttpClient, private commonService: CommonService) {}

	getEmploymentTypes = () => {
		this.http
			.get(
				`${this.commonService.getApi()}/api/EmploymentTypes/GetEmploymentTypes`,
			)
			.subscribe((response: any) => {
				this.employeeTypes.next(response.data);
			});
	};
	getEmploymentTypesList = () =>	this.http.get(
			`${this.commonService.getApi()}/api/EmploymentTypes/GetEmploymentTypesForDropDown`,
		);

	getEmploymentTypeById = (id: any) =>
		this.http.get(
			`${this.commonService.getApi()}/api/EmploymentTypes/GetEmploymentType/${id}`,
		);

	updateEmploymentTypeById = (id: any, data: any) =>
		this.http.put(
			`${this.commonService.getApi()}/api/EmploymentTypes/PutEmploymentType/${id}`,
			data,
		);

	addEmploymentType = (data: any) =>
		this.http.post(
			`${this.commonService.getApi()}/api/EmploymentTypes/PostEmploymentType`,
			data,
		);

	deleteEmploymentType = (id: any) =>
		this.http.delete(
			`${this.commonService.getApi()}/api/EmploymentTypes/DeleteEmploymentType/${id}`,
			{},
		);
}
