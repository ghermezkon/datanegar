import { Observable } from 'rxjs/Observable';
import { environment } from "environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { GroupArticleClass } from "app/shared";
import "rxjs/Rx";

@Injectable()
export class FileHandlerService {
    url: any = environment.apiEndPoint;
    table: any = 'fileweb';
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
    post(body?: any) {
        return this.http.post(this.url + '/' + this.table, body, { headers: this.headers });
    }
    put(body?: any) {
        return this.http.put(this.url + '/' + this.table, body, { headers: this.headers });
    }
    //==================================================================================
}