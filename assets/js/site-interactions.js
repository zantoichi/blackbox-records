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
const RELEASE_PLAYER_CONTAINER_SELECTOR = '[data-release-player-container]'
const RELEASE_PLAYER_SWITCHER_SELECTOR = '[data-release-player-switcher]'
const RELEASE_PLAYER_PROVIDER_BUTTON_SELECTOR = '[data-release-player-provider]'
const RELEASE_PLAYER_EXTERNAL_LINK_SELECTOR = '[data-release-player-external-link]'
const RELEASE_PLAYER_CARD_SELECTOR = '[data-release-player-card]'
const RELEASE_PLAYER_TRIGGER_SELECTOR = '[data-release-player-trigger]'
const RELEASE_PLAYER_MODAL_OPEN_STATE_CLASS_NAME = 'is-release-player-modal-open'
const RELEASE_PLAYER_PROVIDER_PRIORITY = ['bandcamp', 'tidal']
const releasePlayerSelectionByTitle = new Map()

initializeHeaderNavigation()
initializeHomepageFeaturedArtistShowcase()
initializeReleasePlayerSwitchers()
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

function findReleasePlayerContainers() {
  return Array.from(document.querySelectorAll(RELEASE_PLAYER_CONTAINER_SELECTOR))
}

function findReleasePlayerIframe(containerElement) {
  return containerElement.querySelector(RELEASE_PLAYER_IFRAME_SELECTOR)
}

function findReleasePlayerCloseButton(modalElement) {
  return modalElement.querySelector(RELEASE_PLAYER_CLOSE_SELECTOR)
}

function findReleasePlayerTitleElement(modalElement) {
  return modalElement.querySelector('#release-player-modal-title')
}

function findReleasePlayerSwitcher(containerElement) {
  return containerElement.querySelector(RELEASE_PLAYER_SWITCHER_SELECTOR)
}

function findReleasePlayerProviderButtons(containerElement) {
  return Array.from(containerElement.querySelectorAll(RELEASE_PLAYER_PROVIDER_BUTTON_SELECTOR))
}

function findReleasePlayerExternalLink(containerElement) {
  return containerElement.querySelector(RELEASE_PLAYER_EXTERNAL_LINK_SELECTOR)
}

function readReleasePlayerTitleFromElement(element) {
  return element.dataset.releasePlayerTitle || ''
}

function readReleasePlayerProvidersFromElement(element) {
  const providers = [
    {
      id: 'bandcamp',
      label: 'Bandcamp',
      embedUrl: element.dataset.releasePlayerBandcampEmbedUrl,
      externalUrl: element.dataset.releasePlayerBandcampUrl,
    },
    {
      id: 'tidal',
      label: 'Tidal',
      embedUrl: element.dataset.releasePlayerTidalEmbedUrl,
      externalUrl: element.dataset.releasePlayerTidalUrl,
    },
  ]
  return providers.filter((provider) => Boolean(provider.embedUrl))
}

function selectDefaultReleasePlayerProvider(providers) {
  const providerById = new Map(providers.map((provider) => [provider.id, provider]))
  const preferredProviderId = RELEASE_PLAYER_PROVIDER_PRIORITY.find((id) => providerById.has(id))
  return preferredProviderId ? providerById.get(preferredProviderId) : providers[0]
}

function initializeReleasePlayerSwitchers() {
  findReleasePlayerContainers().forEach((containerElement) => {
    connectReleasePlayerProviderButtons(containerElement)
    refreshReleasePlayerContainer(containerElement)
  })
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
  const containerElement = modalElement.querySelector(RELEASE_PLAYER_CONTAINER_SELECTOR)
  const iframeElement = findReleasePlayerIframe(modalElement)
  const closeButton = findReleasePlayerCloseButton(modalElement)
  const titleElement = findReleasePlayerTitleElement(modalElement)
  if (!iframeElement || !closeButton || !containerElement) return null
  return {
    modalElement,
    containerElement,
    iframeElement,
    closeButton,
    titleElement,
  }
}

