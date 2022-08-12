import { CommonService } from 'src/app/services/common.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApprovalGroupsService } from 'src/app/services/approval-groups.service';

@Component({
	selector: 'app-approval-group-list',
	templateUrl: './approval-group-list.component.html',
	styleUrls: ['./approval-group-list.component.scss'],
})
export class ApprovalGroupListComponent implements OnInit {
	approvalGroups: any;
	approvalGroupsHeaders: any = [
		'tableHeader.approvalGroup.groupCode',
		'tableHeader.approvalGroup.groupDescription',
	];

	constructor(
		private _cdr: ChangeDetectorRef,
		private approvalGroupService: ApprovalGroupsService,
		private router: Router,
    private commonService:CommonService
	) {}

	ngOnInit(): void {
    this.commonService.loading.next(true);
		this.approvalGroupService.getApprovalGroups();
		this.approvalGroupService.approvalGroups.subscribe((data) => {
			this.approvalGroups = data;
			this._cdr.detectChanges();
		});
	}

	deleteRecord = (event) => {
    this.commonService.loading.next(true);
		this.approvalGroupService
			.deleteApprovalGroupById(event.id)
			.subscribe(() => {
				this.approvalGroupService.getApprovalGroups();
        this.commonService.loading.next(false);
			});
	};

	editRecord = (event) => {
		this.router.navigateByUrl(`/approval-group/action/edit/${event.id}`);
	};
}
