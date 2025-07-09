class Slider {
    constructor(sectionSelector, options = {}) {
        const section = typeof sectionSelector === 'string' ? document.querySelector(sectionSelector) : sectionSelector
        if (!section) throw new Error('Section not found')

        this.container = section.querySelector('.slider')
        this.slideList = this.container.querySelector('.slides')
        this.slides = Array.from(this.slideList.querySelectorAll('.slide'))
        this.slidesImg = Array.from(this.slideList.querySelectorAll('.slide img'))
        this.prevBtn = this.container.querySelector('.slider-nav-left button')
        this.nextBtn = this.container.querySelector('.slider-nav-right button')
        this.progress = this.container.querySelector('.slider-progress')
        this.paginations = Array.from(this.container.querySelectorAll('.slider-pagination'))
        this.paginationNumber = this.container.querySelector('.slider-pagination-number')
        this.currentIndex = 0
        this.options = options
        this.slidesToShow = options.slidesToShow || 1
        this.slidesNextCount = options.slidesNextCount || 1
        this.slidesToShowMobile = options.slidesToShowMobile || 1
        this.slidesNextCountMobile = options.slidesNextCountMobile || 1
        this.loop = options.loop || false
        this.zoom = options.zoom || false

        this.prevBtn?.addEventListener('click', () => this.prev())
        this.nextBtn?.addEventListener('click', () => this.next())
        this.bindPaginationEvents()
        this.slideList.addEventListener('scroll', this.onScroll.bind(this))

        this.updateButtons()
        this.updateProgress()
        this.updatePaginations()
        this.updatePaginationNumber()
        this.updateSlidesToShowByViewport()
        this.updateZoom()
        window.addEventListener('resize', this.updateSlidesToShowByViewport.bind(this))
    }

    scrollToItem(instant = true) {
        this.slides[this.currentIndex].scrollIntoView({
            behavior: instant ? "smooth" : "auto",
            inline: "start",
            block: "nearest",
        })
    }

    onScroll() {
        const scrollLeft = this.slideList.scrollLeft
        const slideWidth = this.slides[0].offsetWidth

        const index = Math.round(scrollLeft / slideWidth)

        if (index !== this.currentIndex) {
            this.currentIndex = index
            this.updateButtons()
            this.updateProgress()
            this.updatePaginations()
            this.updatePaginationNumber()
        }
    }

    updateButtons() {
        if (!this.loop) {
            if (this.prevBtn) {
                this.prevBtn.classList.toggle('disabled', this.currentIndex === 0)
            }
            if (this.nextBtn) {
                this.nextBtn.classList.toggle('disabled', this.currentIndex >= this.slides.length - this.slidesToShow)
            }
        }
    }

    updateProgress() {
        if (!this.progress) return
        const visibleEnd = this.currentIndex + this.slidesToShow
        const progress = Math.min(visibleEnd / this.slides.length, 1)
        const newWidth = (progress * 100) + "%"
        if (this.progress.style.width !== newWidth) {
            this.progress.style.width = newWidth
        }
    }

    bindPaginationEvents() {
        if (!this.paginations || this.paginations.length === 0) return
        this.paginations.forEach((pagination, index) => {
            pagination.addEventListener('click', () => {
                this.paginations.forEach(p => p.classList.toggle('active', p === pagination))
                this.goTo(index)
            })
        })
    }

    updatePaginations() {
        if (!this.paginations || this.paginations.length === 0) return

        this.paginations.forEach(p => p.classList.remove('active'))

        const activePagination = this.paginations[this.currentIndex]
        if (activePagination) {
            activePagination.classList.add('active')
        }
    }

    updatePaginationNumber() {
        if (!this.paginationNumber) return

        this.paginationNumber.textContent = `${this.currentIndex + 1} / ${this.slides.length}`
    }


    updateSlidesToShowByViewport() {
        const width = window.innerWidth

        if (width < 768) {
            this.slidesToShow = this.slidesToShowMobile
            this.slidesNextCount = this.slidesNextCountMobile
        } else {
            this.slidesToShow = this.options.slidesToShow || 1
            this.slidesNextCount = this.options.slidesNextCount || 1
        }

        const total = this.slides.length
        const maxStartIndex = Math.max(0, total - this.slidesToShow)
        if (this.currentIndex > maxStartIndex) {
            this.currentIndex = maxStartIndex
            this.scrollToItem()
        }

        this.updateButtons()
        this.updateProgress()
        this.updatePaginations()
        this.updatePaginationNumber()
    }

    updateZoom() {
        if (!this.zoom) return

        this.slidesImg.forEach((img, index) => {
            let isZoomed = false;

            img.addEventListener('click', (e) => {
                if (index !== this.currentIndex) return

                if (isZoomed) {

                    isZoomed = false
                    img.style.removeProperty('cursor')
                    img.style.removeProperty('object-fit')
                    img.style.removeProperty('object-position')
                } else {

                    isZoomed = true
                    img.style.cursor = 'zoom-out'
                    img.style.objectFit = 'cover'

                    const rect = img.getBoundingClientRect()
                    const offsetX = e.clientX - rect.left
                    const offsetY = e.clientY - rect.top
                    const percentX = (offsetX / rect.width) * 100
                    const percentY = (offsetY / rect.height) * 100
                    img.style.objectPosition = `${percentX}% ${percentY}%`
                }
            })

            img.addEventListener('mousemove', (e) => {
                if (!isZoomed || index !== this.currentIndex) return;

                const rect = img.getBoundingClientRect();
                const offsetX = e.clientX - rect.left;
                const offsetY = e.clientY - rect.top;
                const percentX = (offsetX / rect.width) * 100;
                const percentY = (offsetY / rect.height) * 100;

                img.style.objectPosition = `${percentX}% ${percentY}%`;
            });
        });


    }

    goTo(index, options = {}) {
        const animate = options.animate !== false

        const total = this.slides.length
        const maxStartIndex = Math.max(0, total - this.slidesToShow)

        if (this.loop) {
            this.currentIndex = (index + total) % total
        } else {
            this.currentIndex = Math.max(0, Math.min(index, maxStartIndex))
        }

        this.scrollToItem(animate)
    }

    next() {
        this.goTo(this.currentIndex + this.slidesNextCount)
    }

    prev() {
        this.goTo(this.currentIndex - this.slidesNextCount)
    }
}

export default Slider