import { ExpenseTypesService } from 'src/app/services/expense-types.service';
import { UserRolesService } from './user-roles.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ApprovalGroupsService } from './approval-groups.service';
import { EmployeeTypesService } from './employee-types.service';
import { ApprovalStatusService } from 'src/app/services/approval-status.service';
import { TasksService } from 'src/app/services/tasks.service';
import { SubProjectsService } from 'src/app/services/sub-projects.service';
import { CommonService } from 'src/app/services/common.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CostService } from './cost.service';
import { DepartmentService } from './department.service';
import { ProjectsService } from './projects.service';
import { StatusService } from './status.service';
import { constant } from 'src/app/constant/constant';
import * as FileSaver from 'file-saver';
import { RolesService } from './roles.service';

@Injectable({
	providedIn: 'root',
})
export class ReportsService implements OnInit {
	userRoles = new BehaviorSubject([]);
	populatedFilters = [];
	filterStatus = new BehaviorSubject([]);
	selectedFilters: any = {};
	downloadUrl = '';

	constructor(
		private http: HttpClient,
		private departmentService: DepartmentService,
		private costCenterService: CostService,
		private projectService: ProjectsService,
		private approvalStatusService: ApprovalStatusService,
		private commonService: CommonService,
		private subProjectService: SubProjectsService,
		private taskService: TasksService,
		private employeeTypesService: EmployeeTypesService,
		private roleService: RolesService,
		private approvalGroupsService: ApprovalGroupsService,
		private statusService: StatusService,
		private employeeService: EmployeeService,
		private userRoleService: UserRolesService,
		private expenseTypeService: ExpenseTypesService,
	) {}

	ngOnInit(): void {}

	getCashReportsByEmployee = (data) => {
		const exceptionalParams = {
			empId:
				!data.empId || data.empId == -1 || data.empId == 0
					? this.commonService.getEmpId()
					: data.empId,
			IsManager: data.empId == 0,
		};

		return this.http.post(
			`${this.commonService.getApi()}/api/Reports/GetAdvanceAndReimburseReportsEmployeeJson`,
			{
				...data,
				...exceptionalParams,
			},
		);
	};
	downloadSubClaimsReport = (data) => {
		const exceptionalParams = {
			empId:
				!this.selectedFilters.empId ||
				this.selectedFilters.empId == -1 ||
				this.selectedFilters.empId == 0
					? this.commonService.getEmpId()
					: this.selectedFilters.empId,
			IsManager: this.selectedFilters.empId == 0,
		};
		this.http
			.post(`${this.commonService.getApi()}/api/Reports/ExpenseSubClaimsReport`, {...this.selectedFilters, ...exceptionalParams})
			.subscribe((file: any) => {
				let link = document.createElement('a');
				link.href =this.commonService.getApi()+ file.data[0];
				link.click();
			});
	};


	getSubClaimsReport = (data) =>
	{
		const exceptionalParams = {
			empId:
				!data.empId || data.empId == -1 || data.empId == 0
					? this.commonService.getEmpId()
					: data.empId,
			IsManager: data.empId == 0,
		};
		return	this.http.post(`${this.commonService.getApi()}/api/Reports/ExpenseSubClaimsData`, {
			...data,
			...exceptionalParams,
		});}

	getUsersReport = (data) =>
		this.http.post(`${this.commonService.getApi()}/api/Reports/GetUsersByRoleId`, {
			...data,
			roleId: data.roleId ? data.roleId : '',
		});

	downloadUserReport = (data) => {
		this.http
			.post(`${this.commonService.getApi()}/api/Reports/GetUsersByRoleIdReport`, {
				...this.selectedFilters,
				roleId: this.selectedFilters.roleId ? this.selectedFilters.roleId : '',
			})
			.subscribe((file: any) => {
				let link = document.createElement('a');
				link.href =this.commonService.getApi()+ file.data[0];
				link.click();
			});
	};

	downloadEmployeesReport = (type) => {
		this.http
			.post(`${this.commonService.getApi()}/api/Reports/GetEmployeesReport`, {
				...this.selectedFilters,
				employeeId: 0,
			})
			.subscribe((file: any) => {
				let link = document.createElement('a');
				link.href =this.commonService.getApi()+ file.data[0];
				link.click();
			});
	};

	getEmployeesReport = (data) =>
		this.http.post(`${this.commonService.getApi()}/api/Reports/GetEmployeesData`, {
			...data,
			employeeId: 0,
		});

	downloadCashReportsByEmployee = async (requestTypeId, type) => {
		const exceptionalParams = {
			empId:
				!this.selectedFilters.empId ||
				this.selectedFilters.empId == -1 ||
				this.selectedFilters.empId == 0
					? this.commonService.getEmpId()
					: this.selectedFilters.empId,
			IsManager: this.selectedFilters.empId == 0,
		};
		this.http
			.post(
				`${this.commonService.getApi()}/api/Reports/GetAdvanceAndReimburseReportsEmployeeExcel`,
				{
					...this.selectedFilters,
					...exceptionalParams,
					requestTypeId,
				},
			)
			.subscribe((file: any) => {
				let link = document.createElement('a');
				link.href =this.commonService.getApi()+ file.data[0];
				link.click();
			});
	};

