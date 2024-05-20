import {
    HttpEvent, HttpHandler,
    HttpHeaders, HttpInterceptor, HttpRequest,
    HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppConfig } from '../configs';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const unProtectedResources = [`${environment.apiBaseUrl}api/Login`,`${environment.apiBaseUrl}api/Doctor/GetDoctors`,`${environment.apiBaseUrl}api/Specialization/Get`,`${environment.apiBaseUrl}api/DSchedule/Get`];
        const isUnProtectedResource = unProtectedResources.filter((x: string) => req.url.includes(x)).length > 0;
        const modifiedReq = isUnProtectedResource === true ? req : this.setHeader(req);
        return next.handle(modifiedReq);
    }

    /* Private Methods */
    private setHeader(req: HttpRequest<any>): HttpRequest<any> {
        let modifiedReq: HttpRequest<any> = req;
        const token = JSON.parse(localStorage.getItem(AppConfig.auth.token)||'{}').accessToken;
        if (!token) {
            this.authService.logout();
        }

        switch (req.method) {
            case 'GET':
            case 'DELETE':
            case 'PUT':
            case 'POST':
            case 'PATCH':
                modifiedReq = req.clone({
                    headers: new HttpHeaders({
                        Authorization: `Bearer ${token}`,
                    })
                });
                break;
        }

        return modifiedReq;
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
};
