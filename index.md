---
layout: default
title: Home
description: BlackBox Records home.
main_class: site-main--home
body_class: home-snap
---

<section class="hero snap-section" id="hero">
  <div class="hero__pattern" aria-hidden="true">
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path d="M50 100 Q45 70 50 50 Q55 30 50 0" stroke="currentColor" stroke-width="0.5" fill="none" />
      <path d="M30 100 Q35 60 40 40 Q45 20 50 0" stroke="currentColor" stroke-width="0.3" fill="none" />
      <path d="M70 100 Q65 60 60 40 Q55 20 50 0" stroke="currentColor" stroke-width="0.3" fill="none" />
    </svg>
  </div>
  <div class="hero__ring hero__ring--lg" aria-hidden="true"></div>
  <div class="hero__ring hero__ring--md" aria-hidden="true"></div>
  <div class="hero__ring hero__ring--sm" aria-hidden="true"></div>

  <div class="hero__content site-container">
    <div class="hero__logo">
      <img src="{{ '/assets/images/logo.png' | relative_url }}" alt="BlackBox Records">
    </div>
    <p class="hero__tagline">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel tortor quis nisi tincidunt eleifend.
    </p>
    <div class="hero__actions">
      <a class="button button--primary" href="{{ '/artists/' | relative_url }}">Explore Artists</a>
      <a class="button button--outline" href="{{ '/shop/' | relative_url }}">Visit Shop</a>
    </div>
  </div>

  <div class="hero__scroll" aria-hidden="true">
    <span>Scroll</span>
    <div class="hero__scroll-line">
      <span></span>
    </div>
  </div>
</section>

<section class="section section--border snap-section" id="featured-releases">
  <div class="site-container">
    <div class="section-header">
      <div>
        <p class="section-kicker">Latest</p>
        <h2 class="section-title">FEATURED RELEASES</h2>
      </div>
      <a class="section-link" href="{{ '/shop/' | relative_url }}">View All <span aria-hidden="true">&rarr;</span></a>
    </div>
    <div class="release-grid">
      <a class="release-card" href="{{ '/shop/' | relative_url }}">
        <div class="release-card__media">
          <img src="{{ '/assets/images/dark-album-cover-art-.jpg' | relative_url }}" alt="Lorem Ipsum Vol. I">
          <div class="release-card__overlay">
            <span>Listen</span>
          </div>
        </div>
        <p class="release-card__year">2024</p>
        <h3 class="release-card__title">LOREM IPSUM VOL. I</h3>
        <p class="release-card__artist">Artist Name</p>
      </a>
      <a class="release-card" href="{{ '/shop/' | relative_url }}">
        <div class="release-card__media">
          <img src="{{ '/assets/images/dark-album-cover-art-.jpg' | relative_url }}" alt="Dolor Sit Amet">
          <div class="release-card__overlay">
            <span>Listen</span>
          </div>
        </div>
        <p class="release-card__year">2024</p>
        <h3 class="release-card__title">DOLOR SIT AMET</h3>
        <p class="release-card__artist">Another Artist</p>
      </a>
      <a class="release-card" href="{{ '/shop/' | relative_url }}">
        <div class="release-card__media">
          <img src="{{ '/assets/images/dark-album-cover-art-.jpg' | relative_url }}" alt="Consectetur">
          <div class="release-card__overlay">
            <span>Listen</span>
          </div>
        </div>
        <p class="release-card__year">2024</p>
        <h3 class="release-card__title">CONSECTETUR</h3>
        <p class="release-card__artist">Third Artist</p>
      </a>
    </div>
  </div>
</section>

