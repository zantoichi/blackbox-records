const HEADER_ELEMENT_SELECTOR = '[data-header]'
const HEADER_NAV_TOGGLE_SELECTOR = '[data-nav-toggle]'
const MOBILE_NAV_PANEL_SELECTOR = '[data-mobile-nav]'
const FEATURED_ARTIST_GRID_SELECTOR = '[data-featured-artist-grid]'
const FEATURED_ARTISTS_DATA_ELEMENT_ID = 'homepage-featured-artists-data'
const DEFAULT_FEATURED_ARTIST_LIMIT = 5
const NAVIGATION_OPEN_STATE_CLASS_NAME = 'is-site-navigation-open'
const LISTEN_MODAL_SELECTOR = '[data-listen-modal]'
const LISTEN_MODAL_CLOSE_SELECTOR = '[data-listen-close]'
const LISTEN_MODAL_IFRAME_SELECTOR = '[data-listen-iframe]'
const LISTEN_MODAL_PANEL_SELECTOR = '[data-listen-panel]'
const LISTEN_SWITCHER_SELECTOR = '[data-listen-switcher]'
const LISTEN_PROVIDER_BUTTON_SELECTOR = '[data-listen-provider]'
const LISTEN_CARD_SELECTOR = '[data-listen-card]'
const LISTEN_TRIGGER_SELECTOR = '[data-listen-trigger]'
const LISTEN_MODAL_OPEN_STATE_CLASS_NAME = 'is-listen-modal-open'
const LISTEN_PROVIDER_PRIORITY = ['bandcamp', 'tidal']
const listenProviderSelectionByTitle = new Map()

initializeHeaderNavigation()
initializeHomepageFeaturedArtistShowcase()
initializeListenSwitchers()
initializeListenModal()

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

function findListenModalElement() {
  return document.querySelector(LISTEN_MODAL_SELECTOR)
}

function findListenCardElements() {
  return Array.from(document.querySelectorAll(LISTEN_CARD_SELECTOR))
}

function findListenPanels() {
  return Array.from(document.querySelectorAll(LISTEN_MODAL_PANEL_SELECTOR))
}

function findListenIframe(containerElement) {
  return containerElement.querySelector(LISTEN_MODAL_IFRAME_SELECTOR)
}

function findListenCloseButton(modalElement) {
  return modalElement.querySelector(LISTEN_MODAL_CLOSE_SELECTOR)
}

function findListenTitleElement(modalElement) {
  return modalElement.querySelector('#listen-modal-title')
}

function findListenSwitcher(containerElement) {
  return containerElement.querySelector(LISTEN_SWITCHER_SELECTOR)
}

function findListenProviderButtons(containerElement) {
  return Array.from(containerElement.querySelectorAll(LISTEN_PROVIDER_BUTTON_SELECTOR))
}


function readListenTitleFromElement(element) {
  return element.dataset.listenTitle || ''
}

function readListenProvidersFromElement(element) {
  const providers = [
    {
      id: 'bandcamp',
      label: 'Bandcamp',
      embedUrl: element.dataset.listenBandcampEmbedUrl,
    },
    {
      id: 'tidal',
      label: 'Tidal',
      embedUrl: element.dataset.listenTidalEmbedUrl,
    },
  ]
  return providers.filter((provider) => Boolean(provider.embedUrl))
}

function selectDefaultListenProvider(providers) {
  const providerById = new Map(providers.map((provider) => [provider.id, provider]))
  const preferredProviderId = LISTEN_PROVIDER_PRIORITY.find((id) => providerById.has(id))
  return preferredProviderId ? providerById.get(preferredProviderId) : providers[0]
}

function initializeListenSwitchers() {
  findListenPanels().forEach((containerElement) => {
    connectListenProviderButtons(containerElement)
    refreshListenPanel(containerElement)
  })
}

function initializeHomepageFeaturedArtistShowcase() {
  const artistGridElement = findFeaturedArtistGridElement()
  const artistsDataElement = findFeaturedArtistsDataElement()
  if (!artistGridElement || !artistsDataElement) return
  renderRandomArtistsFromData(artistGridElement, artistsDataElement)
}

function initializeListenModal() {
  const modalElement = findListenModalElement()
  if (!modalElement) return
  const listenCardElements = findListenCardElements()
  if (listenCardElements.length === 0) return
  const modalState = buildListenModalState(modalElement)
  if (!modalState) return
  connectListenTriggers(listenCardElements, modalState)
  connectListenModalCloseInteractions(modalState)
}

function buildListenModalState(modalElement) {
  const containerElement = modalElement.querySelector(LISTEN_MODAL_PANEL_SELECTOR)
  const iframeElement = findListenIframe(modalElement)
  const closeButton = findListenCloseButton(modalElement)
  const titleElement = findListenTitleElement(modalElement)
  if (!iframeElement || !closeButton || !containerElement) return null
  return {
    modalElement,
    containerElement,
    iframeElement,
    closeButton,
    titleElement,
  }
}

function connectListenTriggers(listenCardElements, modalState) {
  listenCardElements.forEach((listenCardElement) => {
    listenCardElement.addEventListener('click', (event) => {
      if (!event.target.closest(LISTEN_TRIGGER_SELECTOR)) return
      const providers = readListenProvidersFromElement(listenCardElement)
      if (providers.length === 0) return
      event.preventDefault()
      openListenModal(modalState, providers, readListenTitleFromElement(listenCardElement))
    })
  })
}

