---
layout: default
title: Shop
description: Shop catalog.
---

<section class="page-hero">
  <div class="site-container">
    <p class="page-hero__kicker">Store</p>
    <h1 class="page-hero__title">SHOP</h1>
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

<section class="section section--compact">
  <div class="site-container">
    <div class="product-grid">
      <a class="product-card" href="{{ '/shop/' | relative_url }}">
        <div class="product-card__media">
          <img src="{{ '/assets/images/dark-album-cover-abstract-art.jpg' | relative_url }}" alt="Lorem Ipsum Vol. I">
          <span class="product-card__badge">Vinyl LP</span>
        </div>
        <h3>Lorem Ipsum Vol. I</h3>
        <p class="product-card__artist">Artist Name</p>
        <p class="product-card__price">EUR 24.99</p>
      </a>
      <a class="product-card" href="{{ '/shop/' | relative_url }}">
        <div class="product-card__media">
          <img src="{{ '/assets/images/dark-vinyl-record-cover-design.jpg' | relative_url }}" alt="Dolor Sit Amet">
          <span class="product-card__badge">Vinyl LP</span>
        </div>
        <h3>Dolor Sit Amet</h3>
        <p class="product-card__artist">Another Artist</p>
        <p class="product-card__price">EUR 22.99</p>
      </a>
      <a class="product-card" href="{{ '/shop/' | relative_url }}">
        <div class="product-card__media">
          <img src="{{ '/assets/images/post-metal-album-artwork-dark.jpg' | relative_url }}" alt="Consectetur">
          <span class="product-card__badge">CD</span>
        </div>
        <h3>Consectetur</h3>
        <p class="product-card__artist">Third Artist</p>
        <p class="product-card__price">EUR 12.99</p>
      </a>
      <a class="product-card" href="{{ '/shop/' | relative_url }}">
        <div class="product-card__media">
          <img src="{{ '/assets/images/placeholder.svg' | relative_url }}" alt="Adipiscing Elite">
          <span class="product-card__badge">Vinyl LP</span>
        </div>
        <h3>Adipiscing Elite</h3>
        <p class="product-card__artist">Fourth Artist</p>
        <p class="product-card__price">EUR 26.99</p>
      </a>
      <a class="product-card" href="{{ '/shop/' | relative_url }}">
        <div class="product-card__media">
          <img src="{{ '/assets/images/placeholder.svg' | relative_url }}" alt="Tempor Incididunt">
          <span class="product-card__badge">CD</span>
        </div>
        <h3>Tempor Incididunt</h3>
        <p class="product-card__artist">Fifth Artist</p>
        <p class="product-card__price">EUR 11.99</p>
      </a>
      <a class="product-card" href="{{ '/shop/' | relative_url }}">
        <div class="product-card__media">
          <img src="{{ '/assets/images/placeholder.svg' | relative_url }}" alt="Labore Et Dolore">
          <span class="product-card__badge">Vinyl 2xLP</span>
        </div>
        <h3>Labore Et Dolore</h3>
        <p class="product-card__artist">Sixth Artist</p>
        <p class="product-card__price">EUR 28.99</p>
      </a>
      <a class="product-card" href="{{ '/shop/' | relative_url }}">
        <div class="product-card__media">
          <img src="{{ '/assets/images/placeholder.svg' | relative_url }}" alt="BlackBox Logo Tee">
          <span class="product-card__badge">T-Shirt</span>
        </div>
        <h3>BlackBox Logo Tee</h3>
        <p class="product-card__artist">Merch</p>
        <p class="product-card__price">EUR 29.99</p>
      </a>
      <a class="product-card" href="{{ '/shop/' | relative_url }}">
        <div class="product-card__media">
          <img src="{{ '/assets/images/placeholder.svg' | relative_url }}" alt="Void Hoodie">
          <span class="product-card__badge">Hoodie</span>
        </div>
        <h3>Void Hoodie</h3>
        <p class="product-card__artist">Merch</p>
        <p class="product-card__price">EUR 54.99</p>
      </a>
    </div>
  </div>
</section>
