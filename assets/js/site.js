(() => {
  const header = document.querySelector('[data-header]')
  if (!header) return

  const toggle = header.querySelector('[data-nav-toggle]')
  const mobileNav = header.querySelector('[data-mobile-nav]')

  if (!toggle || !mobileNav) return

  const setExpanded = (isOpen) => {
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false')
    header.classList.toggle('is-open', isOpen)
  }

  toggle.addEventListener('click', () => {
    const isOpen = header.classList.contains('is-open')
    setExpanded(!isOpen)
  })

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      setExpanded(false)
    })
  })
})()
