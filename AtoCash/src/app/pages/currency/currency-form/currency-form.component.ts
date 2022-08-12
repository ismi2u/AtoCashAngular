import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CurrencyService } from 'src/app/services/currency.service';
import { StatusService } from 'src/app/services/status.service';
import { constant } from './../../../constant/constant';
import {countries} from './../../../constant/country-list'
@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.scss'],
})
export class CurrencyFormComponent implements OnInit {
  form!: FormGroup;
  recordId: any;
  mode: any = 'Add';
  nationalities = [];
  status = [];
  constructor(
    private fb: FormBuilder,
    private snapshot: ActivatedRoute,
    private currencyService: CurrencyService,
    private router: Router,
    private translate: TranslateService,
    private statusService: StatusService
  ) {}

  getButtonLabel = () => {
    return this.mode !== 'edit'
      ? this.translate.instant('button.create')
      : this.translate.instant('button.update');
  };

  submitForm(): void {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }

    if (this.mode === 'edit') {
      this.currencyService
        .updateCurrencyById(this.recordId, {
          ...this.form.value,
          id: this.recordId,
        })
        .subscribe(() => {
          this.router.navigateByUrl(`/currency/list`);

        });
    } else {
      this.currencyService.addCurrency(this.form.value).subscribe(() => {
        this.router.navigateByUrl(`/currency/list`);

      });
    }

  }

  ngOnInit(): void {
    this.statusService.getStatusList().subscribe((response: any) => {
      this.status = response.data;
    });
    this.nationalities = countries;
    this.snapshot.params.subscribe((param) => {
      if (param.type === 'edit') {
        this.mode = param.type;
        this.currencyService
          .getCurrencyById(param.id)
          .subscribe((response: any) => {
            this.recordId = param.id;
            delete response.data.id;
            this.form.setValue(response.data);
            this.form.controls['currencyCode'].disable()
          });
      }
    });
    this.form = this.fb.group({
      currencyCode: [null, [Validators.required]],
      currencyName: [null, [Validators.required]],
      country: [null, [Validators.required]],
      statusTypeId: [null, [Validators.required]],
    });
  }
}
