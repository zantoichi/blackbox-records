const HEADER_ELEMENT_SELECTOR = '[data-header]'
const HEADER_NAV_TOGGLE_SELECTOR = '[data-nav-toggle]'
const MOBILE_NAV_PANEL_SELECTOR = '[data-mobile-nav]'
const FEATURED_ARTIST_GRID_SELECTOR = '[data-featured-artist-grid]'
const FEATURED_ARTISTS_DATA_ELEMENT_ID = 'homepage-featured-artists-data'
const DEFAULT_FEATURED_ARTIST_LIMIT = 5
const NAVIGATION_OPEN_STATE_CLASS_NAME = 'is-site-navigation-open'
const RELEASE_PLAYER_MODAL_SELECTOR = '[data-release-player-modal]'
const RELEASE_PLAYER_CLOSE_SELECTOR = '[data-release-player-close]'
const RELEASE_PLAYER_IFRAME_SELECTOR = '[data-release-player-iframe]'
const RELEASE_PLAYER_CARD_SELECTOR = '[data-release-player-embed-url]'
const RELEASE_PLAYER_TRIGGER_SELECTOR = '[data-release-player-trigger]'
const RELEASE_PLAYER_MODAL_OPEN_STATE_CLASS_NAME = 'is-release-player-modal-open'

initializeHeaderNavigation()
initializeHomepageFeaturedArtistShowcase()
initializeReleasePlayerModal()

function initializeHeaderNavigation() {
  const headerElement = findHeaderElement()
  if (!headerElement) return
  initializeHeaderNavigationElements(headerElement)
}

function initializeHeaderNavigationElements(headerElement) {
  const navToggleButton = findHeaderNavToggleButton(headerElement)
  const mobileNavPanel = findHeaderMobileNavPanel(headerElement)
  if (!navToggleButton || !mobileNavPanel) return
  connectHeaderInteractions(headerElement, navToggleButton, mobileNavPanel)
}

function connectHeaderInteractions(headerElement, navToggleButton, mobileNavPanel) {
  connectNavigationToggle(headerElement, navToggleButton)
  connectNavigationAutoClose(headerElement, navToggleButton, mobileNavPanel)
}

function connectNavigationToggle(headerElement, navToggleButton) {
  navToggleButton.addEventListener('click', () => {
    const isNavigationOpen = headerElement.classList.contains(NAVIGATION_OPEN_STATE_CLASS_NAME)
    setNavigationState(headerElement, navToggleButton, !isNavigationOpen)
  })
}

function connectNavigationAutoClose(headerElement, navToggleButton, mobileNavPanel) {
  mobileNavPanel.querySelectorAll('a').forEach((linkElement) => {
    linkElement.addEventListener('click', () => setNavigationState(headerElement, navToggleButton, false))
  })
}

function setNavigationState(headerElement, navToggleButton, isOpen) {
  navToggleButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false')
  headerElement.classList.toggle(NAVIGATION_OPEN_STATE_CLASS_NAME, isOpen)
}

function findHeaderElement() {
  return document.querySelector(HEADER_ELEMENT_SELECTOR)
}

function findHeaderNavToggleButton(headerElement) {
  return headerElement.querySelector(HEADER_NAV_TOGGLE_SELECTOR)
}

function findHeaderMobileNavPanel(headerElement) {
  return headerElement.querySelector(MOBILE_NAV_PANEL_SELECTOR)
}

function findFeaturedArtistGridElement() {
  return document.querySelector(FEATURED_ARTIST_GRID_SELECTOR)
}

function findFeaturedArtistsDataElement() {
  return document.getElementById(FEATURED_ARTISTS_DATA_ELEMENT_ID)
}

function findReleasePlayerModalElement() {
  return document.querySelector(RELEASE_PLAYER_MODAL_SELECTOR)
}

function findReleasePlayerCardElements() {
  return Array.from(document.querySelectorAll(RELEASE_PLAYER_CARD_SELECTOR))
}

