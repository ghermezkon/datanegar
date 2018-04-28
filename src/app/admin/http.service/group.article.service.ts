import "rxjs/Rx";
import { Observable } from 'rxjs/Observable';
import { Injectable } from "@angular/core";
import { GroupArticleClass } from "app/shared";
import { environment } from "environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class GroupArticleService {
    url: any = environment.apiEndPoint;
    table: any = 'groupArticle';
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
    validate(groupCode, groupName) {
        return this.http.get(this.url + '/' + this.table + '/' + groupCode + '/' + groupName);
    }
    post(data?: any) {
        return this.http.post(this.url + '/' + this.table, data, { headers: this.headers });
    }
    put(data?: any) {
        return this.http.put(this.url + '/' + this.table, data, { headers: this.headers });
    }
    //==================================================================================
}