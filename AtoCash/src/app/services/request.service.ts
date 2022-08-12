import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestService{

  inbox = []

  constructor(private http: HttpClient,private commonService:CommonService) {}
  
  populateInbox = () => {
    const empId = this.commonService.getEmpId();
    this.getRequestToApprove(empId).subscribe((cashAdvance:any)=>{
      this.inbox = cashAdvance.data;
      this.getTravelRequestToApprove(empId).subscribe((travelRequest:any)=>{
        this.inbox = [...this.inbox, ...travelRequest.data]

        this.getExpenseRequestToApprove(empId).subscribe((expense:any)=>{
          this.inbox = [...this.inbox,...expense.data]
        })
      })
      
    })
  }

  getRequestToApprove = (id) => {
    return this.http.get(
      `${this.commonService.getApi()}/api/ClaimApprovalStatusTrackers/ApprovalsPendingForApprover/${id}`
    );
  };

  getTravelRequestToApprove = (id) => {
    return this.http.get(
      `${this.commonService.getApi()}/api/TravelApprovalStatusTrackers/ApprovalsPendingForApprover/${id}`
    );
  };

  getExpenseRequestToApprove = (id) => {
    return this.http.get(
      `${this.commonService.getApi()}/api/ExpenseReimburseStatusTrackers/ApprovalsPendingForApprover/${id}`
    );
  };

  updateCashAdvanceRequest = (data) => {
    
    return this.http.put(
      `${this.commonService.getApi()}/api/ClaimApprovalStatusTrackers/PutClaimApprovalStatusTracker`,
      data
    );
  };



  updateTravelRequest = (data) => {
    return this.http.put(
      `${this.commonService.getApi()}/api/TravelApprovalStatusTrackers/PutTravelApprovalStatusTracker`,
      data
    );
  };

  updateExpenseRequest = (data) => {
    return this.http.put(
      `${this.commonService.getApi()}/api/ExpenseReimburseStatusTrackers/PutExpenseReimburseStatusTracker`,
      data
    );
  };

  getRequestStatus = (id) => {
    return this.http.get(
      `${this.commonService.getApi()}/api/ClaimApprovalStatusTrackers/ApprovalFlowForRequest/${id}`
    );
  };

  getTravelRequestStatus = (id) => {
    return this.http.get(
      `${this.commonService.getApi()}/api/TravelApprovalStatusTrackers/ApprovalFlowForTravelRequest/${id}`
    );
  };

  getExpenseRequestStatus = (id) => {
    return this.http.get(
      `${this.commonService.getApi()}/api/ExpenseReimburseStatusTrackers/ApprovalFlowForRequest/${id}`
    );
  };

  getRequestDetails = (id) => {
    return this.http.get(
      `${this.commonService.getApi()}/api/ClaimApprovalStatusTrackers/GetClaimApprovalStatusTracker/${id}`
    );
  };

  getTravelRequestDetails = (id) => {
    return this.http.get(
      `${this.commonService.getApi()}/api/TravelApprovalStatusTrackers/GetTravelApprovalStatusTracker/${id}`
    );
  };

  getExpenseRequestDetails = (id) => {
    return this.http.get(
      `${this.commonService.getApi()}/api/ExpenseReimburseStatusTrackers/GetExpenseReimburseStatusTracker/${id}
      `
    );
  };
}
