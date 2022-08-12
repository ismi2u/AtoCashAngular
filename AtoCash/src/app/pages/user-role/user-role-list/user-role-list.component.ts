import { TranslateService } from '@ngx-translate/core';
import { UserRolesService } from './../../../services/user-roles.service';

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './user-role-list.component.html',
  styleUrls: ['./user-role-list.component.scss']
})
export class UserRoleListComponent implements OnInit {
  userRoles: any;
  userRolesHeaders: any = [
    'tableHeader.userRole.roleName',
  ];


  constructor(private translate: TranslateService,private _cdr: ChangeDetectorRef,private userRoleService: UserRolesService, private router:Router,private snapshot:ActivatedRoute ) {}

  ngOnInit(): void {
    this.userRoleService.getUserRoles();
    this.userRoleService.userRoles.subscribe(data=>{
      this.userRoles = data;
      this._cdr.detectChanges();
    })

  }

  deleteRecord = (event) => {
    this.userRoleService.deleteUserRole(event.id).subscribe(() => {
      this.userRoleService.getUserRoles();
    });
  }

  editRecord = (event) => {
    this.router.navigateByUrl(`/user-role/action/edit/${event.id}`);
  }
}
