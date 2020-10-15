import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable() 
export class ZendeskAuthInterceptor implements HttpInterceptor {
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("intercepted_req: ", req);
        const authToken = 'Basic Y2lubm92YUBiZXpsLmlvL3Rva2VuOnZ4clVBUVZiZ2FPVjFBcHUxdlpoSXFNMlFXcmtPdFdKcEU4SFpjY2Q=';
        const authReq = req.clone({
            headers: req.headers.set('Authorization', authToken)
          });
        // const authReq = req.clone({ setHeaders: { 
        //     'Authorization': 'Basic Y2lubm92YUBiZXpsLmlvL3Rva2VuOnZ4clVBUVZiZ2FPVjFBcHUxdlpoSXFNMlFXcmtPdFdKcEU4SFpjY2Q=',
        //     'Content-Type': 'application/json',
        //     'Access-Control-Allow-Origin': '*',
        // }})
        return next.handle(authReq);
    }

}