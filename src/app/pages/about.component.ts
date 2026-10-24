import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
	standalone: true,
	imports: [RouterLink, MatButtonModule],
	template: `
		<section class="page-heading">
			<p class="eyebrow">ABOUT GANESH</p>
			<h1>Care that goes beyond clean.</h1>
			<p>A personal approach to the clothes you love.</p>
		</section>
		<section class="section split">
			<img
				src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=85"
				alt="A carefully arranged wardrobe"
			/>
			<div>
				<h2>Every garment deserves attention.</h2>
				<p>
					At Ganesh Dry Cleaning, we bring a considered approach to everyday clothing and special
					occasion wear alike. We look at fabric, construction and care instructions before
					recommending a treatment.
				</p>
				<p>
					From washing and pressing to professional dry cleaning, our focus is careful handling,
					professional finishing and clear communication.
				</p>
				<p>
					Results depend on the fabric and condition of each garment. Our team will discuss care
					options and collection arrangements with you.
				</p>
				<a mat-flat-button color="primary" routerLink="/pickup">Arrange garment care</a>
			</div>
		</section>
		<section class="section local-location">
			<p class="eyebrow">YOUR NEIGHBOURHOOD DRYCLEANER</p>
			<h2>Find us in Adarsh Colony.</h2>
			<p class="intro">
				Near Bishnoi Dental Care, Adarsh Colony, Nimbahera, Rajasthan 312601.
			</p>
			<a
				mat-flat-button
				color="primary"
				href="https://www.google.com/maps/dir/?api=1&destination=24.6224818%2C74.68208"
				target="_blank"
				rel="noopener"
			>
				Get Directions ↗
			</a>
		</section>
	`,
})
export class AboutComponent {}