import { CommonService } from 'src/app/services/common.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class ExpenseReimburseRequestService {
	expenseReimburseRequest = new BehaviorSubject([]);
	duplicateExpenseReimburseRequest = {}
	totalClaimAmount = new BehaviorSubject(0);


	constructor(private http: HttpClient,  private commonService:CommonService) {}

	getExpenseRequests = (id) => {
		this.http
			.get(
				`${this.commonService.getApi()}/api/ExpenseReimburseRequests/GetExpenseReimburseRequestRaisedForEmployee/${id}`,
			)
			.subscribe((response: any) => {
				this.expenseReimburseRequest.next(response.data);
			});
	};

	getExpenseRequestById = (id: any) =>
		this.http.get(
			`${this.commonService.getApi()}/api/ExpenseReimburseRequests/GetExpenseReimburseRequest/${id}`,
		);

	updateExpenseRequestById = (id: any, data: any) =>
		this.http.put(
			`${this.commonService.getApi()}/api/ExpenseReimburseRequests/PutExpenseReimburseRequest/${id}`,
			data,
		);

	addExpenseReimburse = (data: any) => {
		return this.http.post(
			`${this.commonService.getApi()}/api/ExpenseReimburseRequests/PostExpenseReimburseRequest`,
			data,
		);
	};

	addDocuments = (documents) => {
		return this.http.post(
			`${this.commonService.getApi()}/api/ExpenseReimburseRequests/PostDocuments`,
			documents,
		);
	};

	deleteExpenseRequest = (id: any) =>
		this.http.delete(
			`${this.commonService.getApi()}/api/ExpenseReimburseRequests/DeleteExpenseReimburseRequest/${id}`,
			{},
		);

	getExpenseClaimById = (id: any) => {
		return this.http.get(
			`${this.commonService.getApi()}/api/ExpenseSubClaims/GetExpenseSubClaimsByExpenseId/${id}`,
			{},
		);
	};


	getExpenseSubClaimById = (id: any) => {
		return this.http.get(
			`${this.commonService.getApi()}/api/ExpenseSubClaims/GetExpenseSubClaim/{id}`,
			{},
		);
	};


	getDocumentsBySubClaimId = (id: any) =>
		this.http.get(
			`${this.commonService.getApi()}/api/ExpenseReimburseRequests/GetDocumentsBySubClaimsId/${id}`,
		);
	getDocumentById = (id: any) =>
		this.http.get(
			`${this.commonService.getApi()}/api/ExpenseReimburseRequests/GetDocumentByDocId/${id}`,
		);

	getExpenseRequestCount = (id: any) => {
		return this.http.get(
			`${this.commonService.getApi()}/api/ExpenseReimburseRequests/CountAllExpenseReimburseRequestRaisedByEmployee/${id}`,
		);
	};

	deleteDuplicateRequest = (id) => {
       delete this.duplicateExpenseReimburseRequest[id]
	   return Object.values(this.duplicateExpenseReimburseRequest)
	}

	checkRequestInDuplicateRequest = (id) => {
		return Object.keys(this.duplicateExpenseReimburseRequest).includes(id)
	}
}

