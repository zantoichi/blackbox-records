---
layout: default
title: News
description: News updates.
section_label: Updates
---

{% include internal-page-hero.html section_label=page.section_label title=page.title %}
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
          <p class="news-summary-card-excerpt-text">{{ item.summary }}</p>
        </a>
      {% endfor %}
    </div>
  </div>
</section>
