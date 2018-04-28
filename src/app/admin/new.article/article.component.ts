import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "app/shared";
import { MdlDialogService } from "@angular-mdl/core/components";
import { GroupArticleService } from "app/admin/http.service/group.article.service";
import { FileHandlerService } from "app/admin/http.service/file.handler.service";
import { Observable } from "rxjs/Observable";
import { ArticleService } from "app/admin/http.service/article.service";

@Component({
    selector: 'article',
    templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit {
    public articleForm: FormGroup;
    ckeditorContent: any;
    refContent: any;
    canvasSmall: any;
    canvasBig: any;
    flagUpdate: any;
    findArticleCode: any;
    transList: any[] = [];
    articleTypeList: any[] = [];
    groupList: any[] = [];
    groupListAuto: any[] = [];
    logoList: any[] = [];
    logoListAuto: any[] = [];
    imgHeaderList: any[] = [];
    imgHeaderListAuto: any[] = [];
    imgBigList: any[] = [];
    imgBigListAuto: any[] = [];
    //----------------------------------------------------------------------
    constructor(private _fb: FormBuilder, private _msgService: MessageService,
        private dialogService: MdlDialogService,
        private groupService: GroupArticleService,
        private fileService: FileHandlerService,
        private articleService: ArticleService) {
        this.articleForm = this._fb.group({
            _id: [''],
            articleHeader: this._fb.group({
                articleCode: [{ value: '', disabled: false }, [Validators.compose([Validators.required, Validators.pattern('[0-9]*')])]],
                articleRoute: ['', Validators.required],
                articleTitle: ['', Validators.required],
                articleSummary: ['', [Validators.compose([Validators.required, Validators.maxLength(275)])]],
                articleShoar: [''],
                articleCounter: [''],
                articleDate: [new Date()],
                articleType: [''],
                articleTranslator: [''],
                articleTags: [''],
                articleGroup: [''],
                articleRate: [''],
                articleRateUser: [''],
                articleLogo: [''],
                articleHeaderImg: [''],
                articleBigImg: [''],
            }),
            imgSmallGroup: this._fb.group({
                articleImgSmallWidth: [''],
                articleImgSmallHeight: [''],
                articleImgSmall: ['']
            }),
            imgBigGroup: this._fb.group({
                articleImgBigWidth: [''],
                articleImgBigHeight: [''],
                articleImgBig: [''],
            }),
            articleDetail: this._fb.group({
                articleText: [''],
                articleRef: ['']
            })
        });
    }
    checkSummaryCount(event: any){
        this.formErrors.articleSummary = '275 / ' + event.target.value.length;
    }
    ngOnInit() {
        this.transList = this._msgService.getTranslator();
        this.articleTypeList = this._msgService.getArticleType();
        this.groupService.getAll().subscribe((res: any) => this.groupList = this.groupListAuto = res);
        this.fileService.getAll().subscribe((res: any) => {
            this.logoList = this.logoListAuto = this.imgHeaderList = this.imgHeaderListAuto = this.imgBigList = this.imgBigListAuto = res;
        });
        this.articleForm.valueChanges.subscribe(data => this.onValueChanged(data));
    }
    onValueChanged(data?: any) {
        if (!this.articleForm) { return; }
        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = this.articleForm.get(field);
            if (control && control.dirty && !control.valid) {
                for (const key in control.errors) {
                    this.formErrors[field] = this._msgService.getError(control.errors);
                }
            }
        }
    }
    autoChangeGroup(value: string) {
        this.groupList = this.groupListAuto.filter((group) => {
            return group.groupName.indexOf(value) !== -1;
        });
    };
    autoChangeLogo(value: string) {
        this.logoList = this.logoListAuto.filter((file) => {
            return file.fileHeader.fileName.indexOf(value) !== -1;
        });
    };
    autoChangeImgHeader(value: string) {
        this.imgHeaderList = this.imgHeaderListAuto.filter((file) => {
            return file.fileHeader.fileName.indexOf(value) !== -1;
        });
    };
    autoChangeImgBig(value: string) {
        this.imgBigList = this.imgBigListAuto.filter((file) => {
            return file.fileHeader.fileName.indexOf(value) !== -1;
        });
    };    
    //-----------------------------------------------------------------
    readFileSmall(input) {
        var canvas: any = document.getElementById("canvasSmall");
        var ctx = canvas.getContext("2d");
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = new Image();
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
            }
            img.src = reader.result;
        };
        var file = (<HTMLInputElement>document.getElementById('imgSmall')).files[0];
        if (file) {
            reader.readAsDataURL(file);
        }
        this.canvasSmall = canvas;
        this.articleForm.get('imgSmallGroup.articleImgSmallWidth').setValue(this.canvasSmall.width);
        this.articleForm.get('imgSmallGroup.articleImgSmallHeight').setValue(this.canvasSmall.height);
        this.articleForm.get('imgSmallGroup.articleImgSmall').setValue(this.canvasSmall.toDataURL());
    }
    readFileBig(input) {
        var canvas: any = document.getElementById("canvasBig");
        var ctx = canvas.getContext("2d");
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = new Image();
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
            }
            img.src = reader.result;
        };
        var file = (<HTMLInputElement>document.getElementById('imgBig')).files[0];
        if (file) {
            reader.readAsDataURL(file);
        }
        this.canvasBig = canvas;
        this.articleForm.get('imgBigGroup.articleImgBigWidth').setValue(this.canvasBig.width);
        this.articleForm.get('imgBigGroup.articleImgBigHeight').setValue(this.canvasBig.height);
        this.articleForm.get('imgBigGroup.articleImgBig').setValue(this.canvasBig.toDataURL());

    }
    //------------------------------------------------------------------------------------------
    clearForm() {
        this.articleForm.reset();
        this.flagUpdate = false;
        this.ckeditorContent = '';
    }
    save(data?: any) {
        this.articleService.validate(data.articleCode, data.articleRoute).subscribe((res: any) => {
            if (res.length == 0) {
                delete data._id;
                data.articleDetail.articleText = this.ckeditorContent;
                data.articleDetail.articleRef = this.refContent;
                data.articleHeader.articleRate = data.articleHeader.articleRateUser = data.articleHeader.articleCounter =  0;
                this.articleService.post(data).subscribe((json: any) => {
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
    find(keyCode) {
        if (keyCode == 13 && this.findArticleCode && this.findArticleCode.length > 0) {
            this.articleService.getOne(this.findArticleCode).subscribe((json: any) => {
                this.articleForm.reset();
                if (json.length > 0) {
                    this.articleForm.setValue(json[0]);
                    this.ckeditorContent = this.articleForm.controls['articleDetail'].get('articleText').value;
                    this.refContent = this.articleForm.controls['articleDetail'].get('articleRef').value;
                    this.flagUpdate = true;
                } else {
                    this.dialogService.alert(this._msgService.getMessage('notExistRecord'));
                    this.flagUpdate = false;
                }
                this.findArticleCode = '';
            });
        }
    }
    update(data?: any) {
        data.articleDetail.articleText = this.ckeditorContent;
        data.articleDetail.articleRef = this.refContent;
        this.articleService.put(data).subscribe((json: any) => {
            if (json.nModified >= 1) {
                this.dialogService.alert(this._msgService.getMessage('successUpdate'));
                this.clearForm();
                this.flagUpdate = false;
            } else {
                this.dialogService.alert(this._msgService.getMessage('errorUpdate'));
            }
        });
    }
    //------------------------------------------------------------------------------------------    
    formErrors = {
        'articleCode': '',
        'articleRoute': '',
        'articleTitle': '',
        'articleSummary': '',
        'articleShoar': '',
    };
}