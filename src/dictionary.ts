export default fetch(`words_alpha.txt`)
  .then((r) => r.text())
  .then((r) => r.split("\n").map((w) => w.trim()));
