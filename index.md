---
layout: default
title: Home
description: BlackBox Records home.
main_class: page-main-content-region--home
body_class: home-scroll-snap-container
---
{% assign home = site.data.home %}
{% assign releases = site.releases | sort: "release_date" | reverse | slice: 0, 3 %}
{% assign artists = site.data.artists.items | slice: 0, 5 %}
{% assign news_items = site.data.news.items | limit: 3 %}
{% assign newsletter = site.data.newsletter %}
{% capture years_active_value %}{% include label-years-active.html %}{% endcapture %}
{% assign years_active = years_active_value | strip %}
{% capture country_count_value %}{% include label-country-count.html %}{% endcapture %}
{% assign country_count = country_count_value | strip %}
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
      <img src="{{ '/assets/images/brand/logo.png' | relative_url }}" alt="BlackBox Records">
    </div>
    <p class="homepage-hero-section__tagline-text">
      {{ home.hero.tagline }}
    </p>
    <div class="homepage-hero-section__action-buttons">
      <a class="call-to-action-button call-to-action-button--primary" href="{{ home.hero.primary_button_link | relative_url }}">{{ home.hero.primary_button_text }}</a>
      <a class="call-to-action-button call-to-action-button--outline" href="{{ home.hero.secondary_button_link | relative_url }}">{{ home.hero.secondary_button_text }}</a>
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
        <p class="page-section-kicker-text">{{ home.latest_releases.section_label }}</p>
        <h2 class="page-section-title-text">{{ home.latest_releases.title | upcase }}</h2>
      </div>
      <a class="page-section-header-link" href="{{ home.latest_releases.link_url | relative_url }}">{{ home.latest_releases.link_text }} <span aria-hidden="true">&rarr;</span></a>
    </div>
    <div class="release-summary-card-grid">
      {% for release in releases %}
        {% assign release_artist = site.data.artists.items | where: "slug", release.artist_slug | first %}
        {% include release-card.html release=release artist=release_artist %}
      {% endfor %}
    </div>
  </div>
</section>
<section class="page-section-standard-spacing-with-divider-and-surface-background" id="artists">
  <div class="page-content-width-constrained-container">
    <div class="page-section-header-layout-centered-and-stacked">
      <p class="page-section-kicker-text">{{ home.artists.section_label }}</p>
      <h2 class="page-section-title-text">{{ home.artists.title | upcase }}</h2>
    </div>
    <div class="artist-roster-card-grid artist-roster-card-grid--featured" data-featured-artist-grid data-max-items="5" data-site-base-url="{{ site.baseurl }}">
      {% for artist in artists %}
        {% include artist-card.html artist=artist %}
      {% endfor %}
    </div>
    <script type="application/json" id="homepage-featured-artists-data">
      {{ site.data.artists.items | jsonify }}
    </script>
    <div class="page-section-call-to-action-region">
      <a class="call-to-action-button call-to-action-button--outline" href="{{ home.artists.button_link | relative_url }}">{{ home.artists.button_text }}</a>
    </div>
  </div>
</section>
<section class="page-section-standard-spacing-with-divider" id="news">
  <div class="page-content-width-constrained-container">
    <div class="page-section-header-layout-spaced">
      <div>
        <p class="page-section-kicker-text">{{ home.news.section_label }}</p>
        <h2 class="page-section-title-text">{{ home.news.title | upcase }}</h2>
      </div>
      <a class="page-section-header-link" href="{{ home.news.link_url | relative_url }}">{{ home.news.link_text }} <span aria-hidden="true">&rarr;</span></a>
    </div>
    <div class="news-summary-card-grid">
      {% for item in news_items %}
        <a class="news-summary-card-link" href="{{ item.url | default: '/news/' | relative_url }}">
          <div class="news-summary-card-media-frame">
            <img src="{{ item.image | relative_url }}" alt="{{ item.image_alt | default: item.title }}">
          </div>
          <p class="news-summary-card-date-text">{{ item.date }}</p>
          <h3>{{ item.title }}</h3>
          <p class="news-summary-card-summary-text">{{ item.summary }}</p>
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
      <p class="page-section-kicker-text">{{ home.journey.section_label }}</p>
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
            {% assign stat_value = site.releases | size %}
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
    <p class="page-section-kicker-text">{{ newsletter.section_label }}</p>
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
