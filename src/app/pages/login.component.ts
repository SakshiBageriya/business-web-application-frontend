import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthService } from '../auth';

@Component({
	standalone: true,
	imports: [
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
	],
	template: `
		<section class="section login">
			<p class="eyebrow">GANESH · BUSINESS PORTAL</p>
			<h1>Admin Login</h1>
			<form [formGroup]="form" (ngSubmit)="login()">
				<mat-form-field appearance="outline">
					<mat-label>Username</mat-label>
					<input matInput formControlName="username" autocomplete="username" />
					<mat-error>Username is required.</mat-error>
				</mat-form-field>
				<mat-form-field appearance="outline">
					<mat-label>Password</mat-label>
					<input
						matInput
						type="password"
						formControlName="password"
						autocomplete="current-password"
					/>
					<mat-error>Password is required.</mat-error>
				</mat-form-field>
				<p class="error" role="status">{{ error }}</p>
				<button mat-flat-button color="primary" [disabled]="busy">
					{{ busy ? 'Signing in…' : 'Sign in' }}
				</button>
			</form>
		</section>
	`,
})
export class LoginComponent {
	api = inject(ApiService);
	auth = inject(AuthService);
	router = inject(Router);
	form = inject(FormBuilder).nonNullable.group({
		username: ['', Validators.required],
		password: ['', Validators.required],
	});
	busy = false;
	error = '';

	login() {
		this.form.markAllAsTouched();
		if (this.form.invalid || this.busy) return;

		this.busy = true;
		this.api.post<{ token: string }>('/auth/login', this.form.getRawValue()).subscribe({
			next: (r) => {
				this.auth.setToken(r.token);
				void this.router.navigate(['/admin']);
			},
			error: (e) => {
				this.busy = false;
				this.error =
					e.error?.message || 'Sign in failed. Check your connection and credentials.';
			},
		});
	}
}