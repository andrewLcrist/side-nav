
'use strict'

class SideNav {
  constructor() {
    this.hideButtonEl = document.querySelector('.js-menu-hide')
    this.showButtonEl = document.querySelector('.js-menu-show')
    this.sideNavContainerEl = document.querySelector('.js-side-nav-container')
    this.sideNaveEl = document.querySelector('.js-side-nav')

    this.hideSideNav = this.hideSideNav.bind(this)
    this.showSideNav = this.showSideNav.bind(this)

    this.blockClicks = this.blockClicks.bind(this)

    this.onTouchEnd = this.onTouchEnd.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onTransitionEnd = this.onTransitionEnd.bind(this)
    this.onTouchStart = this.onTouchStart.bind(this)

    this.startX = 0;
    this.currentX = 0;

    this.addEventListeners()
  }

  addEventListeners() {
    this.showButtonEl.addEventListener('click', this.showSideNav)
    this.hideButtonEl.addEventListener('click', this.hideSideNav)
    this.sideNaveEl.addEventListener('click', this.hideSideNav)
    this.sideNavContainerEl.addEventListener('click', this.blockClicks)

    document.addEventListener('touchstart', this.onTouchStart)
    document.addEventListener('touchmove', this.onTouchMove)
    document.addEventListener('touchend', this.onTouchEnd)
  }

  blockClicks(e) {
    e.stopPropagation()
  }

  hideSideNav() {
    this.sideNaveEl.classList.add('side-nav--animatable')
    this.sideNaveEl.classList.remove('side-nav--visible')
    this.sideNaveEl.addEventListener('transitionend', this.onTransitionEnd)
  }

  onTouchEnd() {
    const translateX = Math.min(0, this.currentX - this.startX)

    if(translateX < 0) {
      this.sideNavContainerEl.style.transform = ''
      this.hideSideNav();
    }
  }

  onTouchMove(e) {
    this.currentX = e.touches[0].pageX
    const translateX = Math.min(0, this.currentX - this.startX)

    if(translateX < 0) {
      e.preventDefault();
    }
    this.sideNavContainerEl.style.transform = `translateX(${translateX}px)`
  }

  onTouchStart(e) {
    if(this.sideNaveEl.classList.contains('side-nav--visible')) {
      return
    }

    this.startX = e.touches[0].pageX
    this.currentX = this.startX
  }

  onTransitionEnd(e) {
    this.sideNaveEl.classList.remove('side-nav--animatable')
    this.sideNaveEl.removeEventListener('transitionend', this.onTransitionEnd)
  }

  showSideNav() {
    this.sideNaveEl.classList.add('side-nav--animatable')
    this.sideNaveEl.classList.add('side-nav--visible')
    this.sideNaveEl.addEventListener('transitionend', this.onTransitionEnd)
  }
}

new SideNav()
