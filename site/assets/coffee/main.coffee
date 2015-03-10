$ = jQuery

class pageController
  reduced       : false
  locations     : {}
  currentLocale : 'title'
  images        : [
      file : '/images/gallery/DSCF6547.jpg'
      w    : 900
      h    : 675
    ,
      file : '/images/gallery/IMG_1986.JPG'
      w    : 900
      h    : 675
    ,
      file : '/images/gallery/IMG_1992.JPG'
      w    : 675
      h    : 900
    ,
      file : '/images/gallery/IMG_0042.jpg'
      w    : 900
      h    : 675
    ,
      file : '/images/gallery/DSC_0102.JPG'
      w    : 900
      h    : 675
    ,
      file : '/images/gallery/DSC_0173.JPG'
      w    : 900
      h    : 675
    ,
      file : '/images/gallery/DSC_0275.JPG'
      w    : 900
      h    : 675
    ,
      file : '/images/gallery/DSCF1496.JPG'
      w    : 900
      h    : 675
    ,
      file : '/images/gallery/P1140056.JPG'
      w    : 900
      h    : 675
    ,
      file : '/images/gallery/P6290102.JPG'
      w    : 900
      h    : 675
    ,
      file : '/images/gallery/P7010155.JPG'
      w    : 900
      h    : 675
    ,
      file : '/images/gallery/P7030182.JPG'
      w    : 900
      h    : 675
    ,
      file : '/images/oakleaves.jpg'
      w    : 1920
      h    : 1277
  ]


  # Page initialise.
  init: ->
    @addImages()
    @events()
    @indexLocations()
    @setResponsive()

  events: ->
    _t = @
    $(window).scroll (e) =>
      @updateHead()
      @updateLocale()
    $('.image').click ->
      _t.initGallery parseInt $(@).attr 'index'
    $('.navigate').click (e) ->
      e.preventDefault()
      _t.navigateTo @
    $('#header-logo').click =>
      @scrollTo 0

  setResponsive: ->
    portHeight = $(window).height()
    $('#title-section .section-blocker').css 'height', portHeight - 170


  # Header controllers.
  minHead: ->
    $('#header').addClass 'reduced'
    @reduced = true

  maxHead: ->
    $('#header').removeClass 'reduced'
    @reduced = false

  updateHead: ->
    scroll = $(window).scrollTop()
    if @reduced and scroll < 31 then @maxHead()
    else if !@reduced and scroll > 30 then @minHead()


  # Scroll to nonsense.
  getName: (element) ->
    id = $(element).attr('id').split '-'
    id[0]

  navigateTo: (element) ->
    name = @getName element
    @scrollTo @locations[name]

  scrollTo: (position) ->
    $('html, body').animate
        scrollTop: position
      , 1000

  indexLocations: ->
    _t = @
    $('.section').each ->
      name               = _t.getName @
      position           = $("##{name}-section").offset().top - 20
      _t.locations[name] = Math.max position, 0

  updateLocale: ->
    locale = @getLocale()
    if locale isnt @currentLocale
      @currentLocale = locale
      $('.current').removeClass 'current'
      $("##{locale}-link").addClass 'current'

  getLocale: ->
    scroll   = $(window).scrollTop()
    previous = 0
    for name, position of @locations
      if (position - 60) < scroll
        previous = name
      else
        return previous
    name


  # Image gallery functionality.
  initGallery: (index) ->
    element = document.querySelectorAll '.pswp'
    items   = @getImageItems()
    options =
      index: index
    gallery = new PhotoSwipe element[0], PhotoSwipeUI_Default, items, options
    gallery.init()

  getImageItems: ->
    for image in @images
      src : image.file
      w   : image.w
      h   : image.h

  addImages: ->
    for image, i in @images
      $('#gallery').append "<img class=\"image\" src=\"#{image.file}\" index=\"#{i}\">"


# Page initialisation.
$ ->
  controller = new pageController()
  controller.init()
