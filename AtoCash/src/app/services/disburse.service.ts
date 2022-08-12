import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root',
})
export class DisburseService {
	constructor(private http: HttpClient,  private commonService:CommonService) {}

	getDisburses = (filter) => {
		return this.http.post(`${this.commonService.getApi()}/api/Reports/AccountsPayableData`,filter);
	};

	downloadDisburseReport =  (filter) => {
		this.http.post(`${this.commonService.getApi()}/api/Reports/AccountsPayableReport`,filter)
			.subscribe((file: any) => {
				let link = document.createElement('a');
				link.href =this.commonService.getApi() + file.data[0];
				link.click();
			});
	}
	

	getDisburseById = (id) => {
		return this.http.get(
			`${this.commonService.getApi()}/api/DisbursementsAndClaimsMasters/${id}`,
		);
	};
	updateDisburseById = (data) => {
		return this.http.put(
			`${this.commonService.getApi()}/api/DisbursementsAndClaimsMasters/${data.id}`,
			data,
		);
	};
}
