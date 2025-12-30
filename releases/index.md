---
layout: default
title: Releases
description: Releases and label catalog.
section_label: Releases
---

{% assign releases = site.releases | sort: "release_date" | reverse %}
{% include internal-page-hero.html section_label=page.section_label title=page.title %}
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
