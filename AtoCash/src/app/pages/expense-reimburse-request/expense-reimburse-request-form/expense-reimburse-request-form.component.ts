import { ExpenseTypesService } from 'src/app/services/expense-types.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ApprovalLevelsService } from 'src/app/services/approval-levels.service';
import { CommonService } from 'src/app/services/common.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { SubProjectsService } from 'src/app/services/sub-projects.service';
import { TasksService } from 'src/app/services/tasks.service';
import { TravelRequestService } from 'src/app/services/travel-request.service';
import { ExpenseReimburseRequestService } from 'src/app/services/expense-reimburse-request.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { constant } from 'src/app/constant/constant';

@Component({
	selector: 'app-expense-reimburse-form',
	templateUrl: './expense-reimburse-request-form.component.html',
	styleUrls: ['./expense-reimburse-request-form.component.scss'],
})
export class ExpenseReimburseRequestFormComponent implements OnInit {
	form!: FormGroup;
	recordId: any;
	mode: any = 'add';
	fileList: any = [];
	projects = [];
	subProjects = [];
	expenseType = [];
	tasks = [];
	enableProject = false;
	empId = this.commonService.getUser().empId;
	taxes = [...Array(31).keys()];
	responseFileList = [];
	@Input() data;

	constructor(
		private fb: FormBuilder,
		private snapshot: ActivatedRoute,
		private expenseReimburseService: ExpenseReimburseRequestService,
		private expenseTypeService: ExpenseTypesService,
		private projectService: ProjectsService,
		private subProjectService: SubProjectsService,
		private taskService: TasksService,
		private router: Router,
		private commonService: CommonService,
		private translate: TranslateService,
		private modal: NzModalRef,
	) {}

	getButtonLabel = () => {
		return !this.data
			? this.translate.instant('button.add')
			: this.translate.instant('button.update');
	};
	submitForm(): void {
		const formData = new FormData();
		this.fileList.map((file) => {
			formData.append('documents', file);
		});
		this.expenseReimburseService.addDocuments(formData).subscribe(
			(response: any) => {
				this.responseFileList = response.data;

				this.modal.close({
					data: {
						...this.form.value,
						taxAmount: Number(this.form.controls['taxAmount'].value),
						documents: response.data,
						index: !this.data ? null : this.data.index,
					},
					type: !this.data ? 'add' : 'edit',
				});
			},
			(err) => {
				console.log(err);
			},
		);

		for (const i in this.form.controls) {
			this.form.controls[i].markAsDirty();
			this.form.controls[i].updateValueAndValidity();
		}
	}

	ngOnInit(): void {
		this.expenseReimburseService.totalClaimAmount.next(0);
		this.expenseTypeService.getExpenseTypesList().subscribe((data: any) => {
			this.expenseType = data.data;
		});

		this.taskService.getTasksList().subscribe((response: any) => {
			this.tasks = response.data;
		});

		this.form = this.fb.group({
			invoiceNo: [null, [Validators.required]],
			invoiceDate: [null, [Validators.required]],
			expenseTypeId: [null, [Validators.required]],
			expenseReimbClaimAmount: [null, [Validators.required]],
			location: [null, [Validators.required]],
			tax: [0, [Validators.required, Validators.max(100)]],
			taxAmount: [null, [Validators.required]],
			vendor: [null, [Validators.required]],
			description: [null, [Validators.required]],
		});

		if (this.data) {
			const formData = {
				invoiceNo: this.data.invoiceNo,
				invoiceDate: this.data.invoiceDate,
				expenseTypeId: this.data.expenseTypeId,
				expenseReimbClaimAmount: this.data.expenseReimbClaimAmount,
				location: this.data.location,
				tax: this.data.tax,
				taxAmount: Number(this.data.taxAmount),
				vendor: this.data.vendor,
				description: this.data.description,
			};
			if (this.data.documents && this.data.documents.length > 0) {
				this.fileList = this.data.documents.map((document) => ({
					...document,
					name: document.actualFileName,
				}));
			}
			this.form.setValue(formData);
		}

		this.form.controls['tax'].valueChanges.subscribe((data) => {
			if (data !== 0 && this.form.controls['expenseReimbClaimAmount'].value) {
				this.form.controls['taxAmount'].setValue(
					(
						(this.form.controls['expenseReimbClaimAmount'].value / 100) *
						data
					).toFixed(2),
				);
			} else {
				this.form.controls['taxAmount'].setValue((0).toFixed(2));
			}

			this.expenseReimburseService.totalClaimAmount.next(
				this.form.controls['expenseReimbClaimAmount'].value + data,
			);
		});
		this.form.controls['expenseReimbClaimAmount'].valueChanges.subscribe(
			(data) => {
				if (data && this.form.controls['tax'].value) {
					this.form.controls['taxAmount'].setValue(
						((this.form.controls['tax'].value / 100) * data).toFixed(2),
					);
				} else {
					this.form.controls['taxAmount'].setValue((0).toFixed(2));
				}
				this.expenseReimburseService.totalClaimAmount.next(
					this.form.controls['taxAmount'].value + data,
				);
			},
		);

		this.form.controls['taxAmount'].disable();
	}

	selectProject = (event) => {
		this.subProjectService
			.getSubProjectListByProject(event)
			.subscribe((response: any) => {
				this.subProjects = response.data;
			});
	};

	selectSubProject = (event) => {
		this.taskService
			.getSTaskListBySubProject(event)
			.subscribe((response: any) => {
				this.tasks = response.data;
			});
	};

	disabledDate = (vale: Date): boolean => {
		const date = new Date();
		return new Date(date).getTime() < new Date(vale).getTime();
	};

	beforeUpload = (file: any): boolean => {
		this.fileList = this.fileList.concat(file);
		return false;
	};
}
