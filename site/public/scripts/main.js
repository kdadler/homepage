var $ = jQuery

var pageController = {
  reduced: false,
  locations: {},
  currentLocale: 'title',
  // Images for the gallery.
  images: [
    {src: '/images/gallery/DSCF6547.jpg', w: 900, h: 675},
    {src: '/images/gallery/IMG_1986.JPG', w: 900, h: 675},
    {src: '/images/gallery/IMG_1992.JPG', w: 675, h: 900},
    {src: '/images/gallery/IMG_0042.jpg', w: 900, h: 675},
    {src: '/images/gallery/DSC_0102.JPG', w: 900, h: 675},
    {src: '/images/gallery/DSC_0173.JPG', w: 900, h: 675},
    {src: '/images/gallery/DSC_0275.JPG', w: 900, h: 675},
    {src: '/images/gallery/DSCF1496.JPG', w: 900, h: 675},
    {src: '/images/gallery/P1140056.JPG', w: 900, h: 675},
    {src: '/images/gallery/P6290102.JPG', w: 900, h: 675},
    {src: '/images/gallery/P7010155.JPG', w: 900, h: 675},
    {src: '/images/gallery/P7030182.JPG', w: 900, h: 675},
    {src: '/images/oakleaves.jpg', w: 1920, h: 1277}
  ],

  /**
   * Page initialise.
   */
  init: function () {
    this.addImages();
    this.events();
    this.indexLocations();
    this.setResponsive();
  },

  events: function () {
    var _t = this;
    $(window).scroll(function () {
      _t.updateHead();
      _t.updateLocale();
    });
    $('.image').click(function () {
      _t.initGallery(parseInt($(this).attr('index')));
    });
    $('.navigate').click(function (e) {
      e.preventDefault();
      _t.navigateTo(this);
    });
    $('#header-logo').click(function () {
      _t.scrollTo(0);
    });
  },

  setResponsive: function () {
    var portHeight = $(window).height();
    $('#title-section').find('.section-blocker').css('height', portHeight - 170);
  },

  // Header.controllers.
  minHead: function () {
    $('#header').addClass('reduced');
    this.reduced = true;
  },

  maxHead: function () {
    $('#header').removeClass('reduced');
    this.reduced = false;
  },

  updateHead: function () {
    var scroll = $(window).scrollTop();
    if (this.reduced && scroll < 31) {
      this.maxHead();
    }
    else if (!this.reduced && scroll > 30) {
      this.minHead();
    }
  },

  // Scroll to nonsense.
  getName: function (element) {
    var id = $(element).attr('id').split('-');
    return id[0];
  },

  navigateTo: function (element) {
    var name = this.getName(element);
    this.scrollTo(this.locations[name]);
  },

  scrollTo: function (position) {
    $('html, body').animate({scrollTop: position}, 1000);
  },

  indexLocations: function () {
    var _t = this
    $('.section').each(function () {
      var name = _t.getName(this);
      var position = $('#' + name + '-section').offset().top - 20;
      _t.locations[name] = Math.max(position, 0);
    });
  },

  updateLocale: function () {
    var locale = this.getLocale();
    if (locale !== this.currentLocale) {
      this.currentLocale = locale;
      $('.current').removeClass('current');
      $("##{locale}-link").addClass('current');
    }
  },

  getLocale: function () {
    var scroll = $(window).scrollTop();
    var previous = 0

    for (var name in this.locations) {
      if (this.locations.hasOwnProperty(name)) {
        var position = this.locations[name];

        if (position - 60 < scroll) {
          previous = name
        }
        else {
          return previous;
        }
      }
    }

    return name;
  },

  // Image gallery functionality.
  initGallery: function (index) {
    var element = document.querySelectorAll('.pswp');
    var items = this.images;
    var options = {index: index};
    var gallery = new PhotoSwipe(element[0], PhotoSwipeUI_Default, items, options);
    gallery.init();
  },

  addImages: function () {
    var i = 0;
    var length = this.images.length;

    for (i; i < length; i++) {
      $('#gallery').append("<img class=\"image\" src=\"#{image.file}\" index=\"#{i}\">");
    }
  }
}

// Page initialisation.
  $(function() {
    pageController.init();
  });
