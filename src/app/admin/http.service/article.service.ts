import "rxjs/Rx";
import { Observable } from 'rxjs/Observable';
import { Injectable } from "@angular/core";
import { GroupArticleClass, ArticleClass } from "app/shared";
import { environment } from "environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ArticleService {
    url: any = environment.apiEndPoint;
    table: any = 'article';
    headers: any;
    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders()
            .set('enctype', 'multipart/form-data');
    }

    getAll() {
        return this.http.get(this.url + '/' + this.table).publishReplay(1).refCount();
    }
    getOne(param) {
        return this.http.get(this.url + '/' + this.table + '/' + param).publishReplay(1).refCount();
    }
    getByRoute(param){
        return this.http.get(this.url + '/' + this.table + '/route/' + param).publishReplay(1).refCount();
    }   
    getByGroupLink(param) {
        return this.http.get(this.url + '/' + this.table + '/group/' + param).publishReplay(1).refCount();
    }       
    validate(articleCode, articleRoute) {
        return this.http.get(this.url + '/' + this.table + '/' + articleCode + '/' + articleRoute);
    }
    post(data?: any) {
        return this.http.post(this.url + '/' + this.table, data, { headers: this.headers });
    }
    put(data?: any) {
        return this.http.put(this.url + '/' + this.table, data, { headers: this.headers });
    }
    //==================================================================================
}