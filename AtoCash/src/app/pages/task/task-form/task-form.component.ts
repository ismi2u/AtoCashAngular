import { CommonService } from 'src/app/services/common.service';
import { TranslateService } from '@ngx-translate/core';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubProjectsService } from 'src/app/services/sub-projects.service';
import { TasksService } from 'src/app/services/tasks.service';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  form!: FormGroup;
  recordId: any;
  mode: any = 'Add';
  subProjects = [];


  constructor(
    private fb: FormBuilder,
    private snapshot: ActivatedRoute,
    private subProjectService: SubProjectsService,
    private router: Router,
    private taskService:TasksService,
    private translate: TranslateService,
    private commonService:CommonService
  ) {}
  getButtonLabel = () => {
    return  this.mode !== "edit" ? this.translate.instant('button.create') : this.translate.instant('button.update')
    
  }

  submitForm(): void {
    this.commonService.loading.next(true)
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    if (this.mode === 'edit') {
      this.taskService
        .updateTaskById(this.recordId, {...this.form.value,id:this.recordId})
        .subscribe(() => {
          this.router.navigateByUrl(`/task/list`);
        });
    } else {
      this.taskService
        .addTask(this.form.value)
        .subscribe(() => {
          this.router.navigateByUrl(`/task/list`);
        });
    }

  }

 

  ngOnInit(): void {
    this.subProjectService.getSubProjectList().subscribe((response:any)=>{
      this.subProjects = response.data;
    })

    this.snapshot.params.subscribe((param) => {
      if (param.type === 'edit') {
        this.mode = param.type;
        this.taskService
          .getTaskById(param.id)
          .subscribe((response: any) => {
            this.recordId = param.id;
            delete response.data.id;
            delete response.data.subProject;
            this.form.setValue(response.data);
            this.commonService.loading.next(false)
          });
      }else{
        this.commonService.loading.next(false)
      }
    });
    this.form = this.fb.group({
      subProjectId: [null, [Validators.required]],
      taskName: [null, [Validators.required]],
      taskDesc: [null, [Validators.required]],

    });
  }

 

}
