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
      {% assign news_items = site.news | sort: "date" | reverse %}
      {% for item in news_items %}
        {% include news-card.html item=item %}
      {% endfor %}
    </div>
  </div>
</section>
