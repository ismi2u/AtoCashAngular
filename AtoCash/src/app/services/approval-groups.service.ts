import { CommonService } from 'src/app/services/common.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApprovalGroupsService {

  approvalGroups = new BehaviorSubject([]);

  constructor(private http:HttpClient,private commonService:CommonService) { }


  getApprovalGroups = () =>{
     this.http.get(`${this.commonService.getApi()}/api/ApprovalGroups/GetApprovalGroups`).subscribe((response:any)=>{
      this.approvalGroups.next(response.data);
      this.commonService.loading.next(false);
     });
    }
  
  getApprovalGroupsList = () => this.http.get(`${this.commonService.getApi()}/api/ApprovalGroups/ApprovalGroupsForDropdown`);

  getApprovalGroupById = (id:any) => this.http.get(`${this.commonService.getApi()}/api/ApprovalGroups/GetApprovalGroup/${id}`);

  updateApprovalGroupById = (id:any,data:any) => this.http.put(`${this.commonService.getApi()}/api/ApprovalGroups/PutApprovalGroup/${id}`,data);

  addApprovalGroup = (data:any) => this.http.post(`${this.commonService.getApi()}/api/ApprovalGroups/PostApprovalGroup`,data);  

  deleteApprovalGroupById = (id:any) => this.http.delete(`${this.commonService.getApi()}/api/ApprovalGroups/DeleteApprovalGroup/${id}`,{});
}
