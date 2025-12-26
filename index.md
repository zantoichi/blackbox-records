---
layout: default
title: Home
description: BlackBox Records home.
main_class: site-main--home
body_class: home-snap
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
      {{ home.hero.tagline }}
    </p>
    <div class="hero__actions">
      <a class="button button--primary" href="{{ home.hero.primary_url | relative_url }}">{{ home.hero.primary_label }}</a>
      <a class="button button--outline" href="{{ home.hero.secondary_url | relative_url }}">{{ home.hero.secondary_label }}</a>
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
        <p class="section-kicker">{{ home.latest_releases.kicker }}</p>
        <h2 class="section-title">{{ home.latest_releases.title | upcase }}</h2>
      </div>
      <a class="section-link" href="{{ home.latest_releases.link_url | relative_url }}">{{ home.latest_releases.link_label }} <span aria-hidden="true">&rarr;</span></a>
    </div>
    <div class="release-grid release-grid--home">
      {% for release in releases %}
        <a class="release-card" href="{{ release.url | default: '/shop/' | relative_url }}">
          <div class="release-card__media">
            <img src="{{ release.image | relative_url }}" alt="{{ release.image_alt | default: release.title }}">
            <div class="release-card__overlay">
              <span>Listen</span>
            </div>
          </div>
          <p class="release-card__year">{{ release.year }}</p>
          <h3 class="release-card__title">{{ release.title | upcase }}</h3>
          <p class="release-card__artist">{{ release.artist }}</p>
        </a>
      {% endfor %}
    </div>
  </div>
</section>

<section class="section section--border section--card snap-section" id="artists">
  <div class="site-container">
    <div class="section-header section-header--center">
      <p class="section-kicker">{{ home.artists.kicker }}</p>
      <h2 class="section-title">{{ home.artists.title | upcase }}</h2>
    </div>
    <div class="artist-grid artist-grid--home" data-artist-grid data-max="5" data-baseurl="{{ site.baseurl }}">
      {% for artist in artists %}
        <a class="artist-card" href="{{ artist.url | default: '/artists/' | relative_url }}">
          <img src="{{ artist.image | relative_url }}" alt="{{ artist.image_alt | default: artist.name }}">
          <div class="artist-card__overlay"></div>
          <div class="artist-card__content">
            <p>{{ artist.genre }}</p>
            <h3>{{ artist.name | upcase }} <span aria-hidden="true">&nearr;</span></h3>
          </div>
          <p class="artist-card__bio">{{ artist.bio }}</p>
        </a>
      {% endfor %}
    </div>
    <script type="application/json" id="home-artists-data">
      {{ site.data.artists.items | jsonify }}
    </script>
    <div class="section-cta">
      <a class="button button--outline" href="{{ home.artists.cta_url | relative_url }}">{{ home.artists.cta_label }}</a>
    </div>
  </div>
</section>

<section class="section section--border snap-section" id="news">
  <div class="site-container">
    <div class="section-header">
      <div>
        <p class="section-kicker">{{ home.news.kicker }}</p>
        <h2 class="section-title">{{ home.news.title | upcase }}</h2>
      </div>
      <a class="section-link" href="{{ home.news.link_url | relative_url }}">{{ home.news.link_label }} <span aria-hidden="true">&rarr;</span></a>
    </div>
    <div class="news-grid">
      {% for item in news_items %}
        <a class="news-card" href="{{ item.url | default: '/news/' | relative_url }}">
          <div class="news-card__media">
            <img src="{{ item.image | relative_url }}" alt="{{ item.image_alt | default: item.title }}">
          </div>
          <p class="news-card__date">{{ item.date }}</p>
          <h3>{{ item.title }}</h3>
          <p class="news-card__excerpt">{{ item.excerpt }}</p>
        </a>
      {% endfor %}
    </div>
  </div>
</section>

<section class="section section--border section--card snap-section" id="journey">
  <div class="site-container about-grid">
    <div class="about-image">
      <div class="about-image__frame"></div>
      <img src="{{ home.journey.image | relative_url }}" alt="{{ home.journey.image_alt }}">
    </div>
    <div class="about-content">
      <p class="section-kicker">{{ home.journey.kicker }}</p>
      <h2 class="section-title">{{ home.journey.title | upcase }}</h2>
      <div class="about-content__body">
        {% for paragraph in home.journey.paragraphs %}
          <p>{{ paragraph }}</p>
        {% endfor %}
      </div>
      <div class="about-stats">
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

<section class="section section--border newsletter snap-section" id="newsletter">
  <div class="newsletter__rings" aria-hidden="true">
    <span></span>
    <span></span>
  </div>
  <div class="site-container newsletter__inner">
    <p class="section-kicker">{{ newsletter.kicker }}</p>
    <h2 class="section-title">{{ newsletter.title | upcase }}</h2>
    <p>{{ newsletter.description }}</p>
    <form class="newsletter__form">
      <label class="visually-hidden" for="newsletter-email">Email address</label>
      <input id="newsletter-email" type="email" placeholder="{{ newsletter.placeholder }}" required>
      <button type="submit">{{ newsletter.button_label }}</button>
    </form>
    <p class="newsletter__note">{{ newsletter.note }}</p>
  </div>
</section>
