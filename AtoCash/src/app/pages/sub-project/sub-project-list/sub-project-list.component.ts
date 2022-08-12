import { CommonService } from 'src/app/services/common.service';
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SubProjectsService } from "src/app/services/sub-projects.service";

@Component({
  selector: "app-sub-project-list",
  templateUrl: "./sub-project-list.component.html",
  styleUrls: ["./sub-project-list.component.scss"],
})
export class SubProjectListComponent implements OnInit {
  subProjects: any;
  subProjectsHeaders: any = [
    'tableHeader.subProject.project',
    'tableHeader.subProject.subProjectName',
    'tableHeader.subProject.subProjectDescription',
  ];

  constructor(
    private _cdr: ChangeDetectorRef,
    private subProjectService: SubProjectsService,
    private router: Router,
    private commonService:CommonService
  ) {}

  ngOnInit(): void {
    this.commonService.loading.next(true);
    this.subProjectService.getSubProjects();
    this.subProjectService.subProjects.subscribe((data) => {
      this.subProjects = data;
      this._cdr.detectChanges();
    });
  }

  deleteRecord = (event) => {
    this.commonService.loading.next(true);
    this.subProjectService.deleteSubProjectById(event.id).subscribe(() => {
      this.subProjectService.getSubProjects();
    });
  };

  editRecord = (event) => {
    this.router.navigateByUrl(`/sub-project/action/edit/${event.id}`);
  };
}
