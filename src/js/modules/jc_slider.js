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
      speed: 1000,
    };
    this.options = $.extend(this.defaults, options);

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
    $($(this.slider).children()[this._move]).addClass('jc-slider-active');
    $($(this.paginate).children()[this._move]).addClass('jc-slider-bullet-active');
  }

  slideChange(iterator) {
    this._move = this._move + iterator;
    $(this.slider).css('transform', `translate3D(${this._move * (-$(this.slider).innerWidth())}px, 0, 0)`);
    $($(this.slider).children()[this._move]).addClass('jc-slider-active');
    $(this.navPrev).removeClass(this.BUTTON_DISABLE);
  }

  events() {
    /* next slide change */
    $(this.navNext).on('click', () => {
      if (this._move < $(this.slider).children().length - 1) {
        this.slideChange(1);
        this.pagination();
        $($(this.paginate).children()[this._move]).prev().removeClass('jc-slider-bullet-active');
        $($(this.slider).children()[this._move]).prev().removeClass('jc-slider-active');
      } else {
        $(this.navNext).addClass(this.BUTTON_DISABLE);
      }
    });

    /* prev slide change */
    $(this.navPrev).on('click', () => {
      if (this._move !== 0) {
        this.slideChange(-1);
        this.pagination();
        $($(this.paginate).children()[this._move]).next().removeClass('jc-slider-bullet-active');
        $($(this.slider).children()[this._move]).next().removeClass('jc-slider-active');
      } else {
        $(this.navPrev).addClass(this.BUTTON_DISABLE);
      }
    });
    
    /* pagination bullet click event */
    $(this.paginate).children().on('click', (e) => {
      this._move = $(e.target).index() - 1;
      this.slideChange(1);
      this.pagination(e);
    });
  }

  paginationRender() {
    if ($(this.slider).find($(this.paginate))) {
      for (let index = 0; index < $(this.slider).children().length; index += 1) {
        $(this.paginate).append('<span tabindex="0" class="jc-slider-bullet"></span>');
      }
    } else {
      this.paginate = false;
    }
  }

  pagination() {
    if (this._move === $($(this.paginate).children()[this._move]).index()) {
      $($(this.paginate).children()[this._move]).addClass('jc-slider-bullet-active');
    }
  }

  init() {
    this.speed();
    this.checks();
    this.paginationRender();
    this.getActiveSlide();
    /* calls last one */
    this.events();
  }
}
