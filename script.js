"use strict";

(async function () {
  const getRandomWord = async () => {
    const res = await fetch(
      "https://clientes.api.greenborn.com.ar/public-random-word"
    );
    const data = await res.json();
    return data[0];
  };

  const discoverTheWord = (word, visible = []) => {
    const wordEdited = word
      .split("")
      .map((letter, index) => {
        return visible.includes(index) ? letter : "_";
      })
      .join(" ");
    return wordEdited;
  };

  const addWordRecord = (word, inputRecord = []) => {
    const sizeWord = word.split("").map((e, i) => i);
    const filterWord = sizeWord.filter((e) => !inputRecord.includes(e));
    const indexRandom = Math.floor(Math.random() * filterWord.length);
    return inputRecord.concat(filterWord.splice(indexRandom, 1));
  };

  const RANDOM_WORD = await getRandomWord();
  let maxAttempts = 3;
  let clueRecord = [];

  while (maxAttempts > 0) {
    clueRecord = addWordRecord(RANDOM_WORD, clueRecord);

    const guess = prompt(
      `Adivina la palabra: ${discoverTheWord(
        RANDOM_WORD,
        clueRecord
      )}\nTe quedan ${maxAttempts} intentos.`
    );

    if (guess === RANDOM_WORD) {
      alert(`LE ATINASTE! :D\nLa palabra era: ${RANDOM_WORD}`);
      break;
    }

    if (maxAttempts === 1) {
      alert(`Te has quedado sin intentos :(\nLa palabra era: ${RANDOM_WORD}`);
    }

    maxAttempts--;
  }
})();
