import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-progress',
  templateUrl: './status-progress.component.html',
  styleUrls: ['./status-progress.component.scss'],
})
export class StatusProgressComponent implements OnInit {
  @Input() progressData: any = [
    {
      name: 'Step 1',
      status: 'finish',
    },
    {
      name: 'Step 2',
      status: 'process',
    },
    {
      name: 'Step 3',
      status: 'wait',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  getStatus = (data: any) => {
    switch (data.approvalStatusType) {
      case 'Approved':
        return 'finish';
      case 'Rejected':
        return 'error';
      case 'Pending':
        return 'process'
      default:
        return 'wait';
    }
  };
}
