import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CurrentBalanceService {
  currentEmployeesBalance = new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

  getEployeesBalance = () => {
    this.http
      .get(`${this.commonService.getApi()}/api/EmpCurrentPettyCashBalances`)
      .subscribe((response: any) => {
        this.currentEmployeesBalance.next(response.data);
      });
  };

  getEmployeesBalanceById = (id: any) =>
    this.http.get(`${this.commonService.getApi()}/api/EmpCurrentPettyCashBalances/${id}`);

  updateEmployeeBalanceById = (id: any, data: any) =>
    this.http.put(
      `${this.commonService.getApi()}/api/EmpCurrentPettyCashBalances/${id}`,
      data
    );

  addEmployeeBalance = (data: any) =>
    this.http.post(`${this.commonService.getApi()}/api/EmpCurrentPettyCashBalances`, data);

  deleteEmployeeBalance = (id: any) =>
    this.http.delete(
      `${this.commonService.getApi()}/api/EmpCurrentPettyCashBalances/${id}`,
      {}
    );
}