<section class="section section--border section--card snap-section" id="artists">
  <div class="site-container">
    <div class="section-header section-header--center">
      <p class="section-kicker">Roster</p>
      <h2 class="section-title">OUR ARTISTS</h2>
    </div>
    <div class="artist-grid">
      <a class="artist-card" href="{{ '/artists/' | relative_url }}">
        <img src="{{ '/assets/images/dark-band-photo-moody-.jpg' | relative_url }}" alt="Artist One">
        <div class="artist-card__overlay"></div>
        <div class="artist-card__content">
          <p>Post-Metal</p>
          <h3>ARTIST ONE <span aria-hidden="true">&nearr;</span></h3>
        </div>
      </a>
      <a class="artist-card" href="{{ '/artists/' | relative_url }}">
        <img src="{{ '/assets/images/dark-band-photo-moody-.jpg' | relative_url }}" alt="Artist Two">
        <div class="artist-card__overlay"></div>
        <div class="artist-card__content">
          <p>Post-Punk</p>
          <h3>ARTIST TWO <span aria-hidden="true">&nearr;</span></h3>
        </div>
      </a>
      <a class="artist-card" href="{{ '/artists/' | relative_url }}">
        <img src="{{ '/assets/images/dark-band-photo-moody-.jpg' | relative_url }}" alt="Artist Three">
        <div class="artist-card__overlay"></div>
        <div class="artist-card__content">
          <p>Post-Hardcore</p>
          <h3>ARTIST THREE <span aria-hidden="true">&nearr;</span></h3>
        </div>
      </a>
      <a class="artist-card" href="{{ '/artists/' | relative_url }}">
        <img src="{{ '/assets/images/dark-band-photo-moody-.jpg' | relative_url }}" alt="Artist Four">
        <div class="artist-card__overlay"></div>
        <div class="artist-card__content">
          <p>Indie Rock</p>
          <h3>ARTIST FOUR <span aria-hidden="true">&nearr;</span></h3>
        </div>
      </a>
    </div>
    <div class="section-cta">
      <a class="button button--outline" href="{{ '/artists/' | relative_url }}">View Full Roster</a>
    </div>
  </div>
</section>

<section class="section section--border snap-section" id="news">
  <div class="site-container">
    <div class="section-header">
      <div>
        <p class="section-kicker">Updates</p>
        <h2 class="section-title">LATEST NEWS</h2>
      </div>
      <a class="section-link" href="{{ '/news/' | relative_url }}">All News <span aria-hidden="true">&rarr;</span></a>
    </div>
    <div class="news-grid">
      <a class="news-card" href="{{ '/news/' | relative_url }}">
        <div class="news-card__media">
          <img src="{{ '/assets/images/dark-concert-venue-.jpg' | relative_url }}" alt="Lorem ipsum">
        </div>
        <p class="news-card__date">Dec 2024</p>
        <h3>Lorem ipsum dolor sit amet consectetur adipiscing</h3>
        <p class="news-card__excerpt">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
      </a>
      <a class="news-card" href="{{ '/news/' | relative_url }}">
        <div class="news-card__media">
          <img src="{{ '/assets/images/dark-concert-venue-.jpg' | relative_url }}" alt="Praesent vel tortor">
        </div>
        <p class="news-card__date">Nov 2024</p>
        <h3>Praesent vel tortor quis nisi tincidunt eleifend</h3>
        <p class="news-card__excerpt">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.</p>
      </a>
      <a class="news-card" href="{{ '/news/' | relative_url }}">
        <div class="news-card__media">
          <img src="{{ '/assets/images/dark-concert-venue-.jpg' | relative_url }}" alt="Vestibulum ante ipsum">
        </div>
        <p class="news-card__date">Oct 2024</p>
        <h3>Vestibulum ante ipsum primis in faucibus</h3>
        <p class="news-card__excerpt">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.</p>
      </a>
    </div>
  </div>
</section>

<section class="section section--border section--card snap-section" id="journey">
  <div class="site-container about-grid">
    <div class="about-image">
      <div class="about-image__frame"></div>
      <img src="{{ '/assets/images/dark-recording-studio-vintage-equipment.jpg' | relative_url }}" alt="About BlackBox Records">
    </div>
    <div class="about-content">
      <p class="section-kicker">About</p>
      <h2 class="section-title">THE JOURNEY</h2>
      <div class="about-content__body">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <p>Praesent vel tortor quis nisi tincidunt eleifend. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.</p>
      </div>
      <div class="about-stats">
        <div>
          <p>12</p>
          <span>Artists</span>
        </div>
        <div>
          <p>40</p>
          <span>Releases</span>
        </div>
        <div>
          <p>1</p>
          <span>Year</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section--border newsletter snap-section" id="newsletter">
  <div class="newsletter__rings" aria-hidden="true">
    <span></span>
    <span></span>
  </div>
  <div class="site-container newsletter__inner">
    <p class="section-kicker">Newsletter</p>
    <h2 class="section-title">JOIN THE JOURNEY</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel tortor quis nisi tincidunt eleifend.</p>
    <form class="newsletter__form">
      <label class="visually-hidden" for="newsletter-email">Email address</label>
      <input id="newsletter-email" type="email" placeholder="your@email.com" required>
      <button type="submit">Subscribe</button>
    </form>
    <p class="newsletter__note">Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
  </div>
</section>
