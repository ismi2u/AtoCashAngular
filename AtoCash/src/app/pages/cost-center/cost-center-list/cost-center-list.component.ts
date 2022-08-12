import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { CostService } from 'src/app/services/cost.service';

@Component({
	selector: 'app-cost-center-list',
	templateUrl: './cost-center-list.component.html',
	styleUrls: ['./cost-center-list.component.scss'],
})
export class CostCenterListComponent implements OnInit {
	costCenters: any;
	costCenterHeaders: any = [
		'tableHeader.costCenter.costCenterCode',
		'tableHeader.costCenter.costCenterDescription',
		'tableHeader.costCenter.status',
	];

	constructor(
		private _cdr: ChangeDetectorRef,
		private costService: CostService,
		private router: Router,
		private commonService: CommonService,
	) {}

	ngOnInit(): void {
		this.commonService.loading.next(true);
		this.costService.getCostCenter();
		this.costService.costCenters.subscribe((data) => {
			this.costCenters = data;
			this._cdr.detectChanges();
		});
	}

	deleteRecord = (event) => {
		this.commonService.loading.next(true);
		this.costService.deleteCostCenter(event.id).subscribe(() => {
			this.costService.getCostCenter();
			this.commonService.loading.next(false);
		});
	};

	editRecord = (event) => {
		this.router.navigateByUrl(`/cost-center/action/edit/${event.id}`);
	};
}
