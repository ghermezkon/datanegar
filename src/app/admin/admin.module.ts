import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { FileUploadModule } from 'ng2-file-upload';
import { TagInputModule } from 'ngx-chips';
import { MdlModule } from '@angular-mdl/core';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { SharedModule } from "primeng/components/common/shared";
import {NgxPaginationModule} from 'ngx-pagination';
import {MdlSelectModule} from '@angular-mdl/select';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import {
    AdminContainerComponent, GroupArticleComponent,
    ArticleComponent, FileHandlerComponent, FileHandlerService, ArticleService
} from "app/admin";

import { AdminRouting } from "app/admin/admin-routing";
import { MyPanelComponent } from "app/component/panel/my-panel.component";
import { GlobalInterceptor, CachingInterceptor } from "app/shared";

@NgModule({
    imports: [AdminRouting, MdlModule, FormsModule, ReactiveFormsModule, CommonModule,
        DataTableModule, SharedModule, TagInputModule, FileUploadModule, NgxPaginationModule,
        MdlSelectModule, FroalaEditorModule, FroalaViewModule],
    declarations: [MyPanelComponent,
        AdminContainerComponent, GroupArticleComponent, ArticleComponent, FileHandlerComponent],
    providers: [FileHandlerService, ArticleService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: GlobalInterceptor,
            multi: true,
        }],
})
export class AdminModule { }

