function draw(tattoo) {
  for (var i = 0; i < tattoo.length; i++) {
    document.getElementById('finger' + i).innerHTML = tattoo[i];
  }
  document.title = '#fistbump: ' + tattoo;
  location.hash = '#' + tattoo;
}

function randomWord() {
  return words[Math.floor((Math.random() * words.length))];
}

function randomTattoo() {
  return randomWord() + randomWord();
}

function playBumpAnimation(callback) {
  var left = document.getElementById('left');
  var right = document.getElementById('right');
  var letters = document.querySelectorAll('span.letter');

  left.classList.add('bumping');
  right.classList.add('bumping');
  letters.forEach(function (el) { el.classList.add('flipping'); });

  setTimeout(function () {
    left.classList.remove('bumping');
    right.classList.remove('bumping');
    letters.forEach(function (el) { el.classList.remove('flipping'); });
    if (callback) callback();
  }, 600);
}

function updateTattoo(raw) {
  var newTattoo;
  if (typeof raw === 'string' && raw.length === 9) {
    newTattoo = raw.slice(1);
  } else {
    newTattoo = randomTattoo();
  }
  lastTattoo = '#' + newTattoo;
  draw(newTattoo);
}

function setLetterFont(fontFamily) {
  var letters = document.querySelectorAll('span.letter');
  letters.forEach(function (el) {
    el.style.fontFamily = "'" + fontFamily + "', sans-serif";
  });
}

function generateCard(callback) {
  var canvas = document.getElementById('card-canvas');
  var ctx = canvas.getContext('2d');
  var w = 1200, h = 630;
  canvas.width = w;
  canvas.height = h;

  // Background gradient
  var grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#1a1a2e');
  grad.addColorStop(1, '#16213e');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Decorative border
  ctx.strokeStyle = 'rgb(255, 82, 82)';
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, w - 40, h - 40);

  // Corner accents
  var cornerSize = 30;
  ctx.fillStyle = 'rgb(255, 82, 82)';
  ctx.fillRect(16, 16, cornerSize, 4);
  ctx.fillRect(16, 16, 4, cornerSize);
  ctx.fillRect(w - 16 - cornerSize, 16, cornerSize, 4);
  ctx.fillRect(w - 20, 16, 4, cornerSize);
  ctx.fillRect(16, h - 20, cornerSize, 4);
  ctx.fillRect(16, h - 16 - cornerSize, 4, cornerSize);
  ctx.fillRect(w - 16 - cornerSize, h - 20, cornerSize, 4);
  ctx.fillRect(w - 20, h - 16 - cornerSize, 4, cornerSize);

  // Get current tattoo text
  var tattoo = '';
  for (var i = 0; i < 8; i++) {
    var el = document.getElementById('finger' + i);
    tattoo += el.innerHTML || ' ';
  }

  // Get current font
  var fontPicker = document.getElementById('font-picker');
  var currentFont = fontPicker.value;

  // Draw tattoo letters
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Left fist letters
  var leftText = tattoo.slice(0, 4).toUpperCase();
  var rightText = tattoo.slice(4, 8).toUpperCase();

  ctx.font = 'bold 90px "' + currentFont + '"';
  ctx.fillStyle = '#ffffff';
  ctx.letterSpacing = '20px';

  // Draw left fist word
  var leftX = w * 0.28;
  var centerY = h * 0.45;
  for (var j = 0; j < leftText.length; j++) {
    ctx.fillText(leftText[j], leftX - 90 + j * 60, centerY);
  }

  // Draw right fist word
  var rightX = w * 0.72;
  for (var k = 0; k < rightText.length; k++) {
    ctx.fillText(rightText[k], rightX - 90 + k * 60, centerY);
  }

  // Divider fist bump icon
  ctx.font = '60px serif';
  ctx.fillText('👊 👊', w / 2, centerY);

  // Title
  ctx.font = 'bold 36px "Amatic SC"';
  ctx.fillStyle = 'rgb(255, 82, 82)';
  ctx.fillText('#FISTBUMP', w / 2, h - 60);

  // Subtitle
  ctx.font = '20px "Amatic SC"';
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.fillText('knuckle tattoo generator', w / 2, h - 30);

  if (callback) callback(canvas);
}

