import { CommonService } from 'src/app/services/common.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  jobRoles = new BehaviorSubject([]);

  constructor(private http:HttpClient, private commonService:CommonService) { }


  getJobRoles= () =>{
     this.http.get(`${this.commonService.getApi()}/api/JobRoles/GetRoles`).subscribe((response:any)=>{
      this.jobRoles.next(response.data);
     });
    }
  
  getJobRoleList = () => this.http.get(`${this.commonService.getApi()}/api/JobRoles/JobRolesForDropdown`);

  getJobRoleById = (id:any) => this.http.get(`${this.commonService.getApi()}/api/JobRoles/GetRole/${id}`);

  updateJobRoleById = (id:any,data:any) => this.http.put(`${this.commonService.getApi()}/api/JobRoles/PutRole/${id}`,data);

  addJobRole = (data:any) => this.http.post(`${this.commonService.getApi()}/api/JobRoles/PostRole`,data);  

  deleteJobRole = (id:any) => this.http.delete(`${this.commonService.getApi()}/api/JobRoles/DeleteRole/${id}`,{});
}
