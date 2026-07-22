(() => {
  const glyphs = {
    A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
    B: ['11110', '10001', '10001', '11110', '10001', '10001', '11110'],
    C: ['01111', '10000', '10000', '10000', '10000', '10000', '01111'],
    D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
    E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
    F: ['11111', '10000', '10000', '11110', '10000', '10000', '10000'],
    G: ['01111', '10000', '10000', '10011', '10001', '10001', '01110'],
    H: ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
    I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
    J: ['00111', '00010', '00010', '00010', '10010', '10010', '01100'],
    K: ['10001', '10010', '10100', '11000', '10100', '10010', '10001'],
    L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
    M: ['10001', '11011', '10101', '10101', '10001', '10001', '10001'],
    N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
    O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
    P: ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
    Q: ['01110', '10001', '10001', '10001', '10101', '10010', '01101'],
    R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
    S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
    T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
    U: ['10001', '10001', '10001', '10001', '10001', '10001', '01110'],
    V: ['10001', '10001', '10001', '10001', '10001', '01010', '00100'],
    W: ['10001', '10001', '10001', '10101', '10101', '10101', '01010'],
    X: ['10001', '10001', '01010', '00100', '01010', '10001', '10001'],
    Y: ['10001', '10001', '01010', '00100', '00100', '00100', '00100'],
    Z: ['11111', '00001', '00010', '00100', '01000', '10000', '11111'],
  };

  const normalize = (text) =>
    text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z\s]/g, ' ')
      .toUpperCase();

  function renderPixelTitles() {
    document.querySelectorAll('.js-pixel-title').forEach((title) => {
    const text = title.getAttribute('aria-label') || title.textContent.trim();
    const fallback = title.querySelector('.fallback-title') || document.createElement('span');
    fallback.className = 'fallback-title';
    fallback.textContent = text;
    title.classList.add('pixel-ready');
    title.textContent = '';
    title.append(fallback);

    normalize(text)
      .split(/\s+/)
      .filter(Boolean)
      .forEach((word) => {
        const wordEl = document.createElement('span');
        wordEl.className = 'pixel-word';
        wordEl.setAttribute('aria-hidden', 'true');

        [...word].forEach((char) => {
          const rows = glyphs[char] || glyphs.A;
          const letterEl = document.createElement('span');
          letterEl.className = 'pixel-letter';
          letterEl.setAttribute('aria-hidden', 'true');

          rows.forEach((row, y) => {
            [...row].forEach((value, x) => {
              if (value !== '1') return;
              const cell = document.createElement('span');
              cell.className = `pixel-cell r${y}`;
              cell.style.setProperty('--x', x);
              cell.style.setProperty('--y', y);
              letterEl.append(cell);
            });
          });

          wordEl.append(letterEl);
        });

        title.append(wordEl);
      });
    });
  }

  window.renderPixelTitles = renderPixelTitles;
  renderPixelTitles();
})();
