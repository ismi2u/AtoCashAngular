import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class CashRequestService {
  cashRequests = new BehaviorSubject([]);
  pendingCashRequest = new BehaviorSubject([]);

  constructor(private http: HttpClient, private commonService:CommonService) {}

  getCashRequests = (id:any) => {
    this.http
      .get(`${this.commonService.getApi()}/api/PettyCashRequests/GetPettyCashRequestRaisedForEmployee/${id}`)
      .subscribe((response: any) => {
        this.cashRequests.next(response.data);
      });
  };


  geCashRequestById = (id: any) =>
    this.http.get(
      `${this.commonService.getApi()}/api/PettyCashRequests/GetPettyCashRequest/${id}`
    );

  updateCashRequestById = (id: any, data: any) =>
    this.http.put(
      `${this.commonService.getApi()}/api/PettyCashRequests/PutPettyCashRequest/${id}`,
      data
    );

  addCashRequest = (data: any) =>
    this.http.post(
      `${this.commonService.getApi()}/api/PettyCashRequests/PostPettyCashRequest`,
      data
    );

  deleteCashRequest = (id: any) =>
    this.http.delete(
      `${this.commonService.getApi()}/api/PettyCashRequests/DeletePettyCashRequest/${id}`,
      {}
    );

  getPendingCashRequests = (id: any) =>
    this.http
      .get(
        `${this.commonService.getApi()}/api/PettyCashRequests/ApprovalsPendingRaisedByEmployee/${id}`
      )
      .subscribe((response: any) => {
        this.pendingCashRequest.next(response.data);
      });

  geCashRequestCount = (id: any) =>
    this.http.get(
      `${this.commonService.getApi()}/api/PettyCashRequests/CountAllPettyCashRequestRaisedByEmployee/${id}`
    );



}
