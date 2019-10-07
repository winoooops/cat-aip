import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { Observable} from 'rxjs'



@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    // the code snippet is from https://blog.angular-university.io/angular-jwt-authentication/
    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {
        // take the token from localStorage
        const idToken = localStorage.getItem("id_token");
        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + idToken)
            });

            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}