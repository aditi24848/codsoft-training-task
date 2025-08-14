const input = document.getElementById('inputBox');
const buttons = Array.from(document.querySelectorAll('button'));
let expr = "";

buttons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const v = e.target.innerText;

    if (v === 'AC') {
      expr = "";
      input.value = "";
      return;
    }

    if (v === 'DEL') {
      expr = expr.slice(0, -1);
      input.value = expr;
      return;
    }

    if (v === '%') {
      // treat % as last-number / 100 (e.g., 50% -> 0.5)
      const m = expr.match(/(\d+\.?\d*)$/);
      if (m) {
        const num = m[1];
        expr = expr.slice(0, -num.length) + "(" + num + "/100)";
        input.value = expr;
      } else if (expr) {
        expr = "(" + expr + ")/100";
        input.value = expr;
      }
      return;
    }

    if (v === '=') {
      try {
        const result = eval(expr);
        expr = String(result);
        input.value = expr;
      } catch (err) {
        input.value = "Error";
        expr = "";
      }
      return;
    }

    // append numbers/operators
    expr += v;
    input.value = expr;
  });
});
