import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApprovalStatusService } from 'src/app/services/approval-status.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
	selector: 'app-approval-status-list',
	templateUrl: './approval-status-list.component.html',
	styleUrls: ['./approval-status-list.component.scss'],
})
export class ApprovalStatusListComponent implements OnInit {
	approvalStatus: any;
	approvalStatusHeaders: any = [
		'tableHeader.approvalStatus.status',
		'tableHeader.approvalStatus.statusDescription',
	];

	constructor(
		private _cdr: ChangeDetectorRef,
		private approvalStatusService: ApprovalStatusService,
		private router: Router,
		private commonService: CommonService,
	) {}

	ngOnInit(): void {
		this.commonService.loading.next(true);
		this.approvalStatusService.getApprovalStatus();
		this.approvalStatusService.approvalStatus.subscribe((data) => {
			this.approvalStatus = data;
			this._cdr.detectChanges();
		});
	}

	deleteRecord = (event) => {
		this.commonService.loading.next(true);
		this.approvalStatusService.deleteApprovalStatus(event.id).subscribe(() => {
			this.approvalStatusService.getApprovalStatus();
			this.commonService.loading.next(false);
		});
	};

	editRecord = (event) => {
		this.router.navigateByUrl(`/approval-status/action/edit/${event.id}`);
	};
}
