const fs = require('fs');

class Markov {
  constructor() {
    this.choices = {};
    // Converts file to bytes to string to array of words
    const words = fs.readFileSync('./sentences.txt').toString().toLowerCase().split(/\r\n| /);
    for(let i = 0; i < words.length - 1; i++) {
      // Remove periods before pushing to object
      words[i] = words[i].replace(/\./g, "");
      if(i == 0 || i == words.length - 2) {
        words[i + 1] = words[i + 1].replace(/\./g, "");
      }
      // Add word to array if it exists in choices
      if(words[i] in this.choices) {
        this.choices[words[i]].push(words[i + 1]);
      // Create the word array otherwise
      } else {
        this.choices[words[i]] = [words[i + 1]];
      }
    }
  }

  generate(min, max, hideWord) {
    const maxLength = Math.floor((Math.random() * (max - min)) + min);
    let chain;
    do {
      chain = [this.getRandom(Object.keys(this.choices))];
      while(chain.length < maxLength) {
        // Choose a random next word
        const possibleWords = this.choices[chain[chain.length - 1]];
        if(possibleWords) {
          chain.push(this.getRandom(possibleWords));
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

  getRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
}

const markov = new Markov();
module.exports = markov;