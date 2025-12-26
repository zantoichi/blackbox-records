---
layout: default
title: News
description: News updates.
hero_kicker: Updates
---
<section class="page-hero">
  <div class="site-container">
    <p class="page-hero__kicker">{{ page.hero_kicker }}</p>
    <h1 class="page-hero__title">{{ page.title | upcase }}</h1>
  </div>
</section>
<section class="section section--compact">
  <div class="site-container">
    <div class="news-grid news-grid--full">
      {% for item in site.data.news.items %}
        <a class="news-card" href="{{ item.url | default: '/news/' | relative_url }}">
          <div class="news-card__media">
            <img src="{{ item.image | relative_url }}" alt="{{ item.image_alt | default: item.title }}">
          </div>
          <p class="news-card__date">{{ item.date }}</p>
          <h2>{{ item.title }}</h2>
          <p class="news-card__excerpt">{{ item.excerpt }}</p>
        </a>
      {% endfor %}
    </div>
  </div>
</section>
