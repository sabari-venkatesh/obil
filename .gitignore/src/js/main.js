import Siema from 'siema';

let currentSlide = 0;
const siema = new Siema({
    selector: '.carousel',
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

const carouselNav = document.createElement('ul');
carouselNav.className = 'carousel__nav';
document.querySelector('.carousel').appendChild(carouselNav);

const totalSlides = document.querySelectorAll('.carousel__slide').length;

for (var index=0; index<totalSlides; index++) {
    let carouselNavitem = document.createElement('li');
    carouselNav.appendChild(carouselNavitem);
    let itemIndex = index;
    carouselNavitem.onclick = () => {
        carouselNavitem.classList.add('active');
        Array.prototype.forEach.call(carouselNavitem.parentNode.children, function(child){
            if (child !== carouselNavitem) {
                child.classList.remove('active');
            }
        });
        siema.goTo(itemIndex);
    }
}
