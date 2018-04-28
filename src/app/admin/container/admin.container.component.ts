import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'admin-container',
    template: `
        <section id="middle" class="padding-20">
            <div class="row">
                <div class="col-md-12">
                        <my-panel [templateColor]="'green'" 
                            [title]="'تعریف مقاله جدید، گروه مقالات، و سایر موارد'" 
                            [category]="'پنل مدیریتی وب سایت دیتا نگار'">
                            <div tabs>
                                <ul class="nav nav-tabs" data-tabs="tabs">
                                    <li class="active">
                                        <a href="#tab1" data-toggle="tab">
                                            <i class="fa fa-info fa-lg" aria-hidden="true"></i> گروه/فایل
                                            <div class="ripple-container"></div>
                                        </a>
                                    </li>
                                    <li class="">
                                        <a href="#tab2" data-toggle="tab">
                                            <i class="fa fa-info fa-lg" aria-hidden="true"></i> مقاله
                                            <div class="ripple-container"></div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div content>
                                <div class="tab-content">
                                    <div class="tab-pane active" id="tab1">
                                        <group-article></group-article>
                                    </div>
                                    <div class="tab-pane" id="tab2">
                                        <article></article> 
                                    </div>
                                </div>
                            </div>
                        </my-panel>
                </div>
            </div>
        </section>
        <dialog-outlet></dialog-outlet>
    `
})
export class AdminContainerComponent implements OnInit {
    constructor() { }
    ngOnInit() { }
}