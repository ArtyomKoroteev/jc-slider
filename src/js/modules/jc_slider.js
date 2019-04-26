export default class JcSlider {
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
      speed: 500,
    };
    this.options = $.extend(this.defaults, options);
    console.log(this.options);
    
    this.slider = sliderObj;
    this.navNext = this.options.navigation.navNext;
    this.navPrev = this.options.navigation.navPrev;
    this.paginate = this.options.pagination.el;
    this.speedVal = this.options.speed;
    this._move = 0;
    this.BUTTON_DISABLE = 'js-slider-disable';
    this.init();
  }

  checks() {
    if (!(($(this.navNext)) in $(this.slider))) {
      this.options.navigation.navNext = false;
    }

    if (!(($(this.navPrev)) in $(this.slider))) {
      this.options.navigation.navPrev = false;
    }

    if (!(($(this.paginate)) in $(this.slider))) {
      this.options.pagination.el = false;
    }
  }

  speed() {
    $(this.slider).css('transition-duration', `${this.speedVal}ms`);
  }

  getActiveSlide() {
    // console.log();
    $($(this.slider).children()[0]).addClass('jc-slider-active');
    $($(this.paginate).children()[0]).addClass('jc-slider-bullet-active');
    // $($(this.slider).children()[0]).next().addClass('jc-slider-next');
  }

  nextSlide() {
    $(this.navNext).on('click', () => {
      if (-this._move > (-($(this.slider).innerWidth()) * ($(this.slider).children().length - 1))) {
        this._move += $(this.slider).innerWidth();
        $(this.slider).css('transform', `translate3D(${-this._move}px, 0, 0)`);
        $(this.navPrev).removeClass(this.BUTTON_DISABLE);
      } else {
        $(this.navNext).addClass(this.BUTTON_DISABLE);
      }
    });
  }

  prevSlide() {
    $(this.navPrev).on('click', () => {
      if (this._move !== 0) {
        this._move -= $(this.slider).innerWidth();
        $(this.slider).css('transform', `translate3D(${-this._move}px, 0, 0)`);
        $(this.navNext).removeClass(this.BUTTON_DISABLE);
      } else {
        $(this.navPrev).addClass(this.BUTTON_DISABLE);
      }
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
    this.speed();
    this.checks();
    this.nextSlide();
    this.prevSlide();
    this.pagination();
    this.getActiveSlide();
  }
}
