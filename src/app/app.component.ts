import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		CommonModule,
		RouterOutlet,
		RouterLink,
		RouterLinkActive,
		MatButtonModule,
	],
	template: `
		<header>
			<a class="brand" routerLink="/" (click)="open = false">
				<img class="mark" src="assets/logo_img.png" alt="Ganesh Dry Cleaners home" />
				<!-- <span>GANESH<small>DRY CLEANING</small></span> -->
			</a>
			<button
				class="menu"
				[class.open]="open"
				mat-button
				(click)="open = !open"
				[attr.aria-expanded]="open"
				[attr.aria-controls]="'primary-navigation'"
				[attr.aria-label]="open ? 'Close navigation' : 'Open navigation'"
			>
				<span class="menu-icon" aria-hidden="true">
					<span></span><span></span><span></span>
				</span>
			</button>
			<nav id="primary-navigation" aria-label="Primary navigation" [class.open]="open">
				<a
					*ngFor="let n of links"
					[routerLink]="n[1]"
					routerLinkActive="active"
					[routerLinkActiveOptions]="{ exact: true }"
					(click)="open = false"
				>
					{{ n[0] }}
				</a>
				<a
					mat-flat-button
					color="primary"
					routerLink="/pickup"
					(click)="open = false"
				>
					Book a Pickup
				</a>
			</nav>
		</header>

		<main><router-outlet /></main>

		<footer>
			<div class="grid">
				<div>
					<h2>Ganesh Dry Cleaning</h2>
					<p>Thoughtful garment care. Beautifully finished.</p>
					<p *ngIf="api.settings()?.phone">{{ api.settings()?.phone }}</p>
					<p *ngIf="api.settings()?.email">{{ api.settings()?.email }}</p>
				</div>
				<div>
					<h3>Explore</h3>
					<a routerLink="/">Home</a>
					<a routerLink="/about">About Us</a>
					<a routerLink="/services">Services</a>
					<a routerLink="/contact">Contact Us</a>
				</div>
				<div>
					<h3>Our services</h3>
					<a routerLink="/services">Dry cleaning & ethnic wear</a>
					<a routerLink="/services">Ironing & laundry</a>
					<a routerLink="/services">Winter wear & blankets</a>
				</div>
				<div>
					<h3>Visit & connect</h3>
					<p class="preserve">
						{{
							api.settings()?.branches ||
							'Near Bishnoi Dental Care, Adarsh Colony, Nimbahera, Rajasthan 312601.'
						}}
					</p>
					<p *ngIf="api.settings()?.hours" class="preserve">
						{{ api.settings()?.hours }}
					</p>
					<a
						[href]="api.webLink(api.settings()?.mapsUrl) || mapDirectionsUrl"
						target="_blank"
						rel="noopener"
						>Directions ↗</a
					>
					<a
						*ngIf="api.webLink(api.settings()?.instagram) as url"
						[href]="url"
						target="_blank"
						rel="noopener"
						>Instagram ↗</a
					>
					<a
						*ngIf="api.webLink(api.settings()?.facebook) as url"
						[href]="url"
						target="_blank"
						rel="noopener"
						>Facebook ↗</a
					>
				</div>
			</div>
			<div class="copyright">
				© {{ year }} Ganesh Dry Cleaning · Care in every detail.
			</div>
		</footer>

		<a
			*ngIf="api.whatsapp() as url"
			class="whatsapp"
			[href]="url"
			target="_blank"
			rel="noopener"
			aria-label="Chat on WhatsApp"
			>WhatsApp ↗</a
		>
	`,
})
export class AppComponent {
	api = inject(ApiService);
	mapDirectionsUrl =
		'https://www.google.com/maps/dir/?api=1&destination=24.6224818%2C74.68208';
	open = false;
	year = new Date().getFullYear();
	links = [
		['Home', '/'],
		['About Us', '/about'],
		['Services', '/services'],
		['Contact Us', '/contact'],
	];

	constructor() {
		this.api.loadSettings();
	}
}
