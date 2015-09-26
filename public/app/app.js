(function () {
  var defaultText = '';
  var consoleText = '';
  var elements = {
    manpage: '#manpage',
    repl: '#repl',
    output: '.terminal-text',
    cursor: '.terminal-rectangle'
  };
  var flickering = null;

  $( document ).ready(function () {
    // Initialize terminal, if user has JS enabled
    $( elements.manpage ).addClass('hidden');
    $( elements.repl ).removeClass('hidden');

    // Set defaults
    defaultText = 'fortheyin$ ';
    $( elements.output ).text(defaultText);

    // Initialize flickering input rectangle
    flickering = setInterval(function () {
      var text = $( elements.cursor ).text() ? '' : '#';
      $( elements.cursor ).text(text);
    }, 500);

    // Initialize typing
    addText('man fortheyin', 150, function () {
      clearText();

      clearInterval(flickering);
      $( elements.repl ).addClass('hidden');
      $( elements.manpage ).removeClass('hidden');
    });

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
