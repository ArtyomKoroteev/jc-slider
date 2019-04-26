export default class jcSlider {
  constructor(sliderObj = '.jc-slider-wrapper', options) {
    this.defaults = {
      navigation: {
        navNext: '.jc-slider-next',
        navPrev: '.jc-slider-prev',
      },
      pagination: {
        el: '.jc-slider-pagination',
      },
      autoplay: false,
    };
    this.options = $.extend(this.defaults, options);
    console.log(this.options);
    this.slider = sliderObj;
    this.navNext = this.options.navigation.navNext;
    this.navPrev = this.options.navigation.navPrev;
    this.paginate = this.options.pagination.el;
    this._move = 0;
    this.init();
  }

  checks() {    
    if (!($(this.slider) in ($(this.navNext)))) {
      this.options.navigation.navNext = false;
    }
        
    if (!($(this.slider) in ($(this.navPrev)))) {
      this.options.navigation.navPrev = false;
    }

    if (!($(this.slider) in ($(this.paginate)))) {
      this.options.pagination.el = false;
    }
  }

  nextSlide() {
    $(this.navNext).on('click', () => {
      this._move += $(this.slider).innerWidth();
      $(this.slider).css('transform', `translate3D(${-this._move}px, 0, 0)`);
    });
  }

  prevSlide() {
    $(this.navPrev).on('click', () => {
      this._move -= $(this.slider).innerWidth();
      $(this.slider).css('transform', `translate3D(${-this._move}px, 0, 0)`);
    });
  }

  pagination() {
    if ($(this.slider).find($(this.paginate))) {
      for (let index = 0; index < $(this.slider).children().length; index += 1) {
        $(this.paginate).append('<span tabindex="0" class="jc-slider-bullet"></span>');
      }
    } else {
      console.log('no');
      this.paginate = false;
    }
  }

  init() {
    this.checks();
    this.nextSlide();
    this.prevSlide();
    this.pagination();
  }
}
