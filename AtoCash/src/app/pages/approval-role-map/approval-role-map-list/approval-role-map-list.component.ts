import { CommonService } from 'src/app/services/common.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApprovalRoleMapsService } from 'src/app/services/approval-role-maps.service';

@Component({
	selector: 'app-approval-role-map-list',
	templateUrl: './approval-role-map-list.component.html',
	styleUrls: ['./approval-role-map-list.component.scss'],
})
export class ApprovalRoleMapListComponent implements OnInit {
	approvalRoleMaps: any;
	approvalRoleMapsHeaders: any = [
		'tableHeader.approvalRoleMap.group',
		'tableHeader.approvalRoleMap.role',
		'tableHeader.approvalRoleMap.level',
		'tableHeader.approvalRoleMap.employeeName',
	];

	constructor(
		private _cdr: ChangeDetectorRef,
		private approvalRoleMapService: ApprovalRoleMapsService,
		private router: Router,
    private commonService: CommonService
	) {}

	ngOnInit(): void {
    this.commonService.loading.next(true);
		this.approvalRoleMapService.getApprovalRoleMaps();
		this.approvalRoleMapService.approvalRoles.subscribe((data) => {
			this.approvalRoleMaps = data;
			this._cdr.detectChanges();
		});
	}

	deleteRecord = (event) => {
    this.commonService.loading.next(true);
		this.approvalRoleMapService
			.deleteApprovalRoleMapById(event.id)
			.subscribe(() => {
				this.approvalRoleMapService.getApprovalRoleMaps();
        this.commonService.loading.next(false);
			});
	};

	editRecord = (event) => {
		this.router.navigateByUrl(`/approval-role-map/action/edit/${event.id}`);
	};
}
