import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MessageService } from "app/shared";
import { MdlDialogService } from "@angular-mdl/core/components";
import { FileUploader } from "ng2-file-upload";
import { FileHandlerService } from "app/admin/http.service/file.handler.service";
declare var $: any;
const URL = 'http://localhost/fileweb/file';

@Component({
    selector: 'file-handler',
    templateUrl: './file.handler.component.html'
})
export class FileHandlerComponent implements OnInit, OnDestroy {
    public uploader: FileUploader = new FileUploader({ url: URL });
    public fileForm: FormGroup;
    flagUpdate: any = false;
    flagSave: any = false;
    flagUpload: any = false;
    fileinfo: any;
    findFileName: any;
    canvasObject: any;
    /*-----------------------------------------------*/
    constructor(private _fb: FormBuilder,
        private _msgService: MessageService,
        private dialogService: MdlDialogService,
        private fileService: FileHandlerService) {

        this.fileForm = this._fb.group({
            _id: [''],
            fileHeader: this._fb.group({
                fileName: ['', Validators.required],
                fileTitle: [''],
                fileAlt: ['', Validators.required],
                flagBase64: [''],
                fileInfo: ['']
            }),
            fileDetail: this._fb.group({
                imgWidth: [''],
                imgHeight: [''],
                imgBase64: ['']
            })
        });
    }

    ngOnInit() {
        this.fileForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            if (response == 'OK' && status == 200) {
                this.flagUpload = true;
                this.fileinfo = item.file;
            }
            else
                this.flagUpload = false;
        };
        this.uploader.onAfterAddingFile = (file) => {
            let extArray = file.file.type.split('/');
            file.file.name = this.fileForm.get('fileHeader.fileName').value + '.' + extArray[extArray.length - 1];

            var imageType = /image.*/;
            if (!file.file.type.match(imageType)) {
                this.flagSave = false;
            } else {
                this.flagSave = true;
            }
        }
    }
    onValueChanged(data?: any) {
        if (!this.fileForm) { return; }
        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = this.fileForm.get(field);
            if (control && control.dirty && !control.valid) {
                for (const key in control.errors) {
                    this.formErrors[field] = this._msgService.getError(control.errors);
                }
            }
        }
    }
    readFile(input) {
        var canvas: any = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = new Image();
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
            }
            img.src = reader.result;;
        };
        var file = (<HTMLInputElement>document.getElementById('fileImport')).files[0];
        if (file) {
            reader.readAsDataURL(file);
        }
        this.canvasObject = canvas;
    }
    clearForm() {
        this.fileForm.reset();
        this.flagUpdate = this.flagSave = this.flagUpdate = false;
        this.uploader.clearQueue();
        $('#fileImport').val('');
    }

    save(data?: any) {
        if (!this.flagSave || !this.flagUpload) {
            this.dialogService.alert(this._msgService.getMessage('errorSave'));
            return false;
        }
        delete data._id;
        data.fileHeader.fileInfo = this.fileinfo;
        if (this.fileForm.controls['fileHeader'].get('flagBase64').value) {
            data.fileDetail.imgWidth = this.canvasObject.width;
            data.fileDetail.imgHeight = this.canvasObject.height;
            data.fileDetail.imgBase64 = this.canvasObject.toDataURL();
        }
        this.fileService.post(data).subscribe((json: any) => {
            if (json.n >= 1) {
                this.dialogService.alert(this._msgService.getMessage('successSave'));
                this.clearForm();
            } else {
                this.dialogService.alert(this._msgService.getMessage('errorSave'));
            }
        });
    }
    update(data?: any) {
        this.fileService.put(data).subscribe((json: any) => {
            if (json.nModified >= 1) {
                this.dialogService.alert(this._msgService.getMessage('successUpdate'));
                this.fileForm.reset();
                this.flagUpdate = false;
            } else {
                this.dialogService.alert(this._msgService.getMessage('errorUpdate'));
            }
        });
    }

    find(keyCode) {
        if (keyCode == 13 && this.findFileName && this.findFileName.length > 0) {
            this.fileService.getOne(this.findFileName).subscribe((json: any) => {
                this.fileForm.reset();
                if (json.length > 0) {
                    this.fileForm.setValue(json[0]);
                    this.flagUpdate = true;
                } else {
                    this.dialogService.alert(this._msgService.getMessage('notExistRecord'));
                    this.flagUpdate = false;
                }
                this.findFileName = '';
            });
        }
    }
    formErrors = {
        'fileName': '',
        'fileTitle': '',
        'fileAlt': '',
    };
    ngOnDestroy() {
        console.log('Exit');
    }
}