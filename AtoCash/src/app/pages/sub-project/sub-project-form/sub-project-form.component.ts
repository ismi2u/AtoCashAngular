import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { SubProjectsService } from 'src/app/services/sub-projects.service';


@Component({
  selector: 'app-sub-project-form',
  templateUrl: './sub-project-form.component.html',
  styleUrls: ['./sub-project-form.component.scss']
})
export class SubProjectFormComponent implements OnInit {

  form!: FormGroup;
  recordId: any;
  mode: any = 'add';
  projects = [];

  constructor(
    private fb: FormBuilder,
    private snapshot: ActivatedRoute,
    private projectService: ProjectsService,
    private router: Router,
    private subProjectService:SubProjectsService,
    private translate: TranslateService,
    private commonService: CommonService
  ) {} 

  getButtonLabel = () => {
    return  this.mode !== "edit" ? this.translate.instant('button.create') : this.translate.instant('button.update')
    
  }

  submitForm(): void {
    this.commonService.loading.next(true);
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }

    if (this.mode === 'edit') {
      this.subProjectService
        .updateSubProjectById(this.recordId, {...this.form.value,id:this.recordId})
        .subscribe(() => {
          this.router.navigateByUrl(`/sub-project/list`);
        });
    } else {
      this.subProjectService
        .addSubProject(this.form.value)
        .subscribe(() => {
          this.router.navigateByUrl(`/sub-project/list`);
        });
    }

  }

 

  ngOnInit(): void {
    this.projectService.getProjectList().subscribe((response:any)=>{
      this.projects = response.data;
   
    })

    this.snapshot.params.subscribe((param) => {
      if (param.type === 'edit') {
        this.mode = param.type;
        this.subProjectService
          .getSubProjectById(param.id)
          .subscribe((response: any) => {
            this.recordId = param.id;
            delete response.data.id;
            delete response.data.projectName;
            this.form.setValue(response.data);
            this.commonService.loading.next(false);
          });
      }else {
        this.commonService.loading.next(false);
      }
    });
    this.form = this.fb.group({
      projectId: [null, [Validators.required]],
      subProjectName: [null, [Validators.required]],
      subProjectDesc: [null, [Validators.required]],

    });
  }
}