function findReleasePlayerIframe(modalElement) {
  return modalElement.querySelector(RELEASE_PLAYER_IFRAME_SELECTOR)
}

function findReleasePlayerCloseButton(modalElement) {
  return modalElement.querySelector(RELEASE_PLAYER_CLOSE_SELECTOR)
}

function findReleasePlayerTitleElement(modalElement) {
  return modalElement.querySelector('#release-player-modal-title')
}

function readReleasePlayerEmbedUrl(releaseElement) {
  return releaseElement.dataset.releasePlayerEmbedUrl || ''
}

function readReleasePlayerTitle(releaseElement) {
  return releaseElement.dataset.releasePlayerTitle || ''
}

function initializeHomepageFeaturedArtistShowcase() {
  const artistGridElement = findFeaturedArtistGridElement()
  const artistsDataElement = findFeaturedArtistsDataElement()
  if (!artistGridElement || !artistsDataElement) return
  renderRandomArtistsFromData(artistGridElement, artistsDataElement)
}

function initializeReleasePlayerModal() {
  const modalElement = findReleasePlayerModalElement()
  if (!modalElement) return
  const releaseElements = findReleasePlayerCardElements()
  if (releaseElements.length === 0) return
  const modalState = buildReleasePlayerModalState(modalElement)
  if (!modalState) return
  connectReleasePlayerTriggers(releaseElements, modalState)
  connectReleasePlayerCloseInteractions(modalState)
}

function buildReleasePlayerModalState(modalElement) {
  const iframeElement = findReleasePlayerIframe(modalElement)
  const closeButton = findReleasePlayerCloseButton(modalElement)
  const titleElement = findReleasePlayerTitleElement(modalElement)
  if (!iframeElement || !closeButton) return null
  return {
    modalElement,
    iframeElement,
    closeButton,
    titleElement,
  }
}

function connectReleasePlayerTriggers(releaseElements, modalState) {
  releaseElements.forEach((releaseElement) => {
    releaseElement.addEventListener('click', (event) => {
      if (!event.target.closest(RELEASE_PLAYER_TRIGGER_SELECTOR)) return
      const embedUrl = readReleasePlayerEmbedUrl(releaseElement)
      if (!embedUrl) return
      event.preventDefault()
      openReleasePlayerModal(modalState, embedUrl, readReleasePlayerTitle(releaseElement))
    })
  })
}

function connectReleasePlayerCloseInteractions(modalState) {
  modalState.closeButton.addEventListener('click', () => closeReleasePlayerModal(modalState))
  modalState.modalElement.addEventListener('click', (event) => {
    if (event.target === modalState.modalElement) {
      closeReleasePlayerModal(modalState)
    }
  })
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return
    if (modalState.modalElement.hidden) return
    closeReleasePlayerModal(modalState)
  })
}

function openReleasePlayerModal(modalState, embedUrl, releaseTitle) {
  modalState.iframeElement.src = embedUrl
  if (modalState.titleElement) {
    modalState.titleElement.textContent = releaseTitle || ''
  }
  modalState.iframeElement.title = releaseTitle || 'Release player'
  modalState.modalElement.hidden = false
  document.body.classList.add(RELEASE_PLAYER_MODAL_OPEN_STATE_CLASS_NAME)
}

function closeReleasePlayerModal(modalState) {
  modalState.modalElement.hidden = true
  modalState.iframeElement.src = ''
  if (modalState.titleElement) {
    modalState.titleElement.textContent = ''
  }
  document.body.classList.remove(RELEASE_PLAYER_MODAL_OPEN_STATE_CLASS_NAME)
}

function renderRandomArtistsFromData(artistGridElement, artistsDataElement) {
  const artistItems = parseArtistsFromDataElement(artistsDataElement)
  if (artistItems.length === 0) return
  const selectedArtists = selectRandomArtists(artistItems, readFeaturedArtistSelectionLimit(artistGridElement))
  renderArtistCards(artistGridElement, selectedArtists, readBaseUrl(artistGridElement))
}

