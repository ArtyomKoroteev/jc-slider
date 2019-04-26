// You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.

// import DE from './modules/dots';
import jcSlider from './modules/jc_slider';

(($) => {
  // When DOM is ready
  $(() => {
    // DE.dotsEffect();
    const slider = new jcSlider('.jc-slider-wrapper', {
      // navigation: {
      //   navNext: '.jc-slider-next',
      //   navPrev: '.jc-slider-prev',
      // },
      // pagination: {
      //   el: '.jc-slider-pagination',
      // },
    });
  });
})(jQuery);
