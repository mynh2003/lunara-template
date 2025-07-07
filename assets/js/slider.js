class Slider {
    constructor(sectionSelector, options = {}) {
        const section = typeof sectionSelector === 'string' ? document.querySelector(sectionSelector) : sectionSelector
        if (!section) throw new Error('Section not found')

        this.container = section.querySelector('.slider')
        this.slideList = this.container.querySelector('.slides')
        this.slides = Array.from(this.slideList.querySelectorAll('.slide'))
        this.prevBtn = this.container.querySelector('.slider-nav-left button')
        this.nextBtn = this.container.querySelector('.slider-nav-right button')
        this.progress = this.container.querySelector('.slider-progress')
        this.currentIndex = 0
        this.slidesToShow = options.slidesToShow || 1
        this.slidesNextCount = options.slidesNextCount || 1
        this.loop = options.loop || false;

        this.updateButtons()
        this.updateProgress()

        this.prevBtn?.addEventListener('click', () => this.prev())
        this.nextBtn?.addEventListener('click', () => this.next())
        this.slideList.addEventListener('scroll', this.onScroll.bind(this));


    }

    scrollToItem(index) {
        this.slides[index].scrollIntoView({
            behavior: "smooth",
            inline: "start",
            block: "nearest",
        });
    };

    onScroll() {
        const scrollLeft = this.slideList.scrollLeft;
        const slideWidth = this.slides[0].offsetWidth;

        const index = Math.round(scrollLeft / slideWidth);

        if (index !== this.currentIndex) {
            this.currentIndex = index;
            this.updateButtons();
            this.updateProgress();
        }
    }

    updateButtons() {
        if (!this.loop) {
            if (this.prevBtn) {
                this.prevBtn.classList.toggle('disabled', this.currentIndex === 0);
            }
            if (this.nextBtn) {
                this.nextBtn.classList.toggle('disabled', this.currentIndex >= this.slides.length - this.slidesToShow);
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


    goTo(index) {
        const total = this.slides.length
        const maxStartIndex = Math.max(0, total - this.slidesToShow)

        if (this.loop) {
            this.currentIndex = (index + total) % total;
        } else {
            this.currentIndex = Math.max(0, Math.min(index, maxStartIndex))
        }

        this.updateButtons()
        this.updateProgress()
    }

    next() {
        this.goTo(this.currentIndex + this.slidesNextCount);
        this.scrollToItem(this.currentIndex);
    }

    prev() {
        this.goTo(this.currentIndex - this.slidesNextCount);
        this.scrollToItem(this.currentIndex);
    }
}

export default Slider