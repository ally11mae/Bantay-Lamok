// Pricing page: setup builder
(function () {
  var PRICES = {
    diy:   { base: 2500, node: 1200 },   // hub + first node, each extra node
    ready: { base: 3000, node: 1500 }
  };
  var MAX = 10;
  var mode = 'diy';
  var n = 3;

  var range = document.getElementById('nodes');
  if (!range) return;

  var totalEl = document.getElementById('total');
  var breakdownEl = document.getElementById('breakdown');
  var pertrapEl = document.getElementById('pertrap');
  var countEl = document.getElementById('count');
  var barsEl = document.getElementById('bars');
  var segBtns = document.querySelectorAll('.seg button');

  function peso(v) { return '₱' + Math.round(v).toLocaleString('en-US'); }
  function cost(count) { var p = PRICES[mode]; return p.base + (count - 1) * p.node; }

  function buildBars() {
    var html = '';
    for (var i = 1; i <= MAX; i++) {
      html += '<button type="button" class="col" data-n="' + i + '" aria-label="' + i + (i === 1 ? ' trap' : ' traps') + '">' +
              '<div class="track"><i></i></div><span>' + i + '</span></button>';
    }
    barsEl.innerHTML = html;
    barsEl.addEventListener('click', function (e) {
      var b = e.target.closest('.col');
      if (b) { n = parseInt(b.getAttribute('data-n'), 10); render(); }
    });
  }

  function render() {
    var p = PRICES[mode];
    var total = cost(n);
    totalEl.textContent = peso(total);
    pertrapEl.textContent = peso(total / n);
    countEl.textContent = n + (n === 1 ? ' trap' : ' traps');
    range.value = n;
    range.setAttribute('aria-valuetext', countEl.textContent);

    breakdownEl.textContent = n === 1
      ? 'Hub + 1 node, ' + peso(p.base)
      : 'Hub + first node ' + peso(p.base) + ', plus ' + (n - 1) + ' extra node' + (n - 1 === 1 ? '' : 's') + ' at ' + peso(p.node);

    var cols = barsEl.children;
    for (var i = 0; i < cols.length; i++) {
      var c = i + 1;
      var h = (cost(c) / c) / p.base * 100;
      cols[i].querySelector('i').style.height = h + '%';
      cols[i].classList.toggle('on', c === n);
    }

    segBtns.forEach(function (b) {
      b.setAttribute('aria-checked', b.getAttribute('data-mode') === mode ? 'true' : 'false');
    });
  }

  segBtns.forEach(function (b) {
    b.addEventListener('click', function () { mode = b.getAttribute('data-mode'); render(); });
  });
  range.addEventListener('input', function () { n = parseInt(range.value, 10); render(); });
  document.getElementById('minus').addEventListener('click', function () { if (n > 1) { n--; render(); } });
  document.getElementById('plus').addEventListener('click', function () { if (n < MAX) { n++; render(); } });

  buildBars();
  render();
})();
