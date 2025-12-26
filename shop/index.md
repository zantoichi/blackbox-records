---
layout: default
title: Shop
description: Shop catalog.
hero_kicker: Store
---
<section class="page-hero">
  <div class="site-container">
    <p class="page-hero__kicker">{{ page.hero_kicker }}</p>
    <h1 class="page-hero__title">{{ page.title | upcase }}</h1>
  </div>
</section>
<section class="section section--tight section--border">
  <div class="site-container shop-filters">
    <button class="filter-button filter-button--active" type="button">All</button>
    <button class="filter-button" type="button">Vinyl</button>
    <button class="filter-button" type="button">CD</button>
    <button class="filter-button" type="button">Merch</button>
  </div>
</section>
<section class="section section--compact">
  <div class="site-container">
    <div class="shop-placeholder">
      <p>Shop powered by Payhip</p>
      <p class="shop-placeholder__note">[Payhip embed will be integrated here]</p>
      <div class="shop-placeholder__frame">
        <span>Payhip Store Embed</span>
      </div>
    </div>
  </div>
</section>
