import { CommonService } from 'src/app/services/common.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './../../../services/users.service';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubProjectsService } from 'src/app/services/sub-projects.service';
import { TasksService } from 'src/app/services/tasks.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  form!: FormGroup;
  recordId: any;
  formType: any = 'Add';
  employees = [];
  mode = 'add';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private snapshot: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router,
    private userService: UserService,
    private translate: TranslateService,
    private commonService:CommonService
  ) {}

  getButtonLabel = () => {
    return this.mode !== 'edit'
      ? this.translate.instant('button.create')
      : this.translate.instant('button.update');
  };

  submitForm(): void {
    this.commonService.loading.next(true)
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }

    if (this.mode === 'edit') {
      this.userService
        .updateUser(this.recordId, { ...this.form.value, id: this.recordId })
        .subscribe(() => {
          this.router.navigateByUrl(`/user/list`);
        });
    } else {
      this.userService.addUser({...this.form.value, email: this.form.controls['email'].value}).subscribe(() => {
        this.router.navigateByUrl(`/user/list`);
      });
    }

  }

  ngOnInit(): void {
    this.employeeService.employees.subscribe((employees: any) => {
      this.employees = employees;
    });

    this.snapshot.params.subscribe((param) => {
      if (param.type === 'edit') {
        this.mode = param.type;
        this.userService.getUserById(param.id).subscribe((response: any) => {
          this.recordId = param.id;
          const formData = {
            username: response.data.user.userName,
            email: response.data.user.email,
          };
          this.form.setValue(formData);
          this.commonService.loading.next(false)
        });
      }else {
        this.employeeService.getEmployees();
      }
    });
    this.form =
      this.mode == 'add'
        ? this.fb.group({
            email: [null, [Validators.required]],
            username: [null, [Validators.required]],
            password: [null, [Validators.required]],
            employeeId: [null, [Validators.required]],
          })
        : this.fb.group({
            email: [null, [Validators.required]],
            username: [null, [Validators.required]],
          });

    this.form.controls['email'].disable();
    this.form.get('employeeId').valueChanges.subscribe((value) => {
      this.setEmail(value);
    });
  }

  setEmail = (value) => {
    const index = this.employees.findIndex((employee) => employee.id === value);
    if (index !== -1) {
      this.form.controls['email'].setValue(this.employees[index].email);
    }
  };

  getLabel = (option) => {
     return `${option.empCode} ${option.firstName} ${option.lastName}`
  }
}
