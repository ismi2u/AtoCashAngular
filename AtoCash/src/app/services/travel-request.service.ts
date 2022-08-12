import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class TravelRequestService {
  travelRequest = new BehaviorSubject([]);


  constructor(private http: HttpClient, private commonService:CommonService) {}




  getTravelRequests = (id) => {
    this.http
      .get(`${this.commonService.getApi()}/api/TravelApprovalRequests/GetTravelApprovalRequestRaisedForEmployee/${id}`)
      .subscribe((response: any) => {
        this.travelRequest.next(response.data);
      });
  };

  getTravelRequestById = (id: any) =>
    this.http.get(
      `${this.commonService.getApi()}/api/TravelApprovalRequests/GetTravelApprovalRequest/${id}`
    );

 

  updateTravelRequestById = (id: any, data: any) =>
    this.http.put(
      `${this.commonService.getApi()}/api/TravelApprovalRequests/PutTravelApprovalRequest/${id}`,
      data
    );

  addTravelRequest = (data: any) =>
    this.http.post(
      `${this.commonService.getApi()}/api/TravelApprovalRequests/PostTravelApprovalRequest`,
      data
    );
    
  deleteTravelRequest = (id: any) =>
    this.http.delete(
      `${this.commonService.getApi()}/api/TravelApprovalRequests/DeleteTravelApprovalRequest/${id}`,
      {}
    );

    getTravelRequestCount = (id:any) => {
      return this.http.get(
         `${this.commonService.getApi()}/api/TravelApprovalRequests/CountAllTravelRequestRaisedByEmployee/${id}`,
       );
      }  
}
