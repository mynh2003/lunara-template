class Tab {
    constructor(sectionSelector) {
        const section = typeof sectionSelector === 'string' ? document.querySelector(sectionSelector) : sectionSelector
        if (!section) throw new Error('Section not found')

        this.tabItems = section.querySelectorAll('.tab-item')

        this.UpdateTab()
    }

    UpdateTab(){
        this.tabItems.forEach(item => {
            const title = item.querySelector('.tab-title')

            title.addEventListener('click', () => {
                this.tabItems.forEach(i => {
                    const tabContent = i.querySelector('.tab-content')

                    if (i !== item) {
                        tabContent.style.maxHeight = null
                        i.classList.remove('active')
                    }
                    else {
                        tabContent.style.maxHeight = tabContent.scrollHeight + 'px'
                        i.classList.add('active')
                    }
                })
            })
        })
    }
}

export default Tab