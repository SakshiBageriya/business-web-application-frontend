import { Routes } from '@angular/router';
import { authGuard } from './auth';
import { AboutComponent } from './pages/about.component';
import { AdminComponent } from './pages/admin.component';
import { HomeComponent } from './pages/home.component';
import { LoginComponent } from './pages/login.component';
import { RequestComponent } from './pages/request.component';
import { ServicesComponent } from './pages/services.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'about', component: AboutComponent },
	{ path: 'services', component: ServicesComponent },
	{ path: 'pickup', component: RequestComponent, data: { kind: 'pickup' } },
	{ path: 'contact', component: RequestComponent, data: { kind: 'contact' } },
	{ path: 'admin/login', component: LoginComponent },
	{ path: 'admin', component: AdminComponent, canActivate: [authGuard] },
	{ path: '**', redirectTo: '' },
];