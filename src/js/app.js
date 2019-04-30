// You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.

// import DE from './modules/dots';
import JcSlider from './modules/jc_slider';

(($) => {
  // When DOM is ready
  $(() => {
    const slider = new JcSlider('.jc-slider-wrapper', {
      // navigation: {
      //   navNext: '.jc-slider-next',
      //   navPrev: '.jc-slider-prev',
      // },
      // pagination: {
      //   el: '.jc-slider-pagination',
      // },
      // speed: 1000,
    });
    // console.log(slider);
  });
})(jQuery);
