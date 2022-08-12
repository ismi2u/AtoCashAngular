import { CommonService } from 'src/app/services/common.service';
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProjectsService } from "src/app/services/projects.service";

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.scss"],
})
export class ProjectListComponent implements OnInit {
  projects: any;
  projectsHeaders: any = [
    'tableHeader.project.projectName',
    'tableHeader.project.projectDescription',
    'tableHeader.project.projectManager',
    'tableHeader.project.status',
  ];

  constructor(
    private _cdr: ChangeDetectorRef,
    private projectService: ProjectsService,
    private router: Router,
    private commonService:CommonService
  ) {}

  ngOnInit(): void {
    this.commonService.loading.next(true);
    this.projectService.getProjects();
    this.projectService.projects.subscribe((data) => {
      this.projects = data;
      this._cdr.detectChanges();
    });
  }

  deleteRecord = (event) => {
    this.commonService.loading.next(true);
    this.projectService.deleteProject(event.id).subscribe(() => {
      this.projectService.getProjects();
    });
  };

  editRecord = (event) => {
    this.router.navigateByUrl(`/project/action/edit/${event.id}`);
  };
}
