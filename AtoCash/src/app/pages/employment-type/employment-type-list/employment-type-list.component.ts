import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { EmployeeTypesService } from "src/app/services/employee-types.service";

@Component({
  selector: "app-employment-type-list",
  templateUrl: "./employment-type-list.component.html",
  styleUrls: ["./employment-type-list.component.scss"],
})
export class EmploymentTypeListComponent implements OnInit {
  employmentTypes: any;
  employmentTypesHeaders: any =[  'tableHeader.employmentType.employmentTypeName',   'tableHeader.employmentType.employmentTypeDescription'];

  constructor(
    private _cdr: ChangeDetectorRef,
    private service: EmployeeTypesService,
    private router: Router,
    private translate:TranslateService,
  ) {}

  ngOnInit(): void {
    this.service.getEmploymentTypes();
    this.service.employeeTypes.subscribe((data) => {
      this.employmentTypes = data;
      this._cdr.detectChanges();
    });
  }

  deleteRecord = (event) => {
    this.service.deleteEmploymentType(event.id).subscribe(() => {
      this.service.getEmploymentTypes();
    });
  };

  editRecord = (event) => {
    this.router.navigateByUrl(`/employment-type/action/edit/${event.id}`);
  };
}
