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

const initMap = () => {
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


function getDir( url, form ) {

    var filebrowser = $('.filebrowser', form);
    $('.loading', form).fadeIn();
    $('.breadcrumb', form).empty();
    $.ajax({
        url: 'listfiles.php',
        dataType : 'json',
        type: 'post',
        encode : true,
        data: {'path': url},
        async: true,
        success: function(response) {
            filebrowser.html('');
            var i = 0;
            while(i < response.length) {
                filebrowser.append('<li class="breadcrumb-item"><a title="' + response[i].name + '" target="' + (response[i].type !== 'dir' ? '_blank' : '') + '" href="' + response[i].path + '" class="file ' + response[i].type + '">' + response[i].name + '</a></li>');
                i++;
            }
            $('.loading', form).fadeOut();
        }
    });
}

function setBreadcrumb(urlfrag, form) {
    $.each(urlfrag.slice(0, urlfrag.length-1), function(i) {
        if ( i > 1 ) {
            $('.breadcrumb', form).append('<li class="breadcrumb-item"><a title="Click to navigate" href="' + urlfrag.slice( 0, i+1 ).join('/') +'/">' + urlfrag[i] +'</a></li>');
        }
    });

    $('.breadcrumb', form).prepend('<li class="breadcrumb-item"><a href="' + $('[name="urlpath"]', form).val() +'">' + form[0].dataset.name + '</a></li>');
}

function getExtension(urlfrag) {
    var basename = urlfrag[urlfrag.length - 1].split('.');
    if( basename.length === 1 || (basename[0] === "" && basename.length === 2)) {
        return "";
    }
    return basename.pop();
}

$(document).ready(function() {

    $('a[class*="pdf"]').attr('target', '_blank');
    $('.formbrowser').submit(function(e) {
        e.preventDefault();
        var form = $(this),
                urlbase = $('[name="urlpath"]', form).val();
        getDir(urlbase, form);
        $('.breadcrumb', form).append('<li class="breadcrumb-item"><a href="' + urlbase +'">' + form[0].dataset.name + '</a></li>');
    }).submit();


    $('.breadcrumb a').live('click', function(e) {
        e.preventDefault();
        var form = $(this).closest('.formbrowser'),
                urlbase = $('[name="urlpath"]', form).val(),
                url = $(this).attr('href'),
                urlfrag = url.split('/');
                //ext = getExtension(urlfrag);

        getDir(url, form);
        setBreadcrumb(urlfrag, form);
        return false;
    });


    $('.filebrowser a[class*=dir]').live('click', function(e) {
        e.preventDefault();
        var form = $(this).closest('.formbrowser'),
                urlbase = $('[name="urlpath"]', form).val(),
                url = $(this).attr('href'),
                urlfrag = url.split('/');
                //ext = getExtension(urlfrag);
        getDir(url, form);
        setBreadcrumb(urlfrag, form);
        return false;
    });
});
