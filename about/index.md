---
layout: default
title: About
description: About the label.
---
{% assign about = site.data.about %}
{% assign newsletter = site.data.newsletter %}
{% assign artist_count = site.data.artists.items | size %}
{% assign release_count = site.releases | size %}
{% assign artists_with_country = site.data.artists.items | where_exp: "item", "item.country" %}
{% assign country_names = artists_with_country | map: "country" | uniq %}
{% assign country_count = country_names | size %}
{% assign current_year = 'now' | date: '%Y' | plus: 0 %}
{% assign established_year = site.data.settings.established_year | default: current_year | plus: 0 %}
{% assign years_active = current_year | minus: established_year | plus: 1 %}
{% if years_active < 1 %}
{% assign years_active = 1 %}
{% endif %}
{% include internal-page-hero.html section_label=about.hero.section_label title=about.hero.title %}
<section class="internal-page-hero-image-frame">
  <img src="{{ about.hero.image | relative_url }}" alt="{{ about.hero.image_alt }}">
  <div class="internal-page-hero-image-overlay-layer"></div>
</section>
<section class="page-section-standard-spacing">
  <div class="page-content-width-constrained-container long-form-rich-text-content">
    <p class="intro-lead-text-block">{{ about.lead }}</p>

    {% for section_item in about.sections %}
      <h2>{{ section_item.title | upcase }}</h2>
      {% for paragraph in section_item.paragraphs %}
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
<section class="page-section-standard-spacing-with-divider-and-surface-background">
  <div class="page-content-width-constrained-container summary-statistics-grid">
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
<section class="newsletter-signup-area">
  <div class="newsletter-background-ring-layer" aria-hidden="true">
    <span></span>
    <span></span>
  </div>
  <div class="page-content-width-constrained-container newsletter-content-block">
    <p class="page-section-kicker-text">{{ newsletter.section_label }}</p>
    <h2 class="page-section-title-text">{{ newsletter.title | upcase }}</h2>
    <p>{{ newsletter.description }}</p>
    <form class="newsletter-signup-form">
      <label class="accessibility-visually-hidden-text" for="about-newsletter-email">Email address</label>
      <input id="about-newsletter-email" type="email" placeholder="{{ newsletter.placeholder }}" required>
      <button type="submit">{{ newsletter.button_label }}</button>
    </form>
    <p class="newsletter-signup-note-text">{{ newsletter.note }}</p>
  </div>
</section>