function connectReleasePlayerTriggers(releaseElements, modalState) {
  releaseElements.forEach((releaseElement) => {
    releaseElement.addEventListener('click', (event) => {
      if (!event.target.closest(RELEASE_PLAYER_TRIGGER_SELECTOR)) return
      const providers = readReleasePlayerProvidersFromElement(releaseElement)
      if (providers.length === 0) return
      event.preventDefault()
      openReleasePlayerModal(modalState, providers, readReleasePlayerTitleFromElement(releaseElement))
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

function openReleasePlayerModal(modalState, providers, releaseTitle) {
  const currentReleaseTitle = modalState.containerElement.dataset.releasePlayerCurrentReleaseTitle || ''
  const isSameRelease = releaseTitle && currentReleaseTitle === releaseTitle
  setReleasePlayerContainerProviderData(modalState.containerElement, providers, releaseTitle)
  refreshReleasePlayerContainer(modalState.containerElement, releaseTitle, !isSameRelease)
  if (releaseTitle) {
    modalState.containerElement.dataset.releasePlayerCurrentReleaseTitle = releaseTitle
  }
  if (modalState.titleElement) {
    modalState.titleElement.textContent = releaseTitle || ''
  }
  modalState.modalElement.hidden = false
  document.body.classList.add(RELEASE_PLAYER_MODAL_OPEN_STATE_CLASS_NAME)
}

function closeReleasePlayerModal(modalState) {
  modalState.modalElement.hidden = true
  if (modalState.titleElement) {
    modalState.titleElement.textContent = ''
  }
  document.body.classList.remove(RELEASE_PLAYER_MODAL_OPEN_STATE_CLASS_NAME)
}

function setReleasePlayerContainerProviderData(containerElement, providers, releaseTitle) {
  delete containerElement.dataset.releasePlayerBandcampEmbedUrl
  delete containerElement.dataset.releasePlayerBandcampUrl
  delete containerElement.dataset.releasePlayerTidalEmbedUrl
  delete containerElement.dataset.releasePlayerTidalUrl
  providers.forEach((provider) => {
    if (provider.id === 'bandcamp') {
      containerElement.dataset.releasePlayerBandcampEmbedUrl = provider.embedUrl
      if (provider.externalUrl) {
        containerElement.dataset.releasePlayerBandcampUrl = provider.externalUrl
      }
    }
    if (provider.id === 'tidal') {
      containerElement.dataset.releasePlayerTidalEmbedUrl = provider.embedUrl
      if (provider.externalUrl) {
        containerElement.dataset.releasePlayerTidalUrl = provider.externalUrl
      }
    }
  })
  if (releaseTitle) {
    containerElement.dataset.releasePlayerTitle = releaseTitle
  }
}

function refreshReleasePlayerContainer(containerElement, releaseTitle, forceInitialize = false) {
  const providers = readReleasePlayerProvidersFromElement(containerElement)
  updateReleasePlayerSwitcher(containerElement, providers)
  if (providers.length === 0) return
  if (releaseTitle) {
    updateReleasePlayerTitle(containerElement, releaseTitle)
  }
  if (forceInitialize || !containerElement.dataset.releasePlayerInitialized) {
    const cachedProviderId = readCachedReleasePlayerProviderId(containerElement)
    const cachedProvider = providers.find((provider) => provider.id === cachedProviderId)
    applyReleasePlayerProvider(containerElement, cachedProvider || selectDefaultReleasePlayerProvider(providers))
    containerElement.dataset.releasePlayerInitialized = 'true'
  }
}

function updateReleasePlayerSwitcher(containerElement, providers) {
  const switcher = findReleasePlayerSwitcher(containerElement)
  const buttons = findReleasePlayerProviderButtons(containerElement)
  if (!switcher) return
  const providerIds = providers.map((provider) => provider.id)
  switcher.hidden = providers.length === 0
  buttons.forEach((button) => {
    const providerId = button.dataset.releasePlayerProvider
    button.hidden = !providerIds.includes(providerId)
  })
}

function connectReleasePlayerProviderButtons(containerElement) {
  const buttons = findReleasePlayerProviderButtons(containerElement)
  if (buttons.length === 0) return
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const providers = readReleasePlayerProvidersFromElement(containerElement)
      const provider = providers.find((item) => item.id === button.dataset.releasePlayerProvider)
      if (!provider) return
      applyReleasePlayerProvider(containerElement, provider)
    })
  })
}

function applyReleasePlayerProvider(containerElement, provider) {
  const iframeElement = findReleasePlayerIframe(containerElement)
  const buttons = findReleasePlayerProviderButtons(containerElement)
  const externalLink = findReleasePlayerExternalLink(containerElement)
  containerElement.dataset.releasePlayerActiveProvider = provider.id
  storeCachedReleasePlayerProvider(containerElement, provider.id)
  if (iframeElement) {
    if (iframeElement.src !== provider.embedUrl) {
      iframeElement.src = provider.embedUrl
    }
    const releaseTitle = readReleasePlayerTitleFromElement(containerElement)
    iframeElement.title = releaseTitle ? `${releaseTitle} player` : 'Release player'
  }
  buttons.forEach((button) => {
    const isActive = button.dataset.releasePlayerProvider === provider.id
    button.classList.toggle('is-release-player-provider-active', isActive)
  })
  if (externalLink) {
    if (provider.externalUrl) {
      externalLink.href = provider.externalUrl
      externalLink.textContent = `Open on ${provider.label}`
      externalLink.hidden = false
    } else {
      externalLink.hidden = true
    }
  }
}

function updateReleasePlayerTitle(containerElement, releaseTitle) {
  const titleElement = containerElement.querySelector('.release-player-modal-title-text')
  if (titleElement) {
    titleElement.textContent = releaseTitle || ''
  }
}

function readCachedReleasePlayerProviderId(containerElement) {
  const releaseTitle = readReleasePlayerTitleFromElement(containerElement)
  if (!releaseTitle) return ''
  return releasePlayerSelectionByTitle.get(releaseTitle) || ''
}

function storeCachedReleasePlayerProvider(containerElement, providerId) {
  const releaseTitle = readReleasePlayerTitleFromElement(containerElement)
  if (!releaseTitle) return
  releasePlayerSelectionByTitle.set(releaseTitle, providerId)
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
