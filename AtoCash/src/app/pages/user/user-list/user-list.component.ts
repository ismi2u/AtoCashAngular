import { CommonService } from 'src/app/services/common.service';
import { UserService } from './../../../services/users.service';

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
	users: any;
	usersHeader: any = ['tableHeader.user.userName', 'tableHeader.user.email'];

	constructor(
		private _cdr: ChangeDetectorRef,
		private userService: UserService,
		private router: Router,
    private commonService:CommonService
	) {}

	ngOnInit(): void {
    this.commonService.loading.next(true)
		this.userService.getUsers();
		this.userService.users.subscribe((data) => {
			this.users = data;
			this._cdr.detectChanges();
		});
	}

	deleteRecord = (event) => {
    this.commonService.loading.next(true)
		this.userService.deleteUser(event.id).subscribe(() => {
			this.userService.getUsers();
		});
	};

	editRecord = (event) => {
		this.router.navigateByUrl(`/user/action/edit/${event.id}`);
	};
}
