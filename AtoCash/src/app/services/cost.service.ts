import { CommonService } from 'src/app/services/common.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CostService {

  costCenters = new BehaviorSubject([]);

  constructor(private http:HttpClient, private commonService:CommonService) { }


  getCostCenter = () =>{
     this.http.get(`${this.commonService.getApi()}/api/CostCenters/GetCostCenters`).subscribe((response:any)=>{
      this.costCenters.next(response.data);
      this.commonService.loading.next(false)
     });

    }
  
  getCostCenterList = () => this.http.get(`${this.commonService.getApi()}/api/CostCenters/CostCentersForDropdown`);

  getCostCenterById = (id:any) => this.http.get(`${this.commonService.getApi()}/api/CostCenters/GetCostCenter/${id}`);

  updateCostCenterById = (id:any,data:any) => this.http.put(`${this.commonService.getApi()}/api/costcenters/putcostcenter/${id}`,data);

  addCostCenter = (data:any) => this.http.post(`${this.commonService.getApi()}/api/CostCenters/PostCostCenter`,data);  

  deleteCostCenter = (id:any) => this.http.delete(`${this.commonService.getApi()}/api/CostCenters/DeleteCostCenter/${id}`,{});
}
