import { CommonService } from 'src/app/services/common.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employees = new BehaviorSubject([]);

  constructor(private http:HttpClient,private commonService:CommonService) { }


  getEmployees = () =>{
     this.http.get(`${this.commonService.getApi()}/api/Employees/GetEmployees`).subscribe((response:any)=>{
      this.employees.next(response.data);
      this.commonService.loading.next(false)
     });
    }
  
  getEmployeeList = () => this.http.get(`${this.commonService.getApi()}/api/Employees/EmployeesForDropdown`);

  getEmployeeListByManager = (id) => this.http.get(`${this.commonService.getApi()}/api/Employees/GetReporteesUnderManager/${id}`);


  getEmployeeById = (id:any) => this.http.get(`${this.commonService.getApi()}/api/Employees/GetEmployee/${id}`);

  updateEmployeeById = (id:any,data:any) => this.http.put(`${this.commonService.getApi()}/api/Employees/PutEmployee/${id}`,data);

  addEmployee = (data:any) => this.http.post(`${this.commonService.getApi()}/api/Employees/PostEmployee`,data);  

  deleteEmployee = (id:any) => this.http.delete(`${this.commonService.getApi()}/api/Employees/DeleteEmployee/${id}`,{});
}