function connectListenModalCloseInteractions(modalState) {
  modalState.closeButton.addEventListener('click', () => closeListenModal(modalState))
  modalState.modalElement.addEventListener('click', (event) => {
    if (event.target === modalState.modalElement) {
      closeListenModal(modalState)
    }
  })
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return
    if (modalState.modalElement.hidden) return
    closeListenModal(modalState)
  })
}

function openListenModal(modalState, providers, releaseTitle) {
  const currentTitle = modalState.containerElement.dataset.listenCurrentTitle || ''
  const isSameRelease = releaseTitle && currentTitle === releaseTitle
  setListenPanelProviderData(modalState.containerElement, providers, releaseTitle)
  refreshListenPanel(modalState.containerElement, releaseTitle, !isSameRelease)
  if (releaseTitle) {
    modalState.containerElement.dataset.listenCurrentTitle = releaseTitle
  }
  if (modalState.titleElement) {
    modalState.titleElement.textContent = releaseTitle || ''
  }
  modalState.modalElement.hidden = false
  document.body.classList.add(LISTEN_MODAL_OPEN_STATE_CLASS_NAME)
}

function closeListenModal(modalState) {
  modalState.modalElement.hidden = true
  if (modalState.titleElement) {
    modalState.titleElement.textContent = ''
  }
  document.body.classList.remove(LISTEN_MODAL_OPEN_STATE_CLASS_NAME)
}

function setListenPanelProviderData(containerElement, providers, releaseTitle) {
  delete containerElement.dataset.listenBandcampEmbedUrl
  delete containerElement.dataset.listenTidalEmbedUrl
  providers.forEach((provider) => {
    if (provider.id === 'bandcamp') {
      containerElement.dataset.listenBandcampEmbedUrl = provider.embedUrl
    }
    if (provider.id === 'tidal') {
      containerElement.dataset.listenTidalEmbedUrl = provider.embedUrl
    }
  })
  if (releaseTitle) {
    containerElement.dataset.listenTitle = releaseTitle
  }
}

function refreshListenPanel(containerElement, releaseTitle, forceInitialize = false) {
  const providers = readListenProvidersFromElement(containerElement)
  updateListenSwitcher(containerElement, providers)
  if (providers.length === 0) return
  if (releaseTitle) {
    updateListenTitle(containerElement, releaseTitle)
  }
  if (forceInitialize || !containerElement.dataset.listenInitialized) {
    const cachedProviderId = readCachedListenProviderId(containerElement)
    const cachedProvider = providers.find((provider) => provider.id === cachedProviderId)
    applyListenProvider(containerElement, cachedProvider || selectDefaultListenProvider(providers))
    containerElement.dataset.listenInitialized = 'true'
  }
}

function updateListenSwitcher(containerElement, providers) {
  const switcher = findListenSwitcher(containerElement)
  const buttons = findListenProviderButtons(containerElement)
  if (!switcher) return
  const providerIds = providers.map((provider) => provider.id)
  switcher.hidden = providers.length === 0
  buttons.forEach((button) => {
    const providerId = button.dataset.listenProvider
    button.hidden = !providerIds.includes(providerId)
  })
}

function connectListenProviderButtons(containerElement) {
  const buttons = findListenProviderButtons(containerElement)
  if (buttons.length === 0) return
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const providers = readListenProvidersFromElement(containerElement)
      const provider = providers.find((item) => item.id === button.dataset.listenProvider)
      if (!provider) return
      applyListenProvider(containerElement, provider)
    })
  })
}

function applyListenProvider(containerElement, provider) {
  const iframeElement = findListenIframe(containerElement)
  const buttons = findListenProviderButtons(containerElement)
  containerElement.dataset.listenActiveProvider = provider.id
  storeCachedListenProvider(containerElement, provider.id)
  if (iframeElement) {
    if (iframeElement.src !== provider.embedUrl) {
      iframeElement.src = provider.embedUrl
    }
    const releaseTitle = readListenTitleFromElement(containerElement)
    iframeElement.title = releaseTitle ? `${releaseTitle} player` : 'Listen player'
  }
  buttons.forEach((button) => {
    const isActive = button.dataset.listenProvider === provider.id
    button.classList.toggle('is-listen-provider-active', isActive)
  })
}

function updateListenTitle(containerElement, releaseTitle) {
  const titleElement = containerElement.querySelector('.listen-modal-title-text')
  if (titleElement) {
    titleElement.textContent = releaseTitle || ''
  }
}

function readCachedListenProviderId(containerElement) {
  const releaseTitle = readListenTitleFromElement(containerElement)
  if (!releaseTitle) return ''
  return listenProviderSelectionByTitle.get(releaseTitle) || ''
}

function storeCachedListenProvider(containerElement, providerId) {
  const releaseTitle = readListenTitleFromElement(containerElement)
  if (!releaseTitle) return
  listenProviderSelectionByTitle.set(releaseTitle, providerId)
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
  cardElement.href = normalizeUrl(resolveArtistProfilePath(artist), baseUrl)
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

function resolveArtistProfilePath(artist) {
  if (artist.url) return artist.url
  if (artist.slug) return `/artists/${artist.slug}/`
  return '/artists/'
}

