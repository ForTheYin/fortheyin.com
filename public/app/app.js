(function () {
  var defaultText = '';
  var consoleText = '';
  var elements = {
    manpage: '#manpage',
    repl: '#repl',
    output: '.terminal-text',
    cursor: '.terminal-rectangle'
  };

  $( document ).ready(function () {
    $( elements.repl ).removeClass('hidden');
    $( elements.manpage ).addClass('hidden');

    $.ajax({
      url: '/api/user',
      success: function (data) {
        defaultText = 'fortheyin ' + data.ip + '$ ';
        $( elements.output ).text(defaultText);
        addText('man fortheyin', 150, function () {
          clearText();
          $( elements.repl ).addClass('hidden');
          $( elements.manpage ).removeClass('hidden');
        });
      }
    });

    // Flickering Input Bar
    setInterval(function () {
      var text = $( elements.cursor ).text() ? '' : '#';
      $( elements.cursor ).text(text);
    }, 500);

    return;
    // --- Console Manipulation Functions

    function addText (text, speed, callback) {
      speed = typeof speed === 'undefined' ? 200 : speed;
      var remaining = text;

      var interval = setInterval(function () {
        if (!remaining) {
          clearInterval(interval);
          return typeof callback === 'function' ? callback() : null;
        }
        consoleText += remaining[0];
        remaining = remaining.substring(1);
        $( elements.output ).text(defaultText + consoleText);
      }, speed);
    };

    function deleteText (speed, callback) {
      speed = typeof speed === 'undefined' ? 200 : speed;
      var length = consoleText.length;
      var interval = setInterval(function () {
        if (!consoleText) {
          clearInterval(interval);
          return typeof callback === 'function' ? callback() : null;
        }
        length--;
        consoleText = consoleText.substring(0, length);
        $( elements.output ).text(defaultText + consoleText);
      }, speed);
    };

    function clearText (callback) {
      $( elements.output ).text(defaultText);
      return typeof callback === 'function' ? callback() : null;
    };
  });
})();
