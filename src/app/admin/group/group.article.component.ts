import { Component, OnInit, ViewEncapsulation, Directive } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MessageService, GroupArticleClass } from "app/shared";
import { GroupArticleService } from "app/admin/http.service/group.article.service";
import { MdlDialogService } from "@angular-mdl/core";
declare var $: any;


@Component({
    selector: 'group-article',
    templateUrl: './group.article.component.html',
})
export class GroupArticleComponent implements OnInit {
    groupForm: FormGroup;
    p: number = 1;
    selectedRow: number;
    flagUpdate: any;
    findGroupCode: any;
    groupArticleList: GroupArticleClass[] = [];
    //--------------------------------------------------
    constructor(private _fb: FormBuilder,
        private _msgService: MessageService, private _gas: GroupArticleService,
        private dialogService: MdlDialogService) {
        this.groupForm = this._fb.group({
            _id: [''],
            groupCode: ['', [Validators.compose([Validators.required, Validators.pattern('[0-9]*')])]],
            groupName: ['', Validators.required],
            counter: [''],
            groupId: [''],
            link: ['']
        });
    }
    ngOnInit(): void {
        this.groupForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.getAll();
    }
    onValueChanged(data?: any) {
        if (!this.groupForm) { return; }
        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = this.groupForm.get(field);
            if (control && control.dirty && !control.valid) {
                for (const key in control.errors) {
                    this.formErrors[field] = this._msgService.getError(control.errors);
                }
            }
        }
    }
    clearForm() {
        this.groupForm.reset();
        this.flagUpdate = false;
        this.findGroupCode = '';
        this.selectedRow = null;
    }
    getAll() {
        this._gas.getAll().subscribe((res:any) => {
            this.groupArticleList = res;
        })
    }
    save(data?: any) {
        this._gas.validate(data.groupCode, data.groupName).subscribe((res: any) => {
            if (res.length == 0) {
                delete data._id;
                this._gas.post(data).subscribe((json: any) => {
                    if (json.n >= 1) {
                        this.dialogService.alert(this._msgService.getMessage('successSave'));
                        this.clearForm();
                    } else {
                        this.dialogService.alert(this._msgService.getMessage('errorSave'));
                    }
                });
            } else {
                this.dialogService.alert(this._msgService.getMessage('doubleRecord'));
                this.clearForm();
            }
        });
    }
    update(data?: any) {
        this._gas.put(data).subscribe((json: any) => {
            if (json.nModified >= 1) {
                this.dialogService.alert(this._msgService.getMessage('successUpdate'));
                this.groupForm.reset();
                this.flagUpdate = false;
                this.getAll();
            } else {
                this.dialogService.alert(this._msgService.getMessage('errorUpdate'));
            }
        });
    }
    find(keyCode) {
        if (keyCode == 13 && this.findGroupCode && this.findGroupCode.length > 0) {
            this._gas.getOne(this.findGroupCode).subscribe((json: any) => {
                this.groupForm.reset();
                if (json.length > 0) {
                    this.groupForm.setValue(json[0]);
                    this.flagUpdate = true;
                } else {
                    this.dialogService.alert(this._msgService.getMessage('notExistRecord'));
                    this.flagUpdate = false;
                }
                this.findGroupCode = '';
            });
        }
    }
    onRowSelect(event, index) {
        this.groupForm.patchValue(event);
        this.flagUpdate = true;
        this.selectedRow = index;
    }
    formErrors = {
        'groupCode': '',
        'groupName': '',
        'counter': '',
        'groupId': '',
        'link': '',
    };
}