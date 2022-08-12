import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { EmployeeTypesService } from "src/app/services/employee-types.service";

@Component({
  selector: "app-employment-type-form",
  templateUrl: "./employment-type-form.component.html",
  styleUrls: ["./employment-type-form.component.scss"],
}) 
export class EmploymentTypeFormComponent implements OnInit {
  form!: FormGroup;
  recordId: any;
  mode: any = "add";

  constructor(
    private fb: FormBuilder,
    private snapshot: ActivatedRoute,
    private employeeTypeService: EmployeeTypesService,
    private router: Router,
    private translate: TranslateService
  ) {}

  getButtonLabel = () => {
    return  this.mode !== "edit" ? this.translate.instant('button.create') : this.translate.instant('button.update')
    
  }
  submitForm(): void {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }

    if (this.mode === "edit") {
      this.employeeTypeService
        .updateEmploymentTypeById(this.recordId, {
          ...this.form.value,
          id: this.recordId,
        })
        .subscribe(() => {
          this.router.navigateByUrl(`/employment-type/list`);

        });
    } else {
      this.employeeTypeService
        .addEmploymentType(this.form.value)
        .subscribe(() => {
          this.router.navigateByUrl(`/employment-type/list`);

        });
    }

  }

  ngOnInit(): void {
    this.snapshot.params.subscribe((param) => {
      if (param.type === "edit") {
        this.mode = param.type;
        this.employeeTypeService
          .getEmploymentTypeById(param.id)
          .subscribe((response: any) => {
            this.recordId = param.id;
            delete response.data.id;
            this.form.setValue(response.data);
            if(this.mode === 'edit')
            this.form.controls['empJobTypeCode'].disable()
          });
      }
    });
    this.form = this.fb.group({
      empJobTypeCode: [null, [Validators.required]],
      empJobTypeDesc: [null, [Validators.required]],
    });
  }
}
