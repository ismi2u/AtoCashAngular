import { CommonService } from 'src/app/services/common.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
	selector: 'app-department-list',
	templateUrl: './department-list.component.html',
	styleUrls: ['./department-list.component.scss'],
})
export class DepartmentListComponent implements OnInit {
	departments: any;
	departmentHeaders: any = [
		'tableHeader.department.departmentCode',
		'tableHeader.department.departmentName',
		'tableHeader.department.costCenter',
		'tableHeader.department.status',
	];

	constructor(
		private _cdr: ChangeDetectorRef,
		private service: DepartmentService,
		private router: Router,
		private commonService:CommonService
	) {}

	ngOnInit(): void {
		this.commonService.loading.next(true);
		this.service.getDepartments();
		this.service.departments.subscribe((data) => {
			this.departments = data;
			this._cdr.detectChanges();
		});
	}

	deleteRecord = (event) => {
		this.commonService.loading.next(true);
		this.service.deleteDepartment(event.id).subscribe(() => {
			this.service.getDepartments();
		});
	};

	editRecord = (event) => {
		this.router.navigateByUrl(`/department/action/edit/${event.id}`);
	};
}
