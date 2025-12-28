---
layout: default
title: Home
description: BlackBox Records home.
main_class: page-main-content-region--home
body_class: home-scroll-snap-container
---
{% assign home = site.data.home %}
{% assign releases = site.data.releases.items | sort: "year" | reverse | slice: 0, 3 %}
{% assign artists = site.data.artists.items | slice: 0, 5 %}
{% assign news_items = site.data.news.items | limit: 3 %}
{% assign newsletter = site.data.newsletter %}
{% assign current_year = 'now' | date: '%Y' | plus: 0 %}
{% assign established_year = site.data.settings.established_year | default: current_year | plus: 0 %}
{% assign years_active = current_year | minus: established_year | plus: 1 %}
{% if years_active < 1 %}
{% assign years_active = 1 %}
{% endif %}
{% assign artists_with_country = site.data.artists.items | where_exp: "item", "item.country" %}
{% assign country_names = artists_with_country | map: "country" | uniq %}
{% assign country_count = country_names | size %}
<section class="homepage-hero-section" id="homepage-hero-section">
  <div class="homepage-hero-section__background-pattern-layer" aria-hidden="true">
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path d="M50 100 Q45 70 50 50 Q55 30 50 0" stroke="currentColor" stroke-width="0.5" fill="none" />
      <path d="M30 100 Q35 60 40 40 Q45 20 50 0" stroke="currentColor" stroke-width="0.3" fill="none" />
      <path d="M70 100 Q65 60 60 40 Q55 20 50 0" stroke="currentColor" stroke-width="0.3" fill="none" />
    </svg>
  </div>
  <div class="homepage-hero-section__orbit-ring-layer homepage-hero-section__orbit-ring-layer--large" aria-hidden="true"></div>
  <div class="homepage-hero-section__orbit-ring-layer homepage-hero-section__orbit-ring-layer--medium" aria-hidden="true"></div>
  <div class="homepage-hero-section__orbit-ring-layer homepage-hero-section__orbit-ring-layer--small" aria-hidden="true"></div>
  <div class="homepage-hero-section__content-block page-content-width-constrained-container">
    <div class="homepage-hero-section__logo-lockup">
      <img src="{{ '/assets/images/logo.png' | relative_url }}" alt="BlackBox Records">
    </div>
    <p class="homepage-hero-section__tagline-text">
      {{ home.hero.tagline }}
    </p>
    <div class="homepage-hero-section__action-buttons">
      <a class="call-to-action-button call-to-action-button--primary" href="{{ home.hero.primary_url | relative_url }}">{{ home.hero.primary_label }}</a>
      <a class="call-to-action-button call-to-action-button--outline" href="{{ home.hero.secondary_url | relative_url }}">{{ home.hero.secondary_label }}</a>
    </div>
  </div>
  <div class="homepage-hero-section__scroll-indicator" aria-hidden="true">
    <span>Scroll</span>
    <div class="homepage-hero-section__scroll-indicator-line">
      <span></span>
    </div>
  </div>
</section>
<section class="page-section-standard-spacing-with-divider" id="featured-releases">
  <div class="page-content-width-constrained-container">
    <div class="page-section-header-layout-spaced">
      <div>
        <p class="page-section-kicker-text">{{ home.latest_releases.kicker }}</p>
        <h2 class="page-section-title-text">{{ home.latest_releases.title | upcase }}</h2>
      </div>
      <a class="page-section-header-link" href="{{ home.latest_releases.link_url | relative_url }}">{{ home.latest_releases.link_label }} <span aria-hidden="true">&rarr;</span></a>
    </div>
    <div class="release-summary-card-grid">
      {% for release in releases %}
        <a class="release-summary-card-link" href="{{ release.url | default: '/shop/' | relative_url }}">
          <div class="release-summary-card-media-frame">
            <img src="{{ release.image | relative_url }}" alt="{{ release.image_alt | default: release.title }}">
            <div class="release-summary-card-overlay-layer">
              <span>Listen</span>
            </div>
          </div>
          <p class="release-summary-card-year-text">{{ release.year }}</p>
          <h3 class="release-summary-card-title-text">{{ release.title | upcase }}</h3>
          <p class="release-summary-card-artist-text">{{ release.artist }}</p>
        </a>
      {% endfor %}
    </div>
  </div>
