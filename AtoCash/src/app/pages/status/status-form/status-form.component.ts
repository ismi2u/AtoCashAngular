import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-status-form',
  templateUrl: './status-form.component.html',
  styleUrls: ['./status-form.component.scss']
})
export class StatusFormComponent implements OnInit {


  form!: FormGroup;
  recordId: any;
  mode: any = 'Add';

  constructor(
    private fb: FormBuilder,
    private snapshot: ActivatedRoute,
    private statusService: StatusService,
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

    if (this.mode === 'edit') {
      this.statusService
        .updateStatusById(this.recordId,  {...this.form.value,id:this.recordId})
        .subscribe(() => {
          this.router.navigateByUrl(`/status/list`);

        });
    } else {
      this.statusService
        .addStatus(this.form.value)
        .subscribe(() => {
          this.router.navigateByUrl(`/status/list`);

        });
    }

  }

 

  ngOnInit(): void {
    this.snapshot.params.subscribe((param) => {
      if (param.type === 'edit') {
        this.mode = param.type;
        this.statusService
          .getStatusById(param.id)
          .subscribe((response: any) => {
            this.recordId = param.id;
            delete response.data.id;
            this.form.setValue(response.data);
          });
      }
    });
    this.form = this.fb.group({
      status: [null, [Validators.required]],
    });
  }

}

