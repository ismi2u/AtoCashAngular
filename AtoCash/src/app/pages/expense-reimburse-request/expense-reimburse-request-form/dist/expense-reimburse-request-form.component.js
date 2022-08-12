"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ExpenseReimburseRequestFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ExpenseReimburseRequestFormComponent = /** @class */ (function () {
    function ExpenseReimburseRequestFormComponent(fb, snapshot, expenseReimburseService, expenseTypeService, projectService, subProjectService, taskService, router, commonService, translate, modal) {
        var _this = this;
        this.fb = fb;
        this.snapshot = snapshot;
        this.expenseReimburseService = expenseReimburseService;
        this.expenseTypeService = expenseTypeService;
        this.projectService = projectService;
        this.subProjectService = subProjectService;
        this.taskService = taskService;
        this.router = router;
        this.commonService = commonService;
        this.translate = translate;
        this.modal = modal;
        this.mode = 'add';
        this.fileList = [];
        this.projects = [];
        this.subProjects = [];
        this.expenseType = [];
        this.tasks = [];
        this.enableProject = false;
        this.empId = this.commonService.getUser().empId;
        this.taxes = __spreadArrays(Array(31).keys());
        this.responseFileList = [];
        this.getButtonLabel = function () {
            return !_this.data
                ? _this.translate.instant('button.add')
                : _this.translate.instant('button.update');
        };
        this.selectProject = function (event) {
            _this.subProjectService
                .getSubProjectListByProject(event)
                .subscribe(function (response) {
                _this.subProjects = response.data;
            });
        };
        this.selectSubProject = function (event) {
            _this.taskService
                .getSTaskListBySubProject(event)
                .subscribe(function (response) {
                _this.tasks = response.data;
            });
        };
        this.disabledDate = function (vale) {
            var date = new Date();
            return new Date(date).getTime() < new Date(vale).getTime();
        };
        this.beforeUpload = function (file) {
            _this.fileList = _this.fileList.concat(file);
            return false;
        };
    }
    ExpenseReimburseRequestFormComponent.prototype.submitForm = function () {
        var _this = this;
        var formData = new FormData();
        this.fileList.map(function (file) {
            formData.append('documents', file);
        });
        this.expenseReimburseService.addDocuments(formData).subscribe(function (response) {
            _this.responseFileList = response.data;
            _this.modal.close({
                data: __assign(__assign({}, _this.form.value), { taxAmount: Number(_this.form.controls['taxAmount'].value), documents: response.data, index: !_this.data ? null : _this.data.index }),
                type: !_this.data ? 'add' : 'edit'
            });
        }, function (err) {
            console.log(err);
        });
        for (var i in this.form.controls) {
            this.form.controls[i].markAsDirty();
            this.form.controls[i].updateValueAndValidity();
        }
    };
    ExpenseReimburseRequestFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.expenseTypeService.getExpenseTypesList().subscribe(function (data) {
            _this.expenseType = data.data;
        });
        this.taskService.getTasksList().subscribe(function (response) {
            _this.tasks = response.data;
        });
        this.form = this.fb.group({
            invoiceNo: [null, [forms_1.Validators.required]],
            invoiceDate: [null, [forms_1.Validators.required]],
            expenseTypeId: [null, [forms_1.Validators.required]],
            expenseReimbClaimAmount: [null, [forms_1.Validators.required]],
            location: [null, [forms_1.Validators.required]],
            tax: [0, [forms_1.Validators.required, forms_1.Validators.max(100)]],
            taxAmount: [null, [forms_1.Validators.required]],
            vendor: [null, [forms_1.Validators.required]],
            description: [null, [forms_1.Validators.required]]
        });
        if (this.data) {
            var formData = {
                invoiceNo: this.data.invoiceNo,
                invoiceDate: this.data.invoiceDate,
                expenseTypeId: this.data.expenseTypeId,
                expenseReimbClaimAmount: this.data.expenseReimbClaimAmount,
                location: this.data.location,
                tax: this.data.tax,
                taxAmount: Number(this.data.taxAmount),
                vendor: this.data.vendor,
                description: this.data.description
            };
            if (this.data.documents && this.data.documents.length > 0) {
                this.fileList = this.data.documents.map(function (document) { return (__assign(__assign({}, document), { name: document.actualFileName })); });
            }
            this.form.setValue(formData);
        }
        this.form.controls['tax'].valueChanges.subscribe(function (data) {
            if (data !== 0 && _this.form.controls['expenseReimbClaimAmount'].value) {
                _this.form.controls['taxAmount'].setValue(((_this.form.controls['expenseReimbClaimAmount'].value / 100) *
                    data).toFixed(2));
            }
            else {
                _this.form.controls['taxAmount'].setValue((0).toFixed(2));
            }
        });
        this.form.controls['expenseReimbClaimAmount'].valueChanges.subscribe(function (data) {
            if (data && _this.form.controls['tax'].value) {
                _this.form.controls['taxAmount'].setValue(((_this.form.controls['tax'].value / 100) * data).toFixed(2));
            }
            else {
                _this.form.controls['taxAmount'].setValue((0).toFixed(2));
            }
        });
        this.form.controls['taxAmount'].disable();
    };
    __decorate([
        core_1.Input()
    ], ExpenseReimburseRequestFormComponent.prototype, "data");
    ExpenseReimburseRequestFormComponent = __decorate([
        core_1.Component({
            selector: 'app-expense-reimburse-form',
            templateUrl: './expense-reimburse-request-form.component.html',
            styleUrls: ['./expense-reimburse-request-form.component.scss']
        })
    ], ExpenseReimburseRequestFormComponent);
    return ExpenseReimburseRequestFormComponent;
}());
exports.ExpenseReimburseRequestFormComponent = ExpenseReimburseRequestFormComponent;