function parseArtistsFromDataElement(artistsDataElement) {
  try {
    return normalizeArtistsArray(JSON.parse(artistsDataElement.textContent || '[]'))
  } catch (error) {
    return []
  }
}

function normalizeArtistsArray(parsedArtists) {
  return Array.isArray(parsedArtists) ? parsedArtists : []
}

function readFeaturedArtistSelectionLimit(artistGridElement) {
  const rawLimit = Number.parseInt(artistGridElement.dataset.maxItems || '', 10)
  return Number.isNaN(rawLimit) ? DEFAULT_FEATURED_ARTIST_LIMIT : Math.max(1, rawLimit)
}

function readBaseUrl(artistGridElement) {
  return (artistGridElement.dataset.siteBaseUrl || '').replace(/\/$/, '')
}

function selectRandomArtists(artistItems, artistLimit) {
  const shuffledArtists = shuffleArtists(artistItems.slice())
  return shuffledArtists.slice(0, Math.min(artistLimit, shuffledArtists.length))
}

function shuffleArtists(artistsToShuffle) {
  return artistsToShuffle.sort(() => Math.random() - 0.5)
}

function renderArtistCards(artistGridElement, selectedArtists, baseUrl) {
  clearElementChildren(artistGridElement)
  selectedArtists.map((artist) => createArtistCard(artist, baseUrl)).forEach((card) => artistGridElement.appendChild(card))
}

function clearElementChildren(elementToClear) {
  elementToClear.innerHTML = ''
}

function createArtistCard(artist, baseUrl) {
  const cardElement = createArtistCardAnchor(artist, baseUrl)
  const cardChildren = buildArtistCardChildren(artist, baseUrl)
  cardChildren.forEach((child) => cardElement.appendChild(child))
  return cardElement
}

function buildArtistCardChildren(artist, baseUrl) {
  const children = [
    createArtistImage(artist, baseUrl),
    createArtistOverlay(),
    createArtistContent(artist),
    createArtistBio(artist),
  ]
  return children.filter(Boolean)
}

function createArtistCardAnchor(artist, baseUrl) {
  const cardElement = document.createElement('a')
  cardElement.className = 'artist-roster-card-link'
  cardElement.href = normalizeUrl(artist.url || '/artists/', baseUrl)
  return cardElement
}

function createArtistImage(artist, baseUrl) {
  const imageElement = document.createElement('img')
  imageElement.src = normalizeUrl(artist.image || '', baseUrl)
  imageElement.alt = artist.image_alt || artist.name || ''
  return imageElement
}

function createArtistOverlay() {
  const overlayElement = document.createElement('div')
  overlayElement.className = 'artist-roster-card-overlay-layer'
  return overlayElement
}

function createArtistContent(artist) {
  const contentElement = document.createElement('div')
  contentElement.className = 'artist-roster-card-text'
  appendOptionalGenre(contentElement, artist.genre)
  contentElement.appendChild(createArtistTitle(artist.name))
  return contentElement
}

function appendOptionalGenre(contentElement, genreLabel) {
  if (!genreLabel) return
  const genreElement = document.createElement('p')
  genreElement.textContent = genreLabel
  contentElement.appendChild(genreElement)
}

function createArtistTitle(artistName) {
  const titleElement = document.createElement('h3')
  titleElement.textContent = (artistName || '').toUpperCase()
  titleElement.append(' ', createArrowElement())
  return titleElement
}

function createArrowElement() {
  const arrowElement = document.createElement('span')
  arrowElement.setAttribute('aria-hidden', 'true')
  arrowElement.textContent = '\u2197'
  return arrowElement
}

function createArtistBio(artist) {
  if (!artist.bio) return null
  const bioElement = document.createElement('p')
  bioElement.className = 'artist-roster-card-bio-text'
  bioElement.textContent = artist.bio
  return bioElement
}

function normalizeUrl(path, baseUrl) {
  if (!path) return baseUrl || '/'
  if (/^https?:\/\//i.test(path)) return path
  if (!baseUrl) return path
  return path.startsWith('/') ? `${baseUrl}${path}` : `${baseUrl}/${path}`
}
