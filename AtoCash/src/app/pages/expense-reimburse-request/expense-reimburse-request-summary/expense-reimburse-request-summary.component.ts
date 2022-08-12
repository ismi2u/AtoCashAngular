import { CommonService } from 'src/app/services/common.service';
import { ExpenseTypesService } from 'src/app/services/expense-types.service';
import { ProjectsService } from './../../../services/projects.service';
import { Component, Input, OnInit } from '@angular/core';
import { SubProjectsService } from 'src/app/services/sub-projects.service';
import { TasksService } from 'src/app/services/tasks.service';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-expense-reimburse-summary',
  templateUrl: './expense-reimburse-request-summary.component.html',
  styleUrls: ['./expense-reimburse-request-summary.component.scss'],
})
export class ExpenseReimburseRequestSummaryComponent implements OnInit {
  @Input() data: any;
  project = null;
  subProject = null;
  workTask = null;
  expenseTypes = []
  constructor(
    private projectService: ProjectsService,
    private subProjectService: SubProjectsService,
    private expenseTypeService: ExpenseTypesService,
    private taskService: TasksService,
    private modal: NzModalRef,
    private commonService:CommonService
  ) {}

  ngOnInit(): void {

    this.expenseTypeService.getExpenseTypes();
    this.commonService.loading.next(true)
    if (this.data.projectId)
      this.projectService
        .getProjectById(this.data.projectId)
        .subscribe((projectResponse: any) => {
          this.project = projectResponse.data;

          if (this.data.subProjectId)
            this.subProjectService
              .getSubProjectById(this.data.subProjectId)
              .subscribe((subProjectResponse: any) => {
                this.subProject = subProjectResponse.data;

                if (this.data.workTaskId)
                  this.taskService
                    .getTaskById(this.data.workTaskId)
                    .subscribe((taskResponse: any) => {
                      this.workTask = taskResponse.data;
                      this.commonService.loading.next(false)

                    });
              });
        });

        this.expenseTypeService.expenseTypes.subscribe(data=>{
          this.expenseTypes = data;
        })
  }

  submit() {
    this.modal.close({
      data: 'submit',
    });
  }

  getExpenseName = (id) => {
    return this.expenseTypes.filter(expense=>expense.id === id)[0].expenseTypeName
  }

}
