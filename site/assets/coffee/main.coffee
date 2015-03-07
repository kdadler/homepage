$ = jQuery

class pageController
  reduced       : false
  locations     : {}
  currentLocale : 'title'
  images        : [
    '/images/gallery/DSCF6547.jpg'
    '/images/gallery/IMG_0042.jpg'
    '/images/gallery/DSC_0102.JPG'
    '/images/gallery/DSC_0173.JPG'
    '/images/gallery/DSC_0275.JPG'
    '/images/gallery/DSCF1496.JPG'
    '/images/gallery/P1140056.JPG'
    '/images/gallery/P6290102.JPG'
    '/images/gallery/P7010155.JPG'
    '/images/gallery/P7030182.JPG'
  ]


  # Page initialise.
  init: ->
    @addImages()
    @events()
    @indexLocations()

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
      position           = $("##{name}-section").offset().top - 40
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
      src : image
      w   : 900
      h   : 675

  addImages: ->
    for image, i in @images
      $('#gallery').append "<img class=\"image\" src=\"#{image}\" index=\"#{i}\">"


# Page initialisation.
$ ->
  controller = new pageController()
  controller.init()