</section>
<section class="page-section-standard-spacing-with-divider-and-surface-background" id="artists">
  <div class="page-content-width-constrained-container">
    <div class="page-section-header-layout-centered-and-stacked">
      <p class="page-section-kicker-text">{{ home.artists.kicker }}</p>
      <h2 class="page-section-title-text">{{ home.artists.title | upcase }}</h2>
    </div>
    <div class="artist-roster-card-grid artist-roster-card-grid--featured" data-featured-artist-grid data-max-items="5" data-site-base-url="{{ site.baseurl }}">
      {% for artist in artists %}
        <a class="artist-roster-card-link" href="{{ artist.url | default: '/artists/' | relative_url }}">
          <img src="{{ artist.image | relative_url }}" alt="{{ artist.image_alt | default: artist.name }}">
          <div class="artist-roster-card-overlay-layer"></div>
          <div class="artist-roster-card-text">
            <p>{{ artist.genre }}</p>
            <h3>{{ artist.name | upcase }} <span aria-hidden="true">&nearr;</span></h3>
          </div>
          <p class="artist-roster-card-bio-text">{{ artist.bio }}</p>
        </a>
      {% endfor %}
    </div>
    <script type="application/json" id="homepage-featured-artists-data">
      {{ site.data.artists.items | jsonify }}
    </script>
    <div class="page-section-call-to-action-region">
      <a class="call-to-action-button call-to-action-button--outline" href="{{ home.artists.cta_url | relative_url }}">{{ home.artists.cta_label }}</a>
    </div>
  </div>
</section>
<section class="page-section-standard-spacing-with-divider" id="news">
  <div class="page-content-width-constrained-container">
    <div class="page-section-header-layout-spaced">
      <div>
        <p class="page-section-kicker-text">{{ home.news.kicker }}</p>
        <h2 class="page-section-title-text">{{ home.news.title | upcase }}</h2>
      </div>
      <a class="page-section-header-link" href="{{ home.news.link_url | relative_url }}">{{ home.news.link_label }} <span aria-hidden="true">&rarr;</span></a>
    </div>
    <div class="news-summary-card-grid">
      {% for item in news_items %}
        <a class="news-summary-card-link" href="{{ item.url | default: '/news/' | relative_url }}">
          <div class="news-summary-card-media-frame">
            <img src="{{ item.image | relative_url }}" alt="{{ item.image_alt | default: item.title }}">
          </div>
          <p class="news-summary-card-date-text">{{ item.date }}</p>
          <h3>{{ item.title }}</h3>
          <p class="news-summary-card-excerpt-text">{{ item.excerpt }}</p>
        </a>
      {% endfor %}
    </div>
  </div>
</section>
<section class="page-section-standard-spacing-with-divider-and-surface-background" id="journey">
  <div class="page-content-width-constrained-container about-section-layout-grid">
    <div class="about-section-image-frame">
      <div class="about-section-image-outline"></div>
      <img src="{{ home.journey.image | relative_url }}" alt="{{ home.journey.image_alt }}">
    </div>
    <div class="about-section-content-block">
      <p class="page-section-kicker-text">{{ home.journey.kicker }}</p>
      <h2 class="page-section-title-text">{{ home.journey.title | upcase }}</h2>
      <div class="about-section-body-text">
        {% for paragraph in home.journey.paragraphs %}
          <p>{{ paragraph }}</p>
        {% endfor %}
      </div>
      <div class="about-section-statistics-grid">
        {% for stat in home.journey.stats %}
          {% if stat.key == "artists" %}
            {% assign stat_value = site.data.artists.items | size %}
          {% elsif stat.key == "releases" %}
            {% assign stat_value = site.data.releases.items | size %}
          {% elsif stat.key == "countries" %}
            {% assign stat_value = country_count %}
          {% elsif stat.key == "year" %}
            {% assign stat_value = years_active %}
          {% else %}
            {% assign stat_value = stat.value %}
          {% endif %}
          <div>
            <p>{{ stat_value }}</p>
            <span>{{ stat.label }}</span>
          </div>
        {% endfor %}
      </div>
    </div>
  </div>
</section>
<section class="newsletter-signup-area" id="newsletter-signup-area">
  <div class="newsletter-background-ring-layer" aria-hidden="true">
    <span></span>
    <span></span>
  </div>
  <div class="page-content-width-constrained-container newsletter-content-block">
    <p class="page-section-kicker-text">{{ newsletter.kicker }}</p>
    <h2 class="page-section-title-text">{{ newsletter.title | upcase }}</h2>
    <p>{{ newsletter.description }}</p>
    <form class="newsletter-signup-form">
      <label class="accessibility-visually-hidden-text" for="newsletter-email">Email address</label>
      <input id="newsletter-email" type="email" placeholder="{{ newsletter.placeholder }}" required>
      <button type="submit">{{ newsletter.button_label }}</button>
    </form>
    <p class="newsletter-signup-note-text">{{ newsletter.note }}</p>
  </div>
</section>
