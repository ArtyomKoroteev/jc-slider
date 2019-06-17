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
      autoplay: {
        on: false,
      },
      on: {
        nextSlideChange: null,
        prevSlideChange: null,
        init: null,
      },
      speed: 1000,
    };
    this.options = $.extend(this.defaults, options);

    this.slider = sliderObj;
    this.navNext = this.options.navigation.navNext;
    this.navPrev = this.options.navigation.navPrev;
    this.paginate = this.options.pagination.el;
    this.speedVal = this.options.speed;
    this.autoPlay = this.options.autoplay.on;
    this.autoPlayDelay = this.options.autoplay.delay;
    this._move = 0;
    this._prevMove = 0;
    this.BUTTON_DISABLE = 'jc-slider-disable';
    this.on = this.options.on;
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

  size() {
    return $(this.slider).width();
  }

  resize() {
    $(this.slider).find('.jc-slider-slide').css('width', `${this.size()}px`);
    if (this.on.resize !== null && typeof this.on.resize === 'function') this.on.resize();
  }

  speed() {
    $(this.slider).css('transition-duration', `${this.speedVal}ms`);
  }

  setActiveSlide() {
    $($(this.slider).children()[this._move]).addClass('jc-slider-active');
    $($(this.paginate).children()[this._move]).addClass('jc-slider-bullet-active');
  }

  _slideChange(iterator) {
    this._move = this._move + iterator;
    $(this.slider).css('transform', `translate3D(${this._move * (-(this.size()))}px, 0, 0)`);
    $($(this.slider).children()[this._move]).addClass('jc-slider-active');
  }

  nextSlide() {
    if (this._move < $(this.slider).children().length - 1) {
      this._slideChange(1);
      $(this.navPrev).removeClass(this.BUTTON_DISABLE);
      $($(this.paginate).children()[this._move]).prevAll().removeClass('jc-slider-bullet-active');
      $($(this.slider).children()[this._move]).prevAll().removeClass('jc-slider-active');
    } else {
      $(this.navNext).addClass(this.BUTTON_DISABLE);
    }
    if (this.on.nextSlideChange !== null && typeof this.on.nextSlideChange === 'function') this.on.nextSlideChange();
  }

  prevSlide() {
    if (this._move > 0) {
      this._slideChange(-1);
      $(this.navNext).removeClass(this.BUTTON_DISABLE);
      $($(this.paginate).children()[this._move]).nextAll().removeClass('jc-slider-bullet-active');
      $($(this.slider).children()[this._move]).nextAll().removeClass('jc-slider-active');
    } else {
      $(this.navPrev).addClass(this.BUTTON_DISABLE);
    }
    if (this.on.prevSlideChange !== null && typeof this.on.prevSlideChange === 'function') this.on.prevSlideChange();
  }

  events() {
    /* pagination bullet click event */
    $(this.paginate).children().on('click', (e) => {
      this.pagination(e);
    });

    /* next slide change */
    $(this.navNext).on('click', () => {
      this.nextSlide();
      this._paginationState();
    });

    /* prev slide change */
    $(this.navPrev).on('click', () => {
      this.prevSlide();
      this._paginationState();
    });
    $(window).on('resize load', () => {
      this.resize();
    });
  }

  _paginationRender() {
    if ($(this.slider).find($(this.paginate))) {
      for (let index = 0; index < $(this.slider).children().length; index += 1) {
        $(this.paginate).append('<span tabindex="0" class="jc-slider-bullet"></span>');
      }
    } else {
      this.paginate = false;
    }
  }

  _paginationState() {
    if (this._move === $($(this.paginate).children()[this._move]).index()) {
      $($(this.paginate).children()[this._move]).addClass('jc-slider-bullet-active');
    }
  }

  pagination(event) {
    this._move = $(event.target).index() - 1;
    if ($(event.target).index() > this._prevMove) {
      this.nextSlide();
      this._paginationState();
      this._prevMove = $(event.target).index() - 1;
    } else {
      this.nextSlide();
      this._paginationState();
      $(this.navNext).removeClass(this.BUTTON_DISABLE);
      $($(this.paginate).children()[this._move]).nextAll().removeClass('jc-slider-bullet-active');
      $($(this.slider).children()[this._move]).nextAll().removeClass('jc-slider-active');
    }
  }

  autoPlayFunc(flag, delay) {
    if (flag === true) {
      if (this._move < $(this.slider).children().length - 1) {
        setInterval(() => {
          this.nextSlide();
          this._paginationState();
        }, delay);
      }
    }
  }

  init() {
    this.speed();
    this.checks();
    this._paginationRender();
    this.setActiveSlide();
    this.autoPlayFunc(this.autoPlay, this.autoPlayDelay);
    /* calls last one */
    this.events();
    if (this.on.initialization !== null && typeof this.on.initialization === 'function') this.on.initialization();
  }
}
