(function() {
  var $, pageController;

  $ = jQuery;

  pageController = (function() {
    function pageController() {}

    pageController.prototype.reduced = false;

    pageController.prototype.locations = {};

    pageController.prototype.currentLocale = 'title';

    pageController.prototype.images = ['/images/gallery/DSCF6547.jpg', '/images/gallery/IMG_0042.jpg', '/images/gallery/DSC_0102.JPG', '/images/gallery/DSC_0173.JPG', '/images/gallery/DSC_0275.JPG', '/images/gallery/DSCF1496.JPG', '/images/gallery/P1140056.JPG', '/images/gallery/P6290102.JPG', '/images/gallery/P7010155.JPG', '/images/gallery/P7030182.JPG'];

    pageController.prototype.init = function() {
      this.addImages();
      this.events();
      this.indexLocations();
      return this.setResponsive();
    };

    pageController.prototype.events = function() {
      var _t,
        _this = this;
      _t = this;
      $(window).scroll(function(e) {
        _this.updateHead();
        return _this.updateLocale();
      });
      $('.image').click(function() {
        return _t.initGallery(parseInt($(this).attr('index')));
      });
      $('.navigate').click(function(e) {
        e.preventDefault();
        return _t.navigateTo(this);
      });
      return $('#header-logo').click(function() {
        return _this.scrollTo(0);
      });
    };

    pageController.prototype.setResponsive = function() {
      var portHeight;
      portHeight = $(window).height();
      return $('#title-section .section-blocker').css('height', portHeight - 170);
    };

    pageController.prototype.minHead = function() {
      $('#header').addClass('reduced');
      return this.reduced = true;
    };

    pageController.prototype.maxHead = function() {
      $('#header').removeClass('reduced');
      return this.reduced = false;
    };

    pageController.prototype.updateHead = function() {
      var scroll;
      scroll = $(window).scrollTop();
      if (this.reduced && scroll < 31) {
        return this.maxHead();
      } else if (!this.reduced && scroll > 30) {
        return this.minHead();
      }
    };

    pageController.prototype.getName = function(element) {
      var id;
      id = $(element).attr('id').split('-');
      return id[0];
    };

    pageController.prototype.navigateTo = function(element) {
      var name;
      name = this.getName(element);
      return this.scrollTo(this.locations[name]);
    };

    pageController.prototype.scrollTo = function(position) {
      return $('html, body').animate({
        scrollTop: position
      }, 1000);
    };

    pageController.prototype.indexLocations = function() {
      var _t;
      _t = this;
      return $('.section').each(function() {
        var name, position;
        name = _t.getName(this);
        position = $("#" + name + "-section").offset().top - 20;
        return _t.locations[name] = Math.max(position, 0);
      });
    };

    pageController.prototype.updateLocale = function() {
      var locale;
      locale = this.getLocale();
      if (locale !== this.currentLocale) {
        this.currentLocale = locale;
        $('.current').removeClass('current');
        return $("#" + locale + "-link").addClass('current');
      }
    };

    pageController.prototype.getLocale = function() {
      var name, position, previous, scroll, _ref;
      scroll = $(window).scrollTop();
      previous = 0;
      _ref = this.locations;
      for (name in _ref) {
        position = _ref[name];
        if ((position - 60) < scroll) {
          previous = name;
        } else {
          return previous;
        }
      }
      return name;
    };

    pageController.prototype.initGallery = function(index) {
      var element, gallery, items, options;
      element = document.querySelectorAll('.pswp');
      items = this.getImageItems();
      options = {
        index: index
      };
      gallery = new PhotoSwipe(element[0], PhotoSwipeUI_Default, items, options);
      return gallery.init();
    };

    pageController.prototype.getImageItems = function() {
      var image, _i, _len, _ref, _results;
      _ref = this.images;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        image = _ref[_i];
        _results.push({
          src: image,
          w: 900,
          h: 675
        });
      }
      return _results;
    };

    pageController.prototype.addImages = function() {
      var i, image, _i, _len, _ref, _results;
      _ref = this.images;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        image = _ref[i];
        _results.push($('#gallery').append("<img class=\"image\" src=\"" + image + "\" index=\"" + i + "\">"));
      }
      return _results;
    };

    return pageController;

  })();

  $(function() {
    var controller;
    controller = new pageController();
    return controller.init();
  });

}).call(this);
