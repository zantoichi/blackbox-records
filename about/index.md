---
layout: default
title: About
description: About the label.
---
{% assign about = site.data.about %}
{% assign newsletter = site.data.newsletter %}
{% assign artist_count = site.artists | size %}
{% assign release_count = site.releases | size %}
{% capture years_active_value %}{% include label-years-active.html %}{% endcapture %}
{% assign years_active = years_active_value | strip %}
{% capture country_count_value %}{% include label-country-count.html %}{% endcapture %}
{% assign country_count = country_count_value | strip %}
{% include internal-page-hero.html 
   section_label=about.hero.section_label 
   title=about.hero.title 
   image=about.hero.image 
   image_alt=about.hero.image_alt 
%}
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
{% include newsletter-signup.html form_id="about-newsletter-email" %}
