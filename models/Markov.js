const fs = require('fs');

class Markov {
  static options = {};

  static init() {
    // Converts file to bytes to string to array of words
    const words = fs.readFileSync('./sentences.txt').toString().toLowerCase().split(/\r\n| /);
    for(let i = 0; i < words.length - 1; i++) {
      // Remove periods before pushing to object
      words[i] = words[i].replace(/\./g, "");
      if(i == 0 || i == words.length - 2) {
        words[i + 1] = words[i + 1].replace(/\./g, "");
      }
      // Add word to array if it exists in options
      if(words[i] in Markov.options) {
        Markov.options[words[i]].push(words[i + 1]);
      // Create the word array otherwise
      } else {
        Markov.options[words[i]] = [words[i + 1]];
      }
    }
  }

  static generate(min, max, hideWord) {
    const maxLength = Math.floor((Math.random() * (max - min)) + min);
    let chain;
    do {
      chain = [Markov.choose(Object.keys(Markov.options))];
      while(chain.length < maxLength) {
        // Choose a random next word
        const possibleWords = Markov.options[chain[chain.length - 1]];
        if(possibleWords) {
          chain.push(Markov.choose(possibleWords));
        } else {
          break;
        }
      }
    } while(chain.length < min);

    // Capitalize first letter of generated card
    chain[0] = chain[0].charAt(0).toUpperCase() + chain[0].slice(1);
    if(hideWord) {
      chain[Math.floor(Math.random() * chain.length)] = "___";
    }
    return chain.join(" ");
  }

  static choose(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
}

module.exports = Markov;