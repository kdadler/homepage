(function() {
  var $, maxHead, minHead, reduced;

  $ = jQuery;

  reduced = false;

  minHead = function() {
    $('#header').addClass('reduced');
    return reduced = true;
  };

  maxHead = function() {
    $('#header').removeClass('reduced');
    return reduced = false;
  };

  $(function() {
    return $(window).scroll(function(e) {
      var scroll;
      scroll = $(window).scrollTop();
      if (reduced && scroll < 31) {
        return maxHead();
      } else if (!reduced && scroll > 30) {
        return minHead();
      }
    });
  });

}).call(this);
