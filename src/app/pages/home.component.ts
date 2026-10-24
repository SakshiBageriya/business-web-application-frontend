import { CommonModule } from '@angular/common';
import { Component, OnDestroy, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule],
  template: `
    <section
      class="hero"
      (mouseenter)="paused = true"
      (mouseleave)="paused = false"
      (focusin)="paused = true"
      (focusout)="paused = false"
      aria-label="Garment care highlights"
      aria-roledescription="carousel"
    >
      <ng-container *ngIf="slides[index].video as videoUrl; else imageSlide">
        <video
          class="hero-media"
          autoplay
          muted
          playsinline
          preload="metadata"
          [poster]="slides[index].image"
          (ended)="move(1)"
          aria-label="Video of Ganesh Drycleaner"
        >
          <source [src]="videoUrl" type="video/mp4" />
        </video>
      </ng-container>
      <ng-template #imageSlide>
        <img
          class="hero-media"
          [src]="slides[index].image"
          [alt]="slides[index].alt"
        />
      </ng-template>
      <div class="hero-shade"></div>
      <div class="hero-copy">
        <p class="eyebrow">GANESH DRYCLEANER · NIMBAHERA</p>
        <h1>{{ slides[index].title }}</h1>
        <p>{{ slides[index].text }}</p>
        <a mat-flat-button color="accent" [routerLink]="slides[index].link">
          {{ slides[index].cta }} ↗
        </a>
      </div>
      <div class="carousel-controls">
        <button (click)="move(-1)" aria-label="Previous slide">←</button>
        <button
          *ngFor="let slide of slides; index as i"
          [class.selected]="i === index"
          (click)="index = i"
          [attr.aria-label]="'Slide ' + (i + 1)"
          [attr.aria-pressed]="i === index"
        >
          {{ i + 1 }}
        </button>
        <button (click)="move(1)" aria-label="Next slide">→</button>
        <button
          (click)="stopped = !stopped"
          [attr.aria-label]="stopped ? 'Play carousel' : 'Pause carousel'"
        >
          {{ stopped ? '▶' : 'Ⅱ' }}
        </button>
      </div>
    </section>

    <section class="trust" aria-label="About the shop">
      <div *ngFor="let detail of localHighlights">
        <span>✦</span>
        <h3>{{ detail }}</h3>
      </div>
    </section>

    <section class="section">
      <p class="eyebrow">GARMENT CARE IN NIMBAHERA</p>
      <h2>Everyday clothes, carefully looked after.</h2>
      <p class="intro">
        Visit Ganesh Drycleaner in Adarsh Colony for dry cleaning and ironing. Ask the team about
        clothing repair availability.
      </p>
      <div class="grid categories">
        <a *ngFor="let service of services" routerLink="/services" class="card">
          <span class="category-icon">{{ service.icon }}</span>
          <h3>{{ service.name }}</h3>
          <p>{{ service.description }}</p>
          <span>Explore services ↗</span>
        </a>
      </div>
      <a mat-stroked-button routerLink="/services">View Service Catalogue</a>
    </section>

    <section class="section split tint">
      <img
        src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=85"
        alt="Neatly arranged shirts"
        loading="lazy"
      />
      <div>
        <p class="eyebrow">YOUR LOCAL DRYCLEANER</p>
        <h2>Dry cleaning and ironing, close to home.</h2>
        <ul class="checks">
          <li>Located in Adarsh Colony, Nimbahera</li>
          <li>Near Bishnoi Dental Care</li>
          <li>Ask the shop about clothing repair services</li>
          <li>Contact the team to confirm care and collection options</li>
        </ul>
        <a mat-button routerLink="/contact">Contact the shop →</a>
      </div>
    </section>

    <section class="section local-location">
      <p class="eyebrow">VISIT GANESH DRYCLEANER</p>
      <h2>Find us in Nimbahera.</h2>
      <p class="intro">
        Near Bishnoi Dental Care, Adarsh Colony, Nimbahera, Rajasthan 312601.
      </p>
      <div class="actions local-location-actions">
        <a mat-flat-button color="primary" [href]="mapDirectionsUrl" target="_blank" rel="noopener">
          Get Directions ↗
        </a>
        <a mat-stroked-button routerLink="/contact">Contact the shop</a>
      </div>
      <iframe
        class="location-map"
        title="Map showing Ganesh Drycleaner in Nimbahera"
        src="https://www.google.com/maps?q=24.6224818,74.68208&output=embed"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen
      ></iframe>
    </section>

    <section class="section">
      <p class="eyebrow">SIMPLE, PERSONAL, CONVENIENT</p>
      <h2>Fresh clothes, in four simple steps.</h2>
      <div class="grid steps">
        <div *ngFor="let step of steps; index as i">
          <b>0{{ i + 1 }}</b>
          <h3>{{ step[0] }}</h3>
          <p>{{ step[1] }}</p>
        </div>
      </div>
    </section>

    <section class="cta">
      <p class="eyebrow">GARMENT CARE IN NIMBAHERA</p>
      <h2>Need dry cleaning or ironing?</h2>
      <div class="actions">
        <a mat-flat-button color="accent" routerLink="/pickup">Request Home Pickup</a>
        <a mat-stroked-button routerLink="/services">Explore Services</a>
        <a mat-button routerLink="/contact">Contact Us</a>
      </div>
    </section>
  `,
})
export class HomeComponent implements OnDestroy {
  api = inject(ApiService);
  index = 0;
  paused = false;
  stopped = false;
  timer = window.setInterval(() => {
    if (!this.paused && !this.stopped && !this.slides[this.index].video) {
      this.move(1);
    }
  }, 6000);
  mapDirectionsUrl =
    'https://www.google.com/maps/dir/?api=1&destination=24.6224818%2C74.68208';
  get localHighlights() {
    const settings = this.api.settings();
    const configured = [
      settings?.experience,
      settings?.careClaim,
      settings?.fabricClaim,
      settings?.customerClaim,
    ].filter((claim): claim is string => !!claim?.trim());

    return configured.length
      ? configured
      : [
          'Serving Nimbahera',
          'Adarsh Colony',
          'Dry cleaning & ironing',
          'Near Bishnoi Dental Care',
        ];
  }
  slides = [
    {
      title: 'Care for the Clothes You Wear',
      text: 'Dry cleaning and ironing for everyday garments. Ask us about care options for your clothes.',
      cta: 'Explore Our Services',
      link: '/services',
      alt: 'Garments ready for professional cleaning',
      image:
        'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=2000&q=85',
    },
    {
      title: 'Fresh, Clean & Pressed',
      text: 'Visit Ganesh Drycleaner in Nimbahera for dry cleaning and ironing.',
      cta: 'Discover Services',
      link: '/services',
      alt: 'Freshly pressed clothes',
      image:
        'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=2000&q=85',
    },
    {
      title: 'Care for Your Special Outfits',
      text: 'Contact the team to discuss care for your garments before visiting.',
      cta: 'Contact the Shop',
      link: '/contact',
      alt: 'Colorful garments in a clothing store',
      image: 'assets/img1.png',
    },
    {
      title: 'A Local Drycleaner in Nimbahera',
      text: 'Take a closer look at Ganesh Drycleaner in Adarsh Colony.',
      cta: 'Visit or Contact Us',
      link: '/contact',
      alt: 'Ganesh Drycleaner shop video',
      video: 'assets/shop-tour.mp4',
      image: 'assets/img1.png',
    },
    {
      title: 'A Look Inside Our Shop',
      text: 'Visit Ganesh Drycleaner in Adarsh Colony, Nimbahera.',
      cta: 'Get Directions',
      link: '/contact',
      alt: 'Clothes displayed inside Ganesh Drycleaner',
      image: 'assets/img2.png',
    },
  ];
  services = [
    {
      name: 'Dry Cleaning',
      description: 'Ask the team about suitable care for your garment.',
      icon: '♧',
    },
    {
      name: 'Ironing & Pressing',
      description: 'Contact the shop to ask about pressing options.',
      icon: '♨',
    },
    {
      name: 'Clothing Repairs',
      description: 'Ask the shop whether repair service is available for your item.',
      icon: '✧',
    },
  ];
  steps = [
    ['Choose your care', 'Browse our garment-care services.'],
    ['Send a request', 'Tell us what you need through the pickup form.'],
    ['Let’s confirm', 'Our team will confirm availability and collection details.'],
    ['Fresh and ready', 'Arrange delivery or collection with the team.'],
  ];

  move(n: number) {
    this.index = (this.index + n + this.slides.length) % this.slides.length;
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
