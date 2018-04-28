import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

export abstract class HttpCache {
    abstract get(req: HttpRequest<any>): HttpResponse<any> | null;
    abstract put(req: HttpRequest<any>, resp: HttpResponse<any>): void;
}

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const started = Date.now();
        return next
            .handle(req)
            .do(event => {
                if (event instanceof HttpResponse) {
                    const elapsed = Date.now() - started;
                    console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
                }
            });
    }
}

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
    constructor(private cache: HttpCache) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Still skip non-GET requests.
        if (req.method !== 'GET') {
            return next.handle(req);
        }

        // This will be an Observable of the cached value if there is one,
        // or an empty Observable otherwise. It starts out empty.
        let maybeCachedResponse: Observable<HttpEvent<any>> = Observable.empty();

        // Check the cache.
        const cachedResponse = this.cache.get(req);
        if (cachedResponse) {
            maybeCachedResponse = Observable.of(cachedResponse);
        }

        // Create an Observable (but don't subscribe) that represents making
        // the network request and caching the value.
        const networkResponse = next.handle(req).do(event => {
            // Just like before, check for the HttpResponse event and cache it.
            if (event instanceof HttpResponse) {
                this.cache.put(req, event);
            }
        });

        // Now, combine the two and send the cached response first (if there is
        // one), and the network response second.
        return Observable.concat(maybeCachedResponse, networkResponse);
    }
}