import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { jwtInterceptor } from './auth';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(
			routes,
			withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
		),
		provideHttpClient(withInterceptors([jwtInterceptor])),
		provideAnimations(),
	],
};