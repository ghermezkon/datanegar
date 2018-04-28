import {Component, OnInit} from '@angular/core';
import { GroupArticleService } from "../../admin/http.service/group.article.service";

@Component({
    selector: 'first-section',
    templateUrl: './first.section.component.html'
})

export class FirstSectionComponent implements OnInit{
    mainMenu: any[] = [];
    constructor(private gas: GroupArticleService){
        this.gas.getAll().subscribe((res: any) => this.mainMenu = res)
        // this.mainMenu = [
        //     {'title':'میوه ها'       , 'counter':'1024', 'icon':'./assets/images/icon/1.png', 'link':'/admin','id':'fruits'},
        //     {'title':'سبزیجات'       , 'counter':'2024', 'icon':'./assets/images/icon/2.png', 'link':'/list', 'id':'vegetables'},
        //     {'title':'روغن ها'       , 'counter':'3024', 'icon':'./assets/images/icon/3.png', 'link':'/list', 'id':'oils'},
        //     {'title':'غلات'           , 'counter':'4024', 'icon':'./assets/images/icon/4.png', 'link':'/list', 'id':'cereals'},
        //     {'title':'داروهای گیاهی' , 'counter':'5024', 'icon':'./assets/images/icon/5.png', 'link':'/list', 'id':'herbs'},
        //     {'title':'نوشیدنی ها'    , 'counter':'6024', 'icon':'./assets/images/icon/6.png', 'link':'/list', 'id':'beverages'},
        //     {'title':'مواد معدنی'    , 'counter':'7024', 'icon':'./assets/images/icon/7.png', 'link':'/list', 'id':'minerals'},
        //     {'title':'آجیل و دانه ها', 'counter':'8024', 'icon':'./assets/images/icon/8.png', 'link':'/list', 'id':'seeds'},
        //     {'title':'روغن های ضروری', 'counter':'9024', 'icon':'./assets/images/icon/9.png', 'link':'/list', 'id':'es_oils'},
        // ];
    }
    ngOnInit(){}
}