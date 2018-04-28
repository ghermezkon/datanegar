import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from "../../admin/http.service/article.service";

@Component({
    selector: 'main-list',
    templateUrl: './main.list.component.html'
})
export class MainListComponent implements OnInit {
    detail: any;
    header: any;
    color: any;
    articleList: any[] = [];
    //------------------------------------------------------------------------------------
    constructor(private route: ActivatedRoute, private articleService: ArticleService) { }
    //------------------------------------------------------------------------------------
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.detail = params['link']
            this.articleService.getByGroupLink(params['link']).subscribe((res: any) => {
                this.articleList = res;
            })
        });
        switch (this.detail) {
            case 'fruits': {
                this.header = 'میوه ها';
                break;
            }
            case 'vegetables': {
                this.header = 'سبزیجات';
                break;
            }
            case 'oils': {
                this.header = 'روغن ها';
                break;
            }
            case 'cereals': {
                this.header = 'غلات و حبوبات';
                break;
            }
            case 'herbs': {
                this.header = 'گیاهان دارویی';
                break;
            }
            case 'beverages': {
                this.header = 'نوشیدنی ها';
                break;
            }
        }
    }
    //------------------------------------------------------------------------------------
}