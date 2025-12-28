---
layout: default
title: News
description: News updates.
hero_kicker: Updates
---

<section class="internal-page-hero-section">
  <div class="page-content-width-constrained-container">
    <p class="internal-page-hero-kicker-text">{{ page.hero_kicker }}</p>
    <h1 class="internal-page-hero-title-text">{{ page.title | upcase }}</h1>
  </div>
</section>
<section class="page-section-compact-spacing">
  <div class="page-content-width-constrained-container">
    <div class="news-summary-card-grid news-summary-card-grid--full">
      {% for item in site.data.news.items %}
        <a class="news-summary-card-link" href="{{ item.url | default: '/news/' | relative_url }}">
          <div class="news-summary-card-media-frame">
            <img src="{{ item.image | relative_url }}" alt="{{ item.image_alt | default: item.title }}">
          </div>
          <p class="news-summary-card-date-text">{{ item.date }}</p>
          <h2>{{ item.title }}</h2>
          <p class="news-summary-card-excerpt-text">{{ item.excerpt }}</p>
        </a>
      {% endfor %}
    </div>
  </div>
</section>
