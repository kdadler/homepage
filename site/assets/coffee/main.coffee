$ = jQuery

# Header controllers.
reduced = false
minHead = ->
  $('#header').addClass 'reduced'
  reduced = true
maxHead = ->
  $('#header').removeClass 'reduced'
  reduced = false
updateHead = ->
  scroll = $(window).scrollTop()
  if reduced and scroll < 31 then maxHead()
  else if !reduced and scroll > 30 then minHead()



$ ->
  $(window).scroll (e) ->
    updateHead()