	getTravelReportsByEmployee = (data) => {
		const exceptionalParams = {
			empId:
				!data.empId || data.empId == -1 || data.empId == 0
					? this.commonService.getEmpId()
					: data.empId,
			IsManager: data.empId == 0,
		};
		return this.http.post(
			`${this.commonService.getApi()}/api/Reports/GetTravelRequestReportForEmployeeJson`,
			{ ...data, ...exceptionalParams },
		);
	};

	downloadTravelReportsByEmployee = (type) => {
		const exceptionalParams = {
			empId:
				!this.selectedFilters.empId ||
				this.selectedFilters.empId == -1 ||
				this.selectedFilters.empId == 0
					? this.commonService.getEmpId()
					: this.selectedFilters.empId,
			IsManager: this.selectedFilters.empId == 0,
		};
		this.http
			.post(
				`${this.commonService.getApi()}/api/Reports/GetTravelRequestReportForEmployeeExcel`,
				{ ...this.selectedFilters, ...exceptionalParams },
			)
			.subscribe((file: any) => {
				let link = document.createElement('a');
				link.href =this.commonService.getApi()+ file.data[0];
				link.click();
			});
	};

	getUserRoleById = (id: any) =>
		this.http.get(`${this.commonService.getApi()}/api/Administration/GetRoleByRoleId/${id}`);

	updateUserRole = (data: any) =>
		this.http.put(`${this.commonService.getApi()}/api/Administration/EditRole`, data);

	addUserRole = (data: any) =>
		this.http.post(`${this.commonService.getApi()}/api/Administration/CreateRole`, data);

	deleteUserRole = (id: any) =>
		this.http.delete(`${this.commonService.getApi()}/api/Administration/DeleteUser/${id}`);

	populateFilters(filters) {
		this.populatedFilters = filters.map((filter) => {
			switch (filter.name) {
				case 'empId':
					this.commonService.canOnlyManage()
						? this.employeeService
								.getEmployeeListByManager(this.commonService.getEmpId())
								.subscribe((employees: any) => {
									const employeesOptions = employees.data.map((employee) => ({
										name: employee.fullName,
										id: employee.id,
									}));
									filter.options = [
										filter.options[0],
										filter.options[1],
										...employeesOptions,
									];
								})
						: this.employeeService
								.getEmployeeList()
								.subscribe((employees: any) => {
									const employeesOptions = employees.data.map((employee) => ({
										name: employee.fullName,
										id: employee.id,
									}));
									filter.options = [
										filter.options[0],
										filter.options[1],
										...employeesOptions,
									];
								});
					break;
				case 'costCenterId':
					this.costCenterService
						.getCostCenterList()
						.subscribe((costCenters: any) => {
							const costCentersOptions = costCenters.data.map((costCenter) => ({
								name: costCenter.costCenterCode,
								id: costCenter.id,
							}));
							filter.options = [filter.options[0], ...costCentersOptions];
						});
					break;
				case 'projectId':
					this.projectService.getProjectList().subscribe((projects: any) => {
						const projectsOptions = projects.data.map((project) => ({
							name: project.projectName,
							id: project.id,
						}));
						filter.options = [filter.options[0], ...projectsOptions];
					});
					break;
				case 'approvalStatusId':
					this.approvalStatusService
						.getApprovalStatusList()
						.subscribe((status: any) => {
							const statusTypeOptions = status.data.map((statusType) => ({
								name: statusType.status,
								id: statusType.id,
							}));
							filter.options = [filter.options[0], ...statusTypeOptions];
						});
					break;
				case 'approvalStatusTypeId':
					this.approvalStatusService
						.getApprovalStatusList()
						.subscribe((status: any) => {
							const statusTypeOptions = status.data.map((statusType) => ({
								name: statusType.status,
								id: statusType.id,
							}));
							filter.options = [filter.options[0], ...statusTypeOptions];
						});
					break;
				case 'currentStatus':
					this.approvalStatusService
						.getApprovalStatusList()
						.subscribe((status: any) => {
							const statusTypeOptions = status.data.map((statusType) => ({
								name: statusType.status,
								id: statusType.id,
							}));
							filter.options = [filter.options[0], ...statusTypeOptions];
						});
					break;
				case 'nationality':
					const nationalityOptions = constant.nationality.map((value) => ({
						name: value,
						id: value,
					}));
					filter.options = [filter.options[0], ...nationalityOptions];
					break;
				case 'expenseTypeId':
					this.expenseTypeService
						.getExpenseTypesList()
						.subscribe((expenseTypes: any) => {
							const expenseTypeOptions = expenseTypes.data.map(
								(expenseType) => ({
									name: expenseType.expenseTypeName,
									id: expenseType.id,
								}),
							);
							filter.options = [filter.options[0], ...expenseTypeOptions];
						});
					break;
				case 'employmentTypeId':
					this.employeeTypesService.getEmploymentTypesList().subscribe(
						(employeeTypes: any) => {
							const employeeTypeOptions = employeeTypes.data.map((employeeType) => ({
								name: employeeType.empJobTypeCode,
								id: employeeType.id,
							}));
							filter.options = [filter.options[0], ...employeeTypeOptions];
						},
					);
					break;

				case 'jobRoleId':
					this.roleService.getJobRoleList().subscribe((jobRoles: any) => {
						const jobRoleOptions = jobRoles.data.map((jobRole) => ({
							name: jobRole.roleCode,
							id: jobRole.id,
						}));
						filter.options = [filter.options[0], ...jobRoleOptions];
					});
					break;
				case 'roleId':
					this.userRoleService.getUserRoleList().subscribe((userRoles: any) => {
						const userRolesOptions = userRoles.data.map((userRole) => ({
							name: userRole.name,
							id: `${userRole.id}`,
						}));
						filter.options = [filter.options[0], ...userRolesOptions];
					});
					break;
				case 'approvalGroupId':
					this.approvalGroupsService
						.getApprovalGroupsList()
						.subscribe((approvalGroups: any) => {
							const approvalGroupsOptions = approvalGroups.data.map(
								(approvalGroup) => ({
									name: approvalGroup.approvalGroupCode,
									id: approvalGroup.id,
								}),
							);
							filter.options = [filter.options[0], ...approvalGroupsOptions];
						});

					break;
				case 'statusTypeId':
					this.statusService.getStatusList().subscribe((response: any) => {
						const statusOptions = response.data.map((status) => ({
							name: status.status,
							id: status.id,
						}));
						filter.options = [filter.options[0], ...statusOptions];
					});

					break;
				case 'departmentId':
					this.departmentService
						.getDepartmentList()
						.subscribe((response: any) => {
							const statusTypeOptions = response.data.map((department) => ({
								name: department.deptDesc,
								id: department.id,
							}));
							filter.options = [filter.options[0], ...statusTypeOptions];
						});

					break;
			}
			return filter;
		});
		this.filterStatus.next(filters);
	}

	updateSelectedFilters(filter) {
		this.selectedFilters = { ...this.selectedFilters, ...filter };
		this.updateFilters(Object.keys(filter)[0]);
		return this.selectedFilters;
	}
	emptySelectedFilters() {
		this.selectedFilters = {};
		return this.selectedFilters;
	}

	updateFilters(type) {
		if (
			this.selectedFilters &&
			this.selectedFilters.costCenterId !== 0 &&
			type === 'costCenterId'
		) {
			const index = this.populatedFilters.findIndex(
				(filter) => filter.name === 'departmentId',
			);
			if (index !== -1) {
				this.populateDepartmentFilter(index, this.selectedFilters.costCenterId);
			}
		}
		if (
			this.selectedFilters &&
			this.selectedFilters.projectId !== 0 &&
			type === 'projectId'
		) {
			const index = this.populatedFilters.findIndex(
				(filter) => filter.name === 'subProjectId',
			);
			if (index !== -1) {
				this.populateSubProjectFilter(index, this.selectedFilters.projectId);
			}
		}
		if (
			this.selectedFilters &&
			this.selectedFilters.subProjectId !== 0 &&
			type === 'subProjectId'
		) {
			const index = this.populatedFilters.findIndex(
				(filter) => filter.name === 'workTaskId',
			);
			if (index !== -1) {
				this.populateWorkTaskFilter(index, this.selectedFilters.subProjectId);
			}
		}
	}

	populateDepartmentFilter(index, costCenterId) {
		this.departmentService
			.getDepartmentsByCostCenterId(costCenterId)
			.subscribe((departments: any) => {
				departments = departments.data.map((department) => ({
					id: department.id,
					name: department.deptDesc,
				}));
				this.populatedFilters[index].options = [
					this.populatedFilters[index].options[0],
					...departments,
				];
				this.filterStatus.next(this.populatedFilters);
			});
	}

	populateSubProjectFilter(index, projectId) {
		this.subProjectService
			.getSubProjectListByProject(projectId)
			.subscribe((subProjects: any) => {
				subProjects = subProjects.data.map((subProject) => ({
					id: subProject.id,
					name: subProject.subProjectName,
				}));
				this.populatedFilters[index].options = [
					this.populatedFilters[index].options[0],
					...subProjects,
				];
				this.filterStatus.next(this.populatedFilters);
			});
	}

	populateWorkTaskFilter(index, subProjectId) {
		this.taskService
			.getSTaskListBySubProject(subProjectId)
			.subscribe((tasks: any) => {
				tasks = tasks.data.map((task) => ({
					id: task.id,
					name: task.taskName,
				}));
				this.populatedFilters[index].options = [
					this.populatedFilters[index].options[0],
					...tasks,
				];
				this.filterStatus.next(this.populatedFilters);
			});
	}
}
