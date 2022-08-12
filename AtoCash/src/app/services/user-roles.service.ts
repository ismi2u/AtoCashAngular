import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class UserRolesService {

  userRoles = new BehaviorSubject([]);

  constructor(private http:HttpClient, private commonService:CommonService) { }


  getUserRoles= () =>{
     this.http.get(`${this.commonService.getApi()}/api/Administration/ListRoles`).subscribe((response:any)=>{
      this.userRoles.next(response.data);
     });
    }

    getUserRoleList= () =>{
     return this.http.get(`${this.commonService.getApi()}/api/Administration/ListRoles`)
     }
  getUserRoleById = (id:any) => this.http.get(`${this.commonService.getApi()}/api/Administration/GetRoleByRoleId/${id}`);
  
  updateUserRole = (data:any) => this.http.put(`${this.commonService.getApi()}/api/Administration/EditRole`,data);

  addUserRole = (data:any) => this.http.post(`${this.commonService.getApi()}/api/Administration/CreateRole`,data);  

  deleteUserRole = (id:any) => this.http.delete(`${this.commonService.getApi()}/api/Administration/DeleteUser/${id}`);
}
