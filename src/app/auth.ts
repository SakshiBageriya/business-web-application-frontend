import { HttpInterceptorFn } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
	get token() {
		return sessionStorage.getItem('ganesh_token');
	}

	setToken(token: string) {
		sessionStorage.setItem('ganesh_token', token);
	}

	logout() {
		sessionStorage.removeItem('ganesh_token');
	}

	valid() {
		try {
			const t = this.token;
			return (
				!!t &&
				JSON.parse(atob(t.split('.')[1])).exp * 1000 > Date.now()
			);
		} catch {
			return false;
		}
	}
}

export const authGuard: CanActivateFn = () =>
	inject(AuthService).valid() || inject(Router).createUrlTree(['/admin/login']);

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
	const auth = inject(AuthService);
	const router = inject(Router);
	const own = req.url.startsWith(environment.apiUrl + '/');

	if (own && auth.token) {
		req = req.clone({
			setHeaders: { Authorization: 'Bearer ' + auth.token },
		});
	}

	return next(req).pipe(
		catchError((e) => {
			if (own && e.status === 401 && req.url.includes('/admin/')) {
				auth.logout();
				void router.navigate(['/admin/login']);
			}

			return throwError(() => e);
		}),
	);
};
