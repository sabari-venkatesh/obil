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

    carouselNext.className = 'carousel-nav is-next';
    carouselPrev.className = 'carousel-nav is-prev';

    carouselPager.className = 'carousel-pager';
    carouselWrapper[i].appendChild(carouselPager);
    carouselWrapper[i].appendChild(carouselNext);
    carouselWrapper[i].appendChild(carouselPrev);

    carouselNext.onclick = () => {
        carousels[i].next();
    }

    carouselPrev.onclick = () => {
        carousels[i].prev();
    }

    let totalSlides = carouselWrapper[i].querySelectorAll('.carousel-item').length;

    for (var index=0; index<totalSlides; index++) {
        let carouselPageritem = document.createElement('li');
        carouselPager.appendChild(carouselPageritem);
        addHandler(carousels[i], carouselPageritem, index);
    }
}


$(document).ready(function() {
    function initMap() {
        var myLatLng = {lat: 13.0638766, lng: 80.2598532};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 16,
          center: myLatLng
        });

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'Oceanaa Biotek Industries Limited'
        });
    }
      window.initMap = initMap;
});
