import { RequestService } from 'src/app/services/request.service';
import { CommonService } from './../../../services/common.service';
import { CashRequestService } from './../../../services/cash-request.service';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApprovalLevelsService } from 'src/app/services/approval-levels.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-approval-level-list',
  templateUrl: './cash-advance-list.component.html',
  styleUrls: ['./cash-advance-list.component.scss']
})
export class CashAdvanceListComponent implements OnInit {

  cashRequests: any = [];
  cashRequestHeaders: any = [
    'tableHeader.cashAdvance.id',
    'tableHeader.cashAdvance.department',
    'tableHeader.cashAdvance.project',
    'tableHeader.cashAdvance.advanceDescription',  
    'tableHeader.cashAdvance.claimAmount',
    'tableHeader.cashAdvance.status',  
  ];
  requestApprovalFlow = null;
  requestDetails = null
  empId = this.commonService.getUser().empId

  constructor(private commonService:CommonService,private requestService:RequestService ,private translate: TranslateService,private _cdr: ChangeDetectorRef,private cashRequestService: CashRequestService, private router:Router,private snapshot:ActivatedRoute ) {}

  ngOnInit(): void {
    this.commonService.loading.next(true)
    this.cashRequestService.getCashRequests(this.empId);
    this.cashRequestService.cashRequests.subscribe(data=>{
      this.cashRequests = data;
      this._cdr.detectChanges();
      this.commonService.loading.next(false)

    })

  }

  deleteRecord = (event) => {
    this.commonService.loading.next(true)

    this.cashRequestService.deleteCashRequest(event.id).subscribe(() => {
      this.cashRequestService.getCashRequests(this.empId);
      this.commonService.loading.next(false)

    });
  }

  editRecord = (event) => {
    this.router.navigateByUrl(`/cash-advance/action/edit/${event.id}`);
  }

  getRowData = (event) => {
    this.commonService.loading.next(true)
    this.requestService.getRequestStatus(event.id).subscribe((statusResponse:any)=>{
      this.requestApprovalFlow = statusResponse.data
      this.cashRequestService.geCashRequestById(event.id).subscribe((detailsResponse:any)=>{
        this.requestDetails = detailsResponse.data
        this.commonService.loading.next(false)

      })
    })
    
  }
}
