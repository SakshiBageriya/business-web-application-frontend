import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../environments/environment';
import { ServiceItem, Settings } from './models';

@Injectable({ providedIn: 'root' })
export class ApiService {
	readonly base = environment.apiUrl;
	settings = signal<Settings | null>(null);

	constructor(private http: HttpClient) {}

	get<T>(path: string) {
		return this.http.get<T>(this.base + path);
	}

	post<T>(path: string, body: unknown) {
		return this.http.post<T>(this.base + path, body);
	}

	put<T>(path: string, body: unknown) {
		return this.http.put<T>(this.base + path, body);
	}

	patch<T>(path: string, body: unknown) {
		return this.http.patch<T>(this.base + path, body);
	}

	delete(path: string) {
		return this.http.delete(this.base + path);
	}

	loadSettings() {
		this.get<Settings>('/settings').subscribe({
			next: (s) => this.settings.set(s),
			error: () => {},
		});
	}

	services() {
		return this.get<ServiceItem[]>('/services');
	}

	webLink(value: string | undefined) {
		return value && /^https:\/\//i.test(value) ? value : '';
	}

	whatsapp() {
		const v = this.settings()?.whatsapp || '';
		return /^\+?[\d\s()-]{7,25}$/.test(v)
			? 'https://wa.me/' + v.replace(/\D/g, '')
			: '';
	}
}
