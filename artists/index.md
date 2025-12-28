---
layout: default
title: Artists
description: Artists roster.
hero_kicker: Roster
---

<section class="internal-page-hero-section">
  <div class="page-content-width-constrained-container">
    <p class="internal-page-hero-kicker-text">{{ page.hero_kicker }}</p>
    <h1 class="internal-page-hero-title-text">{{ page.title | upcase }}</h1>
  </div>
</section>
<section class="page-section-compact-spacing">
  <div class="page-content-width-constrained-container">
    <div class="artist-roster-card-grid">
      {% for artist in site.data.artists.items %}
        <a class="artist-roster-card-link" href="{{ artist.url | default: '/artists/' | relative_url }}">
          <img src="{{ artist.image | relative_url }}" alt="{{ artist.image_alt | default: artist.name }}">
          <div class="artist-roster-card-overlay-layer"></div>
          <div class="artist-roster-card-text">
            <p>{{ artist.genre }}</p>
            <h3>{{ artist.name | upcase }} <span aria-hidden="true">&nearr;</span></h3>
          </div>
          <p class="artist-roster-card-bio-text">{{ artist.bio }}</p>
        </a>
      {% endfor %}
    </div>
  </div>
</section>
