import { CommonService } from 'src/app/services/common.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApprovalStatusService {

  approvalStatus = new BehaviorSubject([]);

  constructor(private http:HttpClient,private commonService:CommonService) { }


  getApprovalStatus = () =>{
     this.http.get(`${this.commonService.getApi()}/api/ApprovalStatusTypes`).subscribe((response:any)=>{
      this.approvalStatus.next(response.data);
      this.commonService.loading.next(false);
     });
    }
    getApprovalStatusList = () =>{
     return this.http.get(`${this.commonService.getApi()}/api/ApprovalStatusTypes`)
     }
  getApprovalStatusById = (id:any) => this.http.get(`${this.commonService.getApi()}/api/ApprovalStatusTypes/${id}`);

  updateApprovalStatusById = (id:any,data:any) => this.http.put(`${this.commonService.getApi()}/api/ApprovalStatusTypes/${id}`,data);

  addApprovalStatus = (data:any) => this.http.post(`${this.commonService.getApi()}/api/ApprovalStatusTypes`,data);  

  deleteApprovalStatus = (id:any) => this.http.delete(`${this.commonService.getApi()}/api/ApprovalStatusTypes/${id}`,{});
}
