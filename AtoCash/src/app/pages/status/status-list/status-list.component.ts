import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.scss'],
})
export class StatusListComponent implements OnInit {
  approvalStatus: any;
  approvalStatusHeaders: any = ['tableHeader.status.status'];

  constructor(
    private translate: TranslateService,
    private _cdr: ChangeDetectorRef,
    private statusService: StatusService,
    private router: Router,
    private snapshot: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.statusService.getStatus();
    this.statusService.status.subscribe((data) => {
      this.approvalStatus = data;
      this._cdr.detectChanges();
    });
  }

  deleteRecord = (event) => {
    this.statusService.deleteStatus(event.id).subscribe(() => {
      this.statusService.getStatus();
    });
  };

  editRecord = (event) => {
    this.router.navigateByUrl(`/status/action/edit/${event.id}`);
  };
}
