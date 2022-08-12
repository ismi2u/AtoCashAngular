import { CommonService } from './../../services/common.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectsService } from './../../services/projects.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRolesService } from 'src/app/services/user-roles.service';
import { UserService } from 'src/app/services/users.service';

@Component({
	selector: 'app-task',
	templateUrl: './assign-project.component.html',
	styleUrls: ['./assign-project.component.scss'],
})
export class AssignProjectComponent implements OnInit {
	form!: FormGroup;
	projects = [];
	employees: any = [];
	selectedProject = null;

	constructor(
		private projectService: ProjectsService,
		private employeeService: EmployeeService,
    private commonService: CommonService
	) {}

	submitForm(): void {}

	ngOnInit(): void {
    this.commonService.loading.next(true)
		this.projectService.getProjectList().subscribe((projects: any) => {
			this.projects = projects.data;
			this.selectedProject = this.projects[0].id;
			this.loadEmployees(this.projects[0].id);
		});
	}

	onProjectChange(event) {
		this.loadEmployees(event);
	}

	loadEmployees(id) {
    this.commonService.loading.next(true)
		this.projectService
			.getEmployeesByProjectId(id)
			.subscribe((employees: any) => {
				this.employees = employees.data.map((employee) => {
					return {
						...employee,
						key: employee.employeeId,
						title: String(employee.employeeName).toLowerCase(),
						direction: employee.isAssigned ? 'right' : undefined,
					};
				});
        this.commonService.loading.next(false)
			});
	}

	onSelectChange(event) {
	}
	onTransfer(event) {
    this.commonService.loading.next(true)
		const requestData = {
			projectId: this.selectedProject,
			employeeIds: this.employees
				.filter((employee) => employee.direction === 'right')
				.map((employee) => employee.employeeId),
		};
    this.projectService.assignEmployeesToProject(requestData).subscribe(response=>{
      this.loadEmployees(this.selectedProject)
    })
	}
}
