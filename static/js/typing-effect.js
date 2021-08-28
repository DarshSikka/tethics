const typingEffect = (selector, word1, word2) => {
  const heading = document.querySelector(selector);
  let letters = word1.split("");
  let letters1 = word1.split("");
  const letters2 = word2.split("");
  let del = true;
  console.log(letters);
  let currentLetters = letters;
  window.setInterval(() => {
    const headingValue = heading.innerText;
    const len = headingValue.length;
    if (del) {
      const joinedText = letters.filter((ele, i) => {
        if (i < len - 1) {
          return ele;
        }
      });
      currentLetters = joinedText;
      heading.innerHTML = joinedText.join("");
      if (heading.innerHTML.length === 0) {
        console.log(letters[0] == letters1[0]);
        if (letters === letters2) {
          letters = letters1;
        } else {
          letters = letters2;
        }
        del = false;
      }
    } else {
      if (!letters[len]) {
        del = true;
      } else {
        console.log(letters);
        heading.innerHTML += letters[len];
      }
    }
  }, 200);
};
