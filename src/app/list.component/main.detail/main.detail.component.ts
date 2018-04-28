import { Component, OnInit } from '@angular/core';
import { ArticleService } from "../../admin/http.service/article.service";
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleClass } from "app/shared";
@Component({
    selector: 'main-detail',
    templateUrl: './main.detail.component.html'
})
export class MainDetailComponent implements OnInit {
    detail: any;
    articleList: any[] = [];
    //----------------------------------------------------------------
    constructor(private route: ActivatedRoute, private articleService: ArticleService) { }
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.detail = params['detail'];
            this.articleService.getByRoute(params['detail']).subscribe((res: any) => {
                this.articleList = res;
            })
        });
    }
}