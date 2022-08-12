import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RolesService } from 'src/app/services/roles.service';

@Component({
	selector: 'app-role-list',
	templateUrl: './role-list.component.html',
	styleUrls: ['./role-list.component.scss'],
})
export class RolelistComponent implements OnInit {
	roles: any;
	rolesHeaders: any = [
		'tableHeader.role.roleCode',
		'tableHeader.role.roleName',
		'tableHeader.role.maxAmount',
	];
	constructor(
		private _cdr: ChangeDetectorRef,
		private roleService: RolesService,
		private router: Router,
	) {}

	ngOnInit(): void {
		this.roleService.getJobRoles();
		this.roleService.jobRoles.subscribe((data) => {
			this.roles = data;
			this._cdr.detectChanges();
		});
	}

	deleteRecord = (event) => {
		this.roleService.deleteJobRole(event.id).subscribe(() => {
			this.roleService.getJobRoles();
		});
	};

	editRecord = (event) => {
		this.router.navigateByUrl(`/role/action/edit/${event.id}`);
	};
}
