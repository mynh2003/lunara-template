import Slider from './slider.js'
import Tab from './tab.js'



function StartCountDown() {
    const numberDays = document.getElementById('countdown-number-days')
    const numberHours = document.getElementById('countdown-number-hours')
    const numberMinutes = document.getElementById('countdown-number-minutes')
    const numberSeconds = document.getElementById('countdown-number-seconds')

    const now = new Date();
    const endDate = new Date(now.getTime() + (
        (34 * 24 * 60 * 60) +
        (1 * 60 * 60) +
        (15 * 60) +
        59
    ) * 1000);

    const updateCountDown = () => {
        const now = new Date().getTime();
        const distance = endDate - now;

        if (distance < 0) {
            clearInterval(timer);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);
        const seconds = Math.floor((distance / 1000) % 60);

        updateDigits(numberDays, days);
        updateDigits(numberHours, hours);
        updateDigits(numberMinutes, minutes);
        updateDigits(numberSeconds, seconds);

    }

    function updateDigits(container, value) {
        const valueStr = String(value).padStart(2, '0');
        const digits = container.querySelectorAll('.number');
        if (digits.length === 2) {
            digits[0].textContent = valueStr[0];
            digits[1].textContent = valueStr[1];
        }
    }


    const timer = setInterval(updateCountDown, 1000);
    updateCountDown();
}

function LoadTabs() {
    const productFeaturedSection = document.querySelector('.product-featured')
    const productFeaturedTab = new Tab(productFeaturedSection)

    const questionsSection = document.querySelector('.questions')
    const questionsTab = new Tab(questionsSection)
}



function LoadSlider() {
    const bestellerSection = document.querySelector('.section.bestellers');
    const bestellerSlider = new Slider(bestellerSection, {
        slidesToShow: 4,
        slidesNextCount: 4,
        slidesToShowMobile: 1,
        slidesNextCountMobile: 1,
        loop: false
    });

    const productFeatureSection = document.querySelector('.section.product-featured');
    const productFeatureSlider = new Slider(productFeatureSection, {
        slidesToShow: 1,
        slidesNextCount: 1,
        slidesToShowMobile: 1,
        slidesNextCountMobile: 1,
        loop: false
    });


    const testimonialSection = document.querySelector('.section.testimonials');
    const testimonialSlider = new Slider(testimonialSection, {
        slidesToShow: 1,
        slidesNextCount: 1,
        slidesToShowMobile: 1,
        slidesNextCountMobile: 1,
        loop: true
    });
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
        document.body.style.userSelect = 'none';
    })

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        UpdatePostion(e)
    })

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false
            document.body.style.userSelect = '';
        }
    })


    function UpdatePostion(e){
        const rect = wrapper.getBoundingClientRect();
        const currentX = e.clientX - rect.left;

        let newLeft = (currentX / wrapper.offsetWidth) * 100;
        newLeft = Math.max(0, Math.min(newLeft, 100));

        UpdateClipPath(newLeft)
    }

    function UpdateClipPath(left){
        control.style.left = `${left}%`;
        before.style.clipPath = `inset(0 ${100 - left}% 0 0)`;
        after.style.clipPath = `inset(0 0 0 ${left}%)`;
    }
}

function LoadVideo(){
    const wrapper = document.querySelector('.video-wrapper')
    const btnPlay = document.querySelector('.play-video')
    const btnClose = document.querySelector('.close-video')
    const video= document.querySelector('.video')

    btnPlay.addEventListener('click', () => {
        wrapper.classList.add('playing')
        video.play()
    })

    btnClose.addEventListener('click', () => {
        wrapper.classList.remove('playing')
    })

}

document.addEventListener("DOMContentLoaded", () => {

    LoadSlider()

    LoadTabs()

    LoadRatio()

    StartCountDown()

    LoadVideo()

});