(function () {
  var defaultText = '';

  $( document ).ready(function () {
    var staggerText = function (text, speed) {
      speed = typeof speed === 'undefined' ? 200 : speed;
      var remaining = text;
      var pushed = '';

      var interval = setInterval(function () {
        if (!remaining) return clearInterval(interval);
        pushed += remaining[0];
        remaining = remaining.substring(1);
        $( '#terminal-text' ).text(defaultText + pushed);
      }, speed);
    };

    $.ajax({
      url: '/api/user',
      success: function (data) {
        defaultText = 'fortheyin ' + data.ip + '$ ';
        $( '#terminal-text' ).text(defaultText);
        staggerText('hello', 200);
      }
    });

    setInterval(function () {
      var text = $('#terminal-block').text() ? '' : '#';
      $( '#terminal-block' ).text(text);
    }, 300);
  });
})();
