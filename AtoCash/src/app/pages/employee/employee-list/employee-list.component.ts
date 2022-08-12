import { CommonService } from 'src/app/services/common.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
	selector: 'app-employee-list',
	templateUrl: './employee-list.component.html',
	styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
	employees: any;
	employeeHeaders: any = [
		'tableHeader.employee.name',
		'tableHeader.employee.email',
		'tableHeader.employee.mobile',
		'tableHeader.employee.doj',
		'tableHeader.employee.nationality',
	];

	constructor(
		private _cdr: ChangeDetectorRef,
		private service: EmployeeService,
		private router: Router,
		private commonService: CommonService,
	) {}

	ngOnInit(): void {
    this.commonService.loading.next(true)
		this.service.getEmployees();
		this.service.employees.subscribe((data) => {
			this.employees = data;
			this._cdr.detectChanges();
		});
	}

	deleteRecord = (event) => {
    this.commonService.loading.next(true)
		this.service.deleteEmployee(event.id).subscribe(() => {
			this.service.getEmployees();
		});
	};

	editRecord = (event) => {
		this.router.navigateByUrl(`/employee/action/edit/${event.id}`);
	};
}
