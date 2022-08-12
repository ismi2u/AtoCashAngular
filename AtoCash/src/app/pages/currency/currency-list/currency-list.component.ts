import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-status-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss'],
})
export class CurrencyListComponent implements OnInit {
  currencies: any;
  currencyHeaders: any = [
    'tableHeader.currency.currencyCode',
    'tableHeader.currency.country'
  ];

  constructor(
    private _cdr: ChangeDetectorRef,
    private currencyService: CurrencyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currencyService.getCurrencies();
    this.currencyService.currencies.subscribe((data) => {
      this.currencies = data;
      this._cdr.detectChanges();
    });
  }

  deleteRecord = (event) => {
    this.currencyService.deleteCurrency(event.id).subscribe(() => {
      this.currencyService.getCurrencies();
    });
  };

  editRecord = (event) => {
    this.router.navigateByUrl(`/currency/action/edit/${event.id}`);
  };
}
