import Slider from './slider.js'
import Tab from './tab.js'



function StartCountDown() {
    const numberDays = document.getElementById('countdown-number-days')
    const numberHours = document.getElementById('countdown-number-hours')
    const numberMinutes = document.getElementById('countdown-number-minutes')
    const numberSeconds = document.getElementById('countdown-number-seconds')

    const now = new Date()
    const endDate = new Date(now.getTime() + (
        (34 * 24 * 60 * 60) +
        (1 * 60 * 60) +
        (15 * 60) +
        59
    ) * 1000)

    const updateCountDown = () => {
        const now = new Date().getTime()
        const distance = endDate - now

        if (distance < 0) {
            clearInterval(timer)
            return
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((distance / (1000 * 60)) % 60)
        const seconds = Math.floor((distance / 1000) % 60)

        updateDigits(numberDays, days)
        updateDigits(numberHours, hours)
        updateDigits(numberMinutes, minutes)
        updateDigits(numberSeconds, seconds)

    }

    function updateDigits(container, value) {
        const valueStr = String(value).padStart(2, '0')
        const digits = container.querySelectorAll('.typo-h3')
        if (digits.length === 2) {
            digits[0].textContent = valueStr[0]
            digits[1].textContent = valueStr[1]
        }
    }


    const timer = setInterval(updateCountDown, 1000)
    updateCountDown()
}

function LoadTabs() {
    const productFeaturedSection = document.querySelector('.product-featured')
    const productFeaturedTab = new Tab(productFeaturedSection)

    const questionsSection = document.querySelector('.questions')
    const questionsTab = new Tab(questionsSection)
}



function LoadSlider() {
    const bestellerSection = document.querySelector('.section.bestellers')
    const bestellerSlider = new Slider(bestellerSection, {
        slidesToShow: 4,
        slidesNextCount: 4,
        slidesToShowMobile: 1,
        slidesNextCountMobile: 1,
        loop: false
    })

    const productFeatureSection = document.querySelector('.section.product-featured')
    const productFeatureSlider = new Slider(productFeatureSection, {
        slidesToShow: 1,
        slidesNextCount: 1,
        slidesToShowMobile: 1,
        slidesNextCountMobile: 1,
        loop: false
    })


    const testimonialSection = document.querySelector('.section.testimonials')
    const testimonialSlider = new Slider(testimonialSection, {
        slidesToShow: 1,
        slidesNextCount: 1,
        slidesToShowMobile: 1,
        slidesNextCountMobile: 1,
        loop: true
    })

    LoadZoomImage(productFeatureSlider)
}

function LoadRatio() {
    const wrapper = document.querySelector('.ratio-wrapper')
    const control = document.querySelector('.ratio-control')
    const before = document.querySelector('.before-container')
    const after = document.querySelector('.after-container')
    UpdateClipPath(50)

    let isDragging = false

    control.addEventListener('mousedown', (e) => {
        isDragging = true
        document.body.style.userSelect = 'none'
    })

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return
        UpdatePostion(e)
    })

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false
            document.body.style.userSelect = ''
        }
    })


    function UpdatePostion(e) {
        const rect = wrapper.getBoundingClientRect()
        const currentX = e.clientX - rect.left

        let newLeft = (currentX / wrapper.offsetWidth) * 100
        newLeft = Math.max(0, Math.min(newLeft, 100))

        UpdateClipPath(newLeft)
    }

    function UpdateClipPath(left) {
        control.style.left = `${left}%`
        before.style.clipPath = `inset(0 ${100 - left}% 0 0)`
        after.style.clipPath = `inset(0 0 0 ${left}%)`
    }
}

function LoadVideo() {
    const wrapper = document.querySelector('.video-wrapper')
    const btnPlay = document.querySelector('.play-video')
    const btnClose = document.querySelector('.close-video')
    const video = document.querySelector('.video')

    btnPlay.addEventListener('click', () => {
        wrapper.classList.add('playing')
        video.play()
    })

    btnClose.addEventListener('click', () => {
        wrapper.classList.remove('playing')
    })
}

function LoadZoomImage(mainSlider) {
    const galleryHtml = `
        <div class="gallery-zoom">
            <div class="gallery-zoom-container slider">
                <div class="gallery-zoom-wrapper slides grid-box" style="transform-origin: 30px 517.453125px;">
                    <div class="slide"><img width="915px" height="915px" src="./assets/images/pr1-Photoroom.webp" alt=""></div>
                    <div class="slide"><img width="915px" height="915px" src="./assets/images/pr2-1.webp" alt=""></div>
                    <div class="slide"><img width="915px" height="915px" src="./assets/images/pr3-1.webp" alt=""></div>
                    <div class="slide"><img width="915px" height="915px" src="./assets/images/pr4_1e7da79f-1832-4f0c-b25f-c2f597556890.webp" alt="">
                    </div>
                </div>
                <div class="slider-controller">
                    <div class="slider-nav-left">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z">
                                </path>
                            </svg>
                        </button>
                    </div>
                    <div class="slider-pagination-wrapper">
                        <span class="slider-pagination-number">1 / 4</span>
                    </div>
                    <div class="slider-nav-right">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z">
                                </path>
                            </svg>
                        </button>
                    </div>
                    <button class="zoom-img">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748ZM10 10V7H12V10H15V12H12V15H10V12H7V10H10Z">
                            </path>
                        </svg>
                    </button>
                </div>
                <button class="gallery-zoom-close">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path
                            d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z">
                        </path>
                    </svg>
                </button>
            </div>
        </div>
    `
    const btnZoom = document.querySelector('.zoom-img')

    btnZoom.addEventListener('click', () => {
        const currentIndex = mainSlider.currentIndex

        document.body.insertAdjacentHTML('beforeend', galleryHtml)
        document.documentElement.classList.add('no-scroll')

        const gallery = document.querySelector('.gallery-zoom')
        const gallerySlider = new Slider(gallery, {
            slidesToShow: 1,
            slidesNextCount: 1,
            slidesToShowMobile: 1,
            slidesNextCountMobile: 1,
            loop: true,
            zoom: true
        })

        gallerySlider.goTo(currentIndex, { animate: false })

        const galleryContainer = document.querySelector('.gallery-zoom-container')
        setTimeout(() => {
            galleryContainer.classList.add('open')
        }, 1)

        const btnClose = galleryContainer.querySelector('.gallery-zoom-close')

        btnClose.addEventListener('click', () => {
            galleryContainer.classList.remove('open')

            setTimeout(() => {
                gallery.remove()
            }, 250)

            document.documentElement.classList.remove('no-scroll')

        })
    })

}

document.addEventListener("DOMContentLoaded", () => {

    LoadSlider()

    LoadTabs()

    LoadRatio()

    StartCountDown()

    LoadVideo()

})