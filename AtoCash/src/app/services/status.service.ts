import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  status = new BehaviorSubject([]);

  constructor(private http: HttpClient,  private commonService:CommonService) {}

  getStatus = () => {
    this.http
      .get(`${this.commonService.getApi()}/api/StatusTypes/GetStatusTypes`)
      .subscribe((response: any) => {
        this.status.next(response.data);
      });
  };

  getStatusList = () =>
    this.http.get(`${this.commonService.getApi()}/api/StatusTypes/StatusTypesForDropdown`);

  getStatusById = (id: any) =>
    this.http.get(`${this.commonService.getApi()}/api/StatusTypes/GetStatusType/${id}`);

  updateStatusById = (id: any, data: any) =>
    this.http.put(`${this.commonService.getApi()}/api/StatusTypes/PutStatusType/${id}`, data);

  addStatus = (data: any) =>
    this.http.post(`${this.commonService.getApi()}/api/StatusTypes/PostStatusType`, data);

  deleteStatus = (id: any) =>
    this.http.delete(`${this.commonService.getApi()}/api/api/StatusTypes/DeleteStatusType/${id}`, {});
}
