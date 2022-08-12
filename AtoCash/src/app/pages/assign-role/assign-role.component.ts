import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserRolesService } from "src/app/services/user-roles.service";
import { UserService } from "src/app/services/users.service";

@Component({
  selector: "app-task",
  templateUrl: "./assign-role.component.html",
  styleUrls: ["./assign-role.component.scss"],
})
export class AssignRoleComponent implements OnInit {
  form!: FormGroup;
  userRoles = [];
  users: any = {};
  userId = null;

  constructor(
    private fb: FormBuilder,
    private snapshot: ActivatedRoute,
    private userRolesService: UserRolesService,
    private userService: UserService,

    private router: Router
  ) {}

  submitForm(): void {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    this.userService.assignUserRole(this.form.value).subscribe(()=>{
      this.userService
      .getUserById(this.userId)
      .subscribe((response: any) => {
        this.form.controls['roleIds'].setValue(response.data.roleids)
      });
    
    });
  }

  ngOnInit(): void {
    this.userService.getUsers();
    this.userRolesService.getUserRoles();
    this.userRolesService.userRoles.subscribe(data=>{
      this.userRoles = data
    })
    this.userService.users.subscribe((data) => {
      this.users = data;
   if(data.length > 0) {
      this.userService
      .getUserById(data[0].id)
      .subscribe((response: any) => {
        let formData = {
          userId: response.data.user.id,
          roleIds:response.data.roleids,
        };
        this.form.setValue(formData);
      });
    }
    });
   

    this.form = this.fb.group({
      roleIds: [[], [Validators.required]],
      userId: [null, [Validators.required]],
    });

    this.form.get('userId').valueChanges.subscribe(value=>{
     this.userChange(value)
    })
  }

  userChange(id) {
    this.userId = id;

      this.userService
      .getUserById(id)
      .subscribe((response: any) => {
        this.form.controls['roleIds'].setValue(response.data.roleids)
      });
    
  }
}
