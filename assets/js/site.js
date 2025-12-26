const HEADER_SELECTOR = '[data-header]'
const NAV_TOGGLE_SELECTOR = '[data-nav-toggle]'
const MOBILE_NAV_SELECTOR = '[data-mobile-nav]'
const ARTIST_GRID_SELECTOR = '[data-artist-grid]'
const ARTISTS_DATA_ELEMENT_ID = 'home-artists-data'
const DEFAULT_ARTIST_LIMIT = 5

initializeHeaderNavigation()
initializeHomeArtistShowcase()

function initializeHeaderNavigation() {
  const headerElement = findHeaderElement()
  if (!headerElement) return
  initializeHeaderNavigationElements(headerElement)
}

function initializeHeaderNavigationElements(headerElement) {
  const navToggleButton = findHeaderToggleButton(headerElement)
  const mobileNavContainer = findMobileNavContainer(headerElement)
  if (!navToggleButton || !mobileNavContainer) return
  connectHeaderInteractions(headerElement, navToggleButton, mobileNavContainer)
}

function connectHeaderInteractions(headerElement, navToggleButton, mobileNavContainer) {
  connectNavigationToggle(headerElement, navToggleButton)
  connectNavigationAutoClose(headerElement, navToggleButton, mobileNavContainer)
}

function connectNavigationToggle(headerElement, navToggleButton) {
  navToggleButton.addEventListener('click', () => {
    const isNavigationOpen = headerElement.classList.contains('is-open')
    setNavigationState(headerElement, navToggleButton, !isNavigationOpen)
  })
}

function connectNavigationAutoClose(headerElement, navToggleButton, mobileNavContainer) {
  mobileNavContainer.querySelectorAll('a').forEach((linkElement) => {
    linkElement.addEventListener('click', () => setNavigationState(headerElement, navToggleButton, false))
  })
}

function setNavigationState(headerElement, navToggleButton, isOpen) {
  navToggleButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false')
  headerElement.classList.toggle('is-open', isOpen)
}

function findHeaderElement() {
  return document.querySelector(HEADER_SELECTOR)
}

function findHeaderToggleButton(headerElement) {
  return headerElement.querySelector(NAV_TOGGLE_SELECTOR)
}

function findMobileNavContainer(headerElement) {
  return headerElement.querySelector(MOBILE_NAV_SELECTOR)
}

function findArtistGridElement() {
  return document.querySelector(ARTIST_GRID_SELECTOR)
}

function findArtistsDataElement() {
  return document.getElementById(ARTISTS_DATA_ELEMENT_ID)
}

function initializeHomeArtistShowcase() {
  const artistGridElement = findArtistGridElement()
  const artistsDataElement = findArtistsDataElement()
  if (!artistGridElement || !artistsDataElement) return
  renderRandomArtistsFromData(artistGridElement, artistsDataElement)
}

function renderRandomArtistsFromData(artistGridElement, artistsDataElement) {
  const artistItems = parseArtistsFromDataElement(artistsDataElement)
  if (artistItems.length === 0) return
  const selectedArtists = selectRandomArtists(artistItems, readArtistSelectionLimit(artistGridElement))
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

function readArtistSelectionLimit(artistGridElement) {
  const rawLimit = Number.parseInt(artistGridElement.dataset.max || '', 10)
  return Number.isNaN(rawLimit) ? DEFAULT_ARTIST_LIMIT : Math.max(1, rawLimit)
}

function readBaseUrl(artistGridElement) {
  return (artistGridElement.dataset.baseurl || '').replace(/\/$/, '')
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
  const children = [createArtistImage(artist, baseUrl), createArtistOverlay(), createArtistContent(artist), createArtistBio(artist)]
  return children.filter(Boolean)
}

function createArtistCardAnchor(artist, baseUrl) {
  const cardElement = document.createElement('a')
  cardElement.className = 'artist-card'
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
  overlayElement.className = 'artist-card__overlay'
  return overlayElement
}

function createArtistContent(artist) {
  const contentElement = document.createElement('div')
  contentElement.className = 'artist-card__content'
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
  bioElement.className = 'artist-card__bio'
  bioElement.textContent = artist.bio
  return bioElement
}

function normalizeUrl(path, baseUrl) {
  if (!path) return baseUrl || '/'
  if (/^https?:\/\//i.test(path)) return path
  if (!baseUrl) return path
  return path.startsWith('/') ? `${baseUrl}${path}` : `${baseUrl}/${path}`
}
