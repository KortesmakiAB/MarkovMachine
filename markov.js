/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n\.\!]+/);
    this.words = words.filter(c => c !== "");
    this.words = this.words.map(word => {
      if (word !=='I') return word.toLowerCase()
    });
    this.chains = this.makeChains();
  }

  /** set markov chains:
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const chain = {};
    let i = 0;
    for (let i = 0; i < this.words.length; i++){
      if (!chain[this.words[i]]) chain[this.words[i]] = [];
      
      if (i === this.words.length - 1) chain[this.words[i]].push(null);
      else chain[this.words[i]].push(this.words[i + 1]);
    }
    return chain;
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let text;
    
    // helper functions
    const randIdx = length => Math.floor(Math.random() * length);
    const concatText = newText => text ? text.concat(' ', newText) : newText;
    const concatWithPeriod = () => text.concat('.');
    
    function capitalizeFirstLetter(word) {
      const firstL = word[0].toUpperCase();
      const rest = word.slice(1);
      return firstL.concat(rest);
    }

    function pickStartingWord(chainsObj) {
      const keysArr = Object.keys(chainsObj);
      const startingIdx = randIdx(keysArr.length);
      return keysArr[startingIdx];
    }
    
    function pickNextword(chainsObj, word){
      if (chainsObj[word]) {
        const randIndex = randIdx(chainsObj[word].length);
        return chainsObj[word][randIndex];
      }
      else return false;
    }

    function makeSentence(chainsObj){
      const startingWord = pickStartingWord(chainsObj);
      const capilatized = capitalizeFirstLetter(startingWord);
      text = concatText(capilatized);
      i++;

      // while there is a a word, keep picking a next word and concatText
      let nextWord = startingWord;
      while (nextWord && i < numWords) {
        nextWord = pickNextword(chainsObj, nextWord)
        if (nextWord) {
          text = concatText(nextWord);
          i++;
        }
        else {
          text = concatWithPeriod();
        }
      }
    }

    let i = 0;
    while (i < numWords){
      makeSentence(this.chains);
    }

    text = text.concat('.');
    console.log(text);
    return text;      
  }
}

// const mm = new MarkovMachine();
// mm.makeText()


module.exports = { MarkovMachine };