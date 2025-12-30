---
layout: default
title: Releases
description: Releases and label catalog.
hero_kicker: Releases
---

{% assign releases = site.releases | sort: "release_date" | reverse %}
<section class="internal-page-hero-section">
  <div class="page-content-width-constrained-container">
    <p class="internal-page-hero-kicker-text">{{ page.hero_kicker }}</p>
    <h1 class="internal-page-hero-title-text">{{ page.title | upcase }}</h1>
  </div>
</section>
<section class="page-section-compact-spacing">
  <div class="page-content-width-constrained-container">
    <div class="release-summary-card-grid">
      {% for release in releases %}
        {% assign release_artist = site.data.artists.items | where: "slug", release.artist_slug | first %}
        {% include release-card.html release=release artist=release_artist %}
      {% endfor %}
    </div>
  </div>
</section>
