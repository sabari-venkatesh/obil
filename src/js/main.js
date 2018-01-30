import Siema from 'siema';

let currentSlide = 0,
    carouselWrapper = document.querySelectorAll('.carousel'),
    carouselWrapperLength = carouselWrapper.length,
    carousels = [];

const addHandler = (carousel, carouselPageritem, index) => {
    if(index === 0) {
        carouselPageritem.classList.add('active');
    }
    carouselPageritem.onclick = () => {
        carouselPageritem.classList.add('active');
        Array.prototype.forEach.call(carouselPageritem.parentNode.children, (child) => {
            if (child !== carouselPageritem) {
                child.classList.remove('active');
            }
        });
        carousel.goTo(index);
    }
}

for (let i=0;i<carouselWrapperLength;i++) {
    carousels[i] = new Siema({
        selector: carouselWrapper[i],
        duration: 200,
        easing: 'ease-out',
        perPage: 1,
        startIndex: 0,
        draggable: false,
        multipleDrag: false,
        loop: false,
        onInit: () => {},
        onChange: () => {
            currentSlide = this.currentSlide;
        },
    });

    let carouselPager = document.createElement('ul');
    let carouselNext = document.createElement('button');
    let carouselPrev = document.createElement('button');

    carouselNext.className = 'carousel__nav is-next';
    carouselPrev.className = 'carousel__nav is-prev';

    carouselPager.className = 'carousel__pager';
    carouselWrapper[i].appendChild(carouselPager);
    carouselWrapper[i].appendChild(carouselNext);
    carouselWrapper[i].appendChild(carouselPrev);

    carouselNext.onclick = () => {
        carousels[i].next();
    }

    carouselPrev.onclick = () => {
        carousels[i].prev();
    }
    
    let totalSlides = carouselWrapper[i].querySelectorAll('.carousel__slide').length;

    for (var index=0; index<totalSlides; index++) {
        let carouselPageritem = document.createElement('li');
        carouselPager.appendChild(carouselPageritem);
        addHandler(carousels[i], carouselPageritem, index);
    }
}

const triggerEvent = (el, type) => {
    if ('createEvent' in document) {
        // modern browsers, IE9+
        var e = document.createEvent('HTMLEvents');
        e.initEvent(type, false, true);
        el.dispatchEvent(e);
    } else {
        // IE 8
        var e = document.createEventObject();
        e.eventType = type;
        el.fireEvent('on'+e.eventType, e);
    }
};
