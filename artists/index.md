---
layout: default
title: Artists
description: Artists roster.
hero_kicker: Roster
---
<section class="page-hero">
  <div class="site-container">
    <p class="page-hero__kicker">{{ page.hero_kicker }}</p>
    <h1 class="page-hero__title">{{ page.title | upcase }}</h1>
  </div>
</section>
<section class="section section--compact">
  <div class="site-container">
    <div class="artist-grid artist-grid--full">
      {% for artist in site.data.artists.items %}
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
  </div>
</section>
