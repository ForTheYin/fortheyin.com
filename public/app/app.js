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

  $(document).ready(function () {
    // Only show the intro screen once
    if (document.cookie === 'visited=true') {
      return;
    }
    document.cookie = 'visited=true'

    // Initialize terminal, if user has JS enabled
    $(elements.manpage).addClass('hidden');
    $(elements.repl).removeClass('hidden');

    // Set defaults
    defaultText = 'fortheyin$ ';
    $(elements.output).text(defaultText);

    // Initialize flickering input rectangle
    flickering = setInterval(function () {
      var text = $(elements.cursor).text() ? '' : '#';
      $(elements.cursor).text(text);
    }, 500);

    // Initialize typing
    addText('man fortheyin', 150, function () {
      clearText();

      clearInterval(flickering);
      $(elements.repl).addClass('hidden');
      $(elements.manpage).removeClass('hidden');
    });

    return;

    // --- Console Manipulation Functions
    function addText(text, speed, callback) {
      speed = typeof speed === 'undefined' ? 200 : speed;
      var remaining = text;

      var interval = setInterval(function () {
        if (!remaining) {
          clearInterval(interval);
          return typeof callback === 'function' ? callback() : null;
        }
        consoleText += remaining[0];
        remaining = remaining.substring(1);
        $(elements.output).text(defaultText + consoleText);
      }, speed);
    };

    function deleteText(speed, callback) {
      speed = typeof speed === 'undefined' ? 200 : speed;
      var length = consoleText.length;
      var interval = setInterval(function () {
        if (!consoleText) {
          clearInterval(interval);
          return typeof callback === 'function' ? callback() : null;
        }
        length--;
        consoleText = consoleText.substring(0, length);
        $(elements.output).text(defaultText + consoleText);
      }, speed);
    };

    function clearText(callback) {
      $(elements.output).text(defaultText);
      return typeof callback === 'function' ? callback() : null;
    };
  });
})();

(function () {
  if (!window.requestAnimationFrame) {
    return false;
  }

  var objects = [];

  function Firework() {
    this.h = 360;
    this.s = 100;
    this.l = 100;
    this.a = 1;

    this.size = 1.5;
    this.gravity = 0.02;
    this.position = {
      x: 0,
      y: 0
    };
    this.velocity = {
      x: 0,
      y: 0
    };
    this.fadeRate = 1;
    this.hasChildren = true;
  }

  Firework.prototype.explode = function () {
    this.hasChildren = false;

    var children = Math.random() * 25 + 25;
    var h = Math.floor(Math.random() * 360);
    var s = Math.floor(Math.random() * 10) + 90;
    var l = Math.floor(Math.random() * 60) + 40;

    // Create child fireworks at the location of explosion and add to objects
    for (var i = 0; i < children; i++) {
      var firework = new Firework();

      // Prevent infinite fireworks
      firework.hasChildren = false;

      firework.h = h;
      firework.s = s;
      firework.l = l;

      firework.position.x = this.position.x;
      firework.position.y = this.position.y;
      firework.velocity.x = Math.random() * 2 - 1.0;
      firework.velocity.y = Math.random() * -2.2;
      firework.fadeRate = 0.008;

      objects.push(firework);
    }
  }

  Firework.prototype.update = function () {
      this.a -= this.fadeRate;
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      this.velocity.y += this.gravity;

      if (this.hasChildren && this.a <= 0) {
        this.explode();
      }
  };

  Firework.prototype.render = function (ctx) {
    ctx.beginPath();

    ctx.fillStyle = 'hsla(' + this.h + ',' + this.s + '%,' + this.l + '%,' + this.a + ')';
    ctx.moveTo(this.position.x, this.position.y);
    ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2, true);

    ctx.closePath();
    ctx.fill();
  };

  function fireworks() {
    var height = $(document).height();
    var width = $(document).width();
    var $canvas = $('<canvas />');

    var canvas = $canvas[0];
    var context = canvas.getContext('2d');

    function addFirework() {
      var firework = new Firework();
      firework.position.x = Math.random() * width;
      firework.position.y = height;
      firework.velocity.x = Math.random() * 2.0 - 1;
      firework.velocity.y = Math.random() * -4 - 4;
      firework.fadeRate = Math.random() * 0.008 + 0.004;
      objects.push(firework);
    }

    function update() {
      height = $(document).height();
      width = $(document).width();

      if (canvas.height !== height) {
        canvas.height = height;
      }
      if (canvas.width !== width) {
        canvas.width = width;
      }

      objects.forEach(function (object, i) {
        object.update();
        if (object.a <= 0) {
          objects.splice(i, 1);
        }
      });
    }

    function render() {
      requestAnimationFrame(render);

      // Incompletely wipes the canvas, so we get a trailing effect
      context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      context.fillRect(0, 0, width, height);

      // Render all objects
      objects.forEach(function (object) {
        object.render(context);
      });
    }

    canvas.height = height;
    canvas.width = width;

    $canvas.css('position', 'absolute');
    $canvas.css('z-index', '-1');
    $canvas.css('top', '0');
    $canvas.css('left', '0');

    $('body').append($canvas);

    setInterval(update, 20);
    setInterval(addFirework, 900);
    render();
  }

  window.fireworks = fireworks;
})();
