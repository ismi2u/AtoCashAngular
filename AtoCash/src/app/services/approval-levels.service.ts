import { CommonService } from 'src/app/services/common.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApprovalLevelsService {

  approvalLevels = new BehaviorSubject([]);

  constructor(private http:HttpClient, private commonService:CommonService) { }


  getApprovalLevels = () =>{
     this.http.get(`${this.commonService.getApi()}/api/ApprovalLevels`).subscribe((response:any)=>{
      this.approvalLevels.next(response.data);
      this.commonService.loading.next(false);
     });
    }
  

  getApprovalLevelById = (id:any) => this.http.get(`${this.commonService.getApi()}/api/ApprovalLevels/${id}`);

  updateApprovalLevelById = (id:any,data:any) => this.http.put(`${this.commonService.getApi()}/api/ApprovalLevels/${id}`,data);

  addApprovalLevel = (data:any) => this.http.post(`${this.commonService.getApi()}/api/ApprovalLevels`,data);  

  deleteApprovalLevelById = (id:any) => this.http.delete(`${this.commonService.getApi()}/api/ApprovalLevels/${id}`,{});
}
