import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import {Router} from "@angular/router";
import { Injectable, Injector } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor {

  public static readonly base_url = environment.baseUrl;

  constructor(private injector: Injector, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request);
    //Inject instead of defining in constructor to prevent circular dependency
    const auth = this.injector.get(AuthService);

    let url = request.url;
    url = url.startsWith('/api') ? RequestInterceptorService.base_url + url : url;

    //if request goes to token endpoint, dont fetch auth token
    let token = auth.isTokenEndpoint(request.url) || !request.url.startsWith('/api') ? null : auth.getToken();

    request = request.clone({
      url: url,
      setHeaders: RequestInterceptorService.constructRequestHeaders(token)
    });
    return this.handleRequest(request, next);
  }

  handleRequest(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request)
      .do((ev: HttpEvent<any>) => {
        if (ev instanceof HttpResponse) {
          console.log('processing response', ev);
        }
      })
      .catch(err => {
        console.error(err);
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['']);
          }
        }
        return Observable.throw(err);
      });
  }

  private static constructRequestHeaders(token) {
    let headers = { };
    if (token != null) {
      let authHeader = { Authorization: `Bearer ${token}`};
      return Object.assign(headers, authHeader) //merge headers into single object
    }
    return headers;
  }
}
