import { CommonService } from 'src/app/services/common.service';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApprovalLevelsService } from 'src/app/services/approval-levels.service';

@Component({
	selector: 'app-approval-level-list',
	templateUrl: './approval-level-list.component.html',
	styleUrls: ['./approval-level-list.component.scss'],
})
export class ApprovalLevelListComponent implements OnInit {
	approvalLevels: any;
	approvalLevelsHeaders: any = [
		'tableHeader.approvalLevel.level',
		'tableHeader.approvalLevel.levelDescription',
	];

	constructor(
		private _cdr: ChangeDetectorRef,
		private approvalLevelService: ApprovalLevelsService,
		private router: Router,
    private commonService: CommonService
	) {}

	ngOnInit(): void {
    this.commonService.loading.next(true);
		this.approvalLevelService.getApprovalLevels();
		this.approvalLevelService.approvalLevels.subscribe((data) => {
			this.approvalLevels = data;
			this._cdr.detectChanges();
		});
	}

	deleteRecord = (event) => {
    this.commonService.loading.next(true);
		this.approvalLevelService
			.deleteApprovalLevelById(event.id)
			.subscribe(() => {
				this.approvalLevelService.getApprovalLevels();
        this.commonService.loading.next(false);
			});
	};

	editRecord = (event) => {
		this.router.navigateByUrl(`/approval-level/action/edit/${event.id}`);
	};
}
