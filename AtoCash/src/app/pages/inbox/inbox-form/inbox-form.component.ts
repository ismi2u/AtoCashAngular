import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApprovalLevelsService } from 'src/app/services/approval-levels.service';

@Component({
  selector: 'app-approval-level-form',
  templateUrl: './inbox-form.component.html',
  styleUrls: ['./inbox-form.component.scss']
})
export class InboxFormComponent implements OnInit {



  form!: FormGroup;
  recordId: any;
  formType: any = 'Add';

  constructor(
    private fb: FormBuilder,
    private snapshot: ActivatedRoute,
    private approvalLevelService: ApprovalLevelsService,
    private router: Router
  ) {}

  submitForm(): void {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }

    if (this.formType === 'Edit') {
      this.approvalLevelService
        .updateApprovalLevelById(this.recordId, {...this.form.value,id:this.recordId})
        .subscribe(() => {
          this.approvalLevelService.getApprovalLevels();
        });
    } else {
      this.approvalLevelService
        .addApprovalLevel(this.form.value)
        .subscribe(() => {
          this.approvalLevelService.getApprovalLevels();
        });
    }

    this.router.navigateByUrl(`/cash-advance/list`);
  }

 

  ngOnInit(): void {
    this.snapshot.params.subscribe((param) => {
      if (param.type === 'edit') {
        this.formType = 'Edit';
        this.approvalLevelService
          .getApprovalLevelById(param.id)
          .subscribe((response: any) => {
            this.recordId = param.id;
            delete response.data.id;
            this.form.setValue(response.data);
          });
      }
    });
    this.form = this.fb.group({
      level: [null, [Validators.required]],
      levelDesc: [null, [Validators.required]],
    });
  }
}

