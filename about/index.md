---
layout: default
title: About
description: About the label.
---

{% assign about = site.data.about %}
{% assign newsletter = site.data.newsletter %}
{% assign artist_count = site.data.artists.items | size %}
{% assign release_count = site.data.releases.items | size %}
{% assign artists_with_country = site.data.artists.items | where_exp: "item", "item.country" %}
{% assign country_names = artists_with_country | map: "country" | uniq %}
{% assign country_count = country_names | size %}
{% assign current_year = 'now' | date: '%Y' | plus: 0 %}
{% assign established_year = site.data.settings.established_year | default: current_year | plus: 0 %}
{% assign years_active = current_year | minus: established_year | plus: 1 %}
{% if years_active < 1 %}
{% assign years_active = 1 %}
{% endif %}
<section class="page-hero">
  <div class="site-container">
    <p class="page-hero__kicker">{{ about.hero.kicker }}</p>
    <h1 class="page-hero__title">{{ about.hero.title | upcase }}</h1>
  </div>
</section>
<section class="page-hero-image">
  <img src="{{ about.hero.image | relative_url }}" alt="{{ about.hero.image_alt }}">
  <div class="page-hero-image__overlay"></div>
</section>
<section class="section">
  <div class="site-container rich-text">
    <p class="lead">{{ about.lead }}</p>

    {% for section in about.sections %}
      <h2>{{ section.title | upcase }}</h2>
      {% for paragraph in section.paragraphs %}
        <p>{{ paragraph }}</p>
      {% endfor %}
    {% endfor %}

    <blockquote>
      <p>&quot;{{ about.quote.text }}&quot;</p>
      <cite>&mdash; {{ about.quote.cite }}</cite>
    </blockquote>

    <h2>{{ about.contact.title | upcase }}</h2>
    <p>{{ about.contact.intro }}</p>
    <ul>
      {% for item in about.contact.items %}
        <li><span>{{ item.label }}:</span> {{ item.value }}</li>
      {% endfor %}
    </ul>

  </div>
</section>

<section class="section section--border section--card">
    <div class="site-container stats-grid">
      {% for stat in about.stats %}
        {% case stat.key %}
          {% when "artists" %}
            {% assign stat_value = artist_count %}
          {% when "releases" %}
            {% assign stat_value = release_count %}
          {% when "countries" %}
            {% assign stat_value = country_count %}
          {% when "year" %}
            {% assign stat_value = years_active %}
          {% else %}
            {% assign stat_value = stat.value %}
        {% endcase %}
        <div>
          <p>{{ stat_value }}</p>
          <span>{{ stat.label }}</span>
        </div>
      {% endfor %}
    </div>
</section>

<section class="section section--border newsletter">
  <div class="newsletter__rings" aria-hidden="true">
    <span></span>
    <span></span>
  </div>
  <div class="site-container newsletter__inner">
    <p class="section-kicker">{{ newsletter.kicker }}</p>
    <h2 class="section-title">{{ newsletter.title | upcase }}</h2>
    <p>{{ newsletter.description }}</p>
    <form class="newsletter__form">
      <label class="visually-hidden" for="about-newsletter-email">Email address</label>
      <input id="about-newsletter-email" type="email" placeholder="{{ newsletter.placeholder }}" required>
      <button type="submit">{{ newsletter.button_label }}</button>
    </form>
    <p class="newsletter__note">{{ newsletter.note }}</p>
  </div>
</section>
