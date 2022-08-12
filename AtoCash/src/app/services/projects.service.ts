import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  projects = new BehaviorSubject([]);

  constructor(private http:HttpClient,private commonService:CommonService) { }


  getProjects = () =>{
     this.http.get(`${this.commonService.getApi()}/api/Projects/GetProjects`).subscribe((response:any)=>{
      this.projects.next(response.data);
      this.commonService.loading.next(false)
     });
    }
  getProjectByEmpId = (id) => {
    return this.http.get(`${this.commonService.getApi()}/api/ProjectManagement/GetProjectsByEmployee/${id}`);
  }
  getProjectListByEmpId  = () => {
    const user = this.commonService.getUser()
   return this.http.get(`${this.commonService.getApi()}/api/Projects/GetEmployeeAssignedProjects/${user.empId}`);
  }
  getProjectList = () => this.http.get(`${this.commonService.getApi()}/api/Projects/ProjectsForDropdown`);

  getProjectById = (id:any) => this.http.get(`${this.commonService.getApi()}/api/Projects/GetProject/${id}`);

  updateProjectById = (id:any,data:any) => this.http.put(`${this.commonService.getApi()}/api/Projects/PutProject/${id}`,data);

  addProject = (data:any) => this.http.post(`${this.commonService.getApi()}/api/Projects/PostProject`,data);  

  deleteProject = (id:any) => this.http.delete(`${this.commonService.getApi()}/api/Projects/DeleteProject/${id}`,{});

  assignProject= (data:any) => this.http.post(`${this.commonService.getApi()}/api/ProjectManagement/PostProjectManagement`,data);

  getAssignedProjects  = (data:any) => this.http.post(`${this.commonService.getApi()}/api/ProjectManagement/GetProjectAndEmployeeDetails`,data);

  getEmployeesByProjectId = (id:any) => this.http.get(`${this.commonService.getApi()}/api/ProjectManagement/GetEmployeesByProjectId/${id}`)

  assignEmployeesToProject = (data:any) => this.http.post(`${this.commonService.getApi()}/api/ProjectManagement/AddEmployeesToProject`,data)
}