var lastTattoo;
var currentFont = 'Overpass Mono';

window.onload = function (e) {
  window.onload = null;

  // Randomize with animation
  document.getElementById('randomize').addEventListener('click', function () {
    playBumpAnimation(function () {
      updateTattoo();
    });
  });

  // Font picker
  var fontPicker = document.getElementById('font-picker');
  fontPicker.addEventListener('change', function () {
    currentFont = fontPicker.value;
    setLetterFont(currentFont);
  });

  // Save image (screenshot of fists)
  document.getElementById('save-img').addEventListener('click', function () {
    var content = document.getElementById('content');
    html2canvas(content, { backgroundColor: '#ffffff', useCORS: true }).then(function (canvas) {
      var link = document.createElement('a');
      link.download = 'fistbump.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  });

  // Share
  document.getElementById('share').addEventListener('click', function () {
    var url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: url
      });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(function () {
        var btn = document.getElementById('share');
        btn.textContent = 'Copied!';
        setTimeout(function () { btn.textContent = 'Share'; }, 2000);
      });
    } else {
      window.prompt('Copy this link:', url);
    }
  });

  updateTattoo(decodeURIComponent(window.location.hash));

  // Custom text input
  var input = document.getElementById('custom-text');
  input.addEventListener('input', function () {
    var val = input.value.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    input.value = val;
    if (val.length > 0) {
      var padded = val;
      while (padded.length < 8) {
        padded += ' ';
      }
      draw(padded.slice(0, 8));
      location.hash = '#' + val;
      lastTattoo = '#' + val;
    }
  });

  window.addEventListener("hashchange", function (e) {
    var raw = decodeURIComponent(window.location.hash);
    if (raw != lastTattoo) {
      updateTattoo(raw);
    }
  });

  // Drag to adjust letter position
  var dragTarget = null;
  var dragStartX = 0;
  var dragStartY = 0;
  var origLeft = 0;
  var origTop = 0;

  document.querySelectorAll('span.letter').forEach(function (el) {
    el.addEventListener('mousedown', function (e) {
      e.preventDefault();
      dragTarget = el;
      dragTarget.classList.add('dragging');
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      origLeft = parseInt(el.style.left || '0', 10);
      origTop = parseInt(el.style.top || '0', 10);
    });

    el.addEventListener('touchstart', function (e) {
      dragTarget = el;
      dragTarget.classList.add('dragging');
      var touch = e.touches[0];
      dragStartX = touch.clientX;
      dragStartY = touch.clientY;
      origLeft = parseInt(el.style.left || '0', 10);
      origTop = parseInt(el.style.top || '0', 10);
    }, { passive: true });
  });

  document.addEventListener('mousemove', function (e) {
    if (!dragTarget) return;
    var dx = e.clientX - dragStartX;
    var dy = e.clientY - dragStartY;
    dragTarget.style.left = (origLeft + dx) + 'px';
    dragTarget.style.top = (origTop + dy) + 'px';
  });

  document.addEventListener('touchmove', function (e) {
    if (!dragTarget) return;
    var touch = e.touches[0];
    var dx = touch.clientX - dragStartX;
    var dy = touch.clientY - dragStartY;
    dragTarget.style.left = (origLeft + dx) + 'px';
    dragTarget.style.top = (origTop + dy) + 'px';
  }, { passive: true });

  document.addEventListener('mouseup', function () {
    if (dragTarget) {
      dragTarget.classList.remove('dragging');
      dragTarget = null;
    }
  });

  document.addEventListener('touchend', function () {
    if (dragTarget) {
      dragTarget.classList.remove('dragging');
      dragTarget = null;
    }
  });
}
