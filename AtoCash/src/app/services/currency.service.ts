import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  currencies = new BehaviorSubject([]);

  constructor(private http: HttpClient, private commonService:CommonService) {}

  getCurrencies = () => {
    this.http
      .get(`${this.commonService.getApi()}/api/CurrencyTypes/GetCurrencyTypes`)
      .subscribe((response: any) => {
        this.currencies.next(response.data);
      });
  };

  getCurrencyList = () =>
    this.http.get(`${this.commonService.getApi()}/api/CurrencyTypes/CurrencyTypesForDropdown`);

  getCurrencyById = (id: any) =>
    this.http.get(`${this.commonService.getApi()}/api/CurrencyTypes/GetCurrencyType/${id}`);

  updateCurrencyById = (id: any, data: any) =>
    this.http.put(`${this.commonService.getApi()}/api/CurrencyTypes/PutCurrencyType/${id}`, data);

  addCurrency = (data: any) =>
    this.http.post(`${this.commonService.getApi()}/api/CurrencyTypes/PostCurrencyType`, data);

  deleteCurrency = (id: any) =>
    this.http.delete(`${this.commonService.getApi()}/api/CurrencyTypes/DeleteCurrencyType/${id}`, {});
}
