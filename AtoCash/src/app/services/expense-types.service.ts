import { CommonService } from 'src/app/services/common.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class ExpenseTypesService {
	expenseTypes = new BehaviorSubject([]);

	constructor(private http: HttpClient, private commonService: CommonService) {}

	getExpenseTypes = () => {
		this.http
			.get(`${this.commonService.getApi()}/api/ExpenseTypes/GetExpenseTypes`)
			.subscribe((response: any) => {
				this.expenseTypes.next(response.data);
				this.commonService.loading.next(false);
			});
	};

	getExpenseTypesList = () => {
		return this.http.get(
			`${this.commonService.getApi()}/api/ExpenseTypes/ExpenseTypesForDropdown`,
		);
	};

	getExpenseTypeById = (id: any) =>
		this.http.get(`${this.commonService.getApi()}/api/ExpenseTypes/GetExpenseType/${id}`);

	updateExpenseTypeById = (id: any, data: any) =>
		this.http.put(
			`${this.commonService.getApi()}/api/ExpenseTypes/PutExpenseType/${id}`,
			data,
		);

	addExpenseType = (data: any) =>
		this.http.post(`${this.commonService.getApi()}/api/ExpenseTypes/PostExpenseType`, data);

	deleteExpenseType = (id: any) =>
		this.http.delete(
			`${this.commonService.getApi()}/api/ExpenseTypes/DeleteExpenseType/${id}`,
			{},
		);
}
