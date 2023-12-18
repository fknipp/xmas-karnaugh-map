const tableElement = document.querySelector('table.km');

const term =
  '(A && !C) || (!B && !D) || (A && B && !D) || (!A && B && !C && !D)';

function writeTerm(term) {
  const termElement = document.querySelector('.term span');
  termElement.innerHTML = term
    .replace(/&&/g, '&and;')
    .replace(/\|\|/g, '&or;')
    .replace(/!/g, '&not');
}

writeTerm(term);

function checkTable() {
  let count = 0;

  tableElement.querySelectorAll('td').forEach((el) => {
    const content = el.textContent;
    if (!content) return;
    const [A, B, C, D] = el.dataset.bin.split('').map((x) => !!+x);
    const res = eval(term);
    const correct = res === (content === '1');
    el.classList.toggle('correct', correct);
    count += correct;
  });

  return count === 16;
}

function win() {
  const winElement = document.querySelector('.win');
  winElement.classList.add('show');
}

tableElement.addEventListener('click', ({ target }) => {
  if (target.tagName !== 'TD') return;

  const content = target.textContent;
  const newContent = content === '0' ? '1' : '0';
  target.textContent = newContent;
  target.className = `content-${newContent}`;
  if (checkTable()) win();
});
