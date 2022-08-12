import { Router } from '@angular/router';
import { CommonService } from './../services/common.service';

import { Injectable, NgModule, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpHeaders,
	HttpErrorResponse,
	HttpResponse,
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor, OnInit {
	currentUser = null;
	constructor(private commonService: CommonService, private router: Router) {}
	ngOnInit(): void {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler,
	): Observable<HttpEvent<any>> {
		this.currentUser = this.commonService.getUser();
		const headers = new HttpHeaders({
			Authorization:
				this.currentUser 
					? `Bearer ${this.currentUser.token}`
					: '',
		});

		const dupReq = req.clone({ headers });
		return next.handle(dupReq).pipe(
			map((event: any) => {
				const languageEvent = event.url ? event.url.includes('json') : false;
				if (languageEvent) return event;
				if (event instanceof HttpResponse) {
					if (
						dupReq.method == 'POST' ||
						dupReq.method == 'PUT' ||
						dupReq.method == 'DELETE'
					) {
						if (!dupReq.url.includes('Login') && event.body.message) {
							this.commonService.createNotification(
								'success',
								event.body.message,
							);
						}
					}
					return new HttpResponse({
						body: {
							success: true,
							data: event.body,
						},
					});
				}
				return event;
			}),
			catchError((err: HttpErrorResponse) => {
				this.commonService.loading.next(false);
				const message =
					err.error && err.error.message
						? err.error.message
						: this.getStatusError(err);

				this.commonService.createNotification('error', message);
				return of(
					new HttpResponse({
						body: {
							success: false,
							error: { description: err.error.message },
						},
					}),
				);
			}),
		);
	}

	getStatusError = (error) => {
		switch (error.status) {
			case 400:
				return 'Bad Request';
			case 401:
				this.router.navigateByUrl('/login');
				return 'Unauthorized';
			case 403:
				return 'Forbidden';
			case 404:
				return 'Not Found';
			case 408:
				return 'Request Timeout';
			case 413:
				return 'Payload Too Large';
			case 415:
				return 'Unsupported Media Type';
			case 500 || 0:
				return 'Internal Server Error';
			default:
				return 'Internal Server Error';
		}
	};
}

@NgModule({
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpsRequestInterceptor,
			multi: true,
		},
	],
})
export class HttpInterceptorModule {}
