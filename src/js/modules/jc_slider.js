export default class jcSlider {
  constructor(options) {
    this.navigation = options.navigation;
  }

  objectSorter() {
    const $nextEl = $(this.navigation);
    console.log($nextEl);
  }
}
