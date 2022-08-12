import { ApprovalStatusService } from '../../../services/approval-status.service';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApprovalLevelsService } from 'src/app/services/approval-levels.service';
import { CommonService } from 'src/app/services/common.service';
import { RequestService } from 'src/app/services/request.service';
import { TravelRequestService } from 'src/app/services/travel-request.service';

@Component({
	selector: 'app-approval-level-list',
	templateUrl: './travel-request-list.component.html',
	styleUrls: ['./travel-request-list.component.scss'],
})
export class TravelRequestListComponent implements OnInit {
	travelRequests: any = [];
	travelRequestHeaders: any = [
		'tableHeader.travel.id',
		// 'tableHeader.travel.startDate',
		// 'tableHeader.travel.endDate',
		'tableHeader.travel.department',
		'tableHeader.travel.project',
		'tableHeader.travel.travelPurpose',
		'tableHeader.travel.status',
	];
	requestApprovalFlow = null;
	requestDetails = null;
	empId = this.commonService.getUser().empId;

	constructor(
		private commonService: CommonService,
		private requestService: RequestService,
		private translate: TranslateService,
		private _cdr: ChangeDetectorRef,
		private travelRequestService: TravelRequestService,
		private router: Router,
		private snapshot: ActivatedRoute,
	) {}

	ngOnInit(): void {
		this.travelRequestService.getTravelRequests(
			this.commonService.getUser().empId,
		);
		this.travelRequestService.travelRequest.subscribe((data) => {
			this.travelRequests = data;
			this._cdr.detectChanges();
		});
	}

	deleteRecord = (event) => {
		this.travelRequestService.deleteTravelRequest(event.id).subscribe(() => {
			this.travelRequestService.getTravelRequests(
				this.commonService.getUser().empId,
			);
		});
	};

	editRecord = (event) => {
		this.router.navigateByUrl(`/travel-request/action/edit/${event.id}`);
	};

	getRowData = (event) => {
		this.requestService
			.getTravelRequestStatus(event.id)
			.subscribe((statusResponse: any) => {
				this.requestApprovalFlow = statusResponse.data;
				this.travelRequestService
					.getTravelRequestById(event.id)
					.subscribe((detailsResponse: any) => {
						this.requestDetails = detailsResponse.data;
					});
			});
	};
}
