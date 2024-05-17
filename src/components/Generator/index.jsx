import React, { useState, useEffect } from "react";
import OutputDisplay from "../OutputDisplay";
import InputForm from "../InputForm";
import {getBigram, getRandomBigram, getY_X} from "../BigramWeigher";
import DataLoader from "../DataLoader";
import ProbabilityCalculator from "../ProbabilityCalculator";

const Generator = () => {
  const [bigrams, setBigrams] = useState([]);
  const [pseudowords, setPseudowords] = useState([]);
  const [dataChoice, setDataChoice] = useState("orthotactic");

  const generatePseudoword = (bigrams, wordLength, characterInputs) => {
    let word = Array.from({ length: wordLength }, () => "");

    characterInputs.forEach((char, index) => {
      if (char) {
        word[index] = char;
      }
    });

    for (let i = 0; i < wordLength - 1; i++) {
      const currentCharacter = word[i]
      const nextCharacter = word[i + 1]
      // we have to be careful in special cases: __X and Y_X
      let nextNextCharacter
      if (i < wordLength - 2) {
        nextNextCharacter = word[i + 2]
      }

      if (currentCharacter) {
        if (nextCharacter) {
          continue;
        }

        // nextCharaccter is empty
        if (nextNextCharacter) {
          // we have Y_X
          const missingCharacter = getY_X(bigrams, currentCharacter, nextNextCharacter,  i + 1);
          if (missingCharacter) {
            word[i + 1] = missingCharacter;
          } else {
            console.error(`Did not find character suitable for X_Y. pos:${i}, word:${word.join("")}`)
          }
        } else {
          // next position is empty -> find suitable candidate
          const randomBigram = getBigram(bigrams, currentCharacter,  i + 1, 0);
          if (randomBigram) {
            word[i + 1] = randomBigram[1];
          } else {
            console.error(`Did not find bigram 0. pos:${i}, word:${word.join("")}`)
          }
        }
      } else {
        // current position is empty
        if (nextCharacter) {
          // and there is letter next to us
          const randomBigram = getBigram(bigrams, nextCharacter,  i + 1, 1);
          if (randomBigram) {
            word[i] = randomBigram[0];
          } else {
            console.error(`Did not find bigram 1. pos:${i}, word:${word.join("")}`)
          }
        } else {
          if (nextNextCharacter) {
            // we have __X -> generate bigram ending with X and use this to generate additional one
            const randomNextBigram = getBigram(bigrams, nextNextCharacter,  i + 2, 1);
            if (randomNextBigram) {
              const randomBigram = getBigram(bigrams, randomNextBigram[0],  i + 1, 1);
              if (randomBigram) {
                word[i] = randomBigram[0];
                word[i + 1] = randomNextBigram[0];
                i++ // we filled position so advance to next one
              } else {
                console.error(`Did not find bigram pos:${i}, word:${word.join("")}`)
              }
            } else {
              console.error(`Did not find nextBigram pos:${i}, word:${word.join("")}`)
            }
          } else {
            // no restriction
            const bigram = getRandomBigram(bigrams, i + 1)
            word[i] = bigram[0]
            word[i + 1] = bigram[1]
          }
        }
      }
    }

    return word;
  };

  const handleGenerate = (
    wordLength,
    numWords,
    targetProbability,
    characterInputs
  ) => {
    console.log(
      "Generating words with:",
      wordLength,
      numWords,
      targetProbability,
      characterInputs
    );
    const newPseudowords = [];
    const tolerance = 0.0001;
    const maxAttempts = 1000;
    const generatedWordsSet = new Set();

    for (let i = 0; i < numWords; i++) {
      let generatedWord, generatedWordAsList, probability;
      let attempts = 0;
      do {
        generatedWordAsList = generatePseudoword(
          bigrams,
          parseInt(wordLength),
          characterInputs
        );
        probability = ProbabilityCalculator({
          bigramsData: bigrams,
          word: generatedWordAsList,
        });
        generatedWord = generatedWordAsList.join("")
        attempts++;
      } while (
        (Math.abs(probability - targetProbability) > tolerance ||
          generatedWordsSet.has(generatedWord)) &&
        attempts < maxAttempts
      );

      if (!generatedWordsSet.has(generatedWord)) {
        generatedWordsSet.add(generatedWord);
        newPseudowords.push({ word: generatedWord, probability });
        console.log(
          "Generated word:",
          generatedWord,
          "Probability:",
          probability
        );
      }
    }
    setPseudowords(newPseudowords);
  };

  return (
    <div className="container">
      <DataLoader
        dataChoice={dataChoice}
        setDataChoice={setDataChoice}
        setBigrams={setBigrams}
      />
      <InputForm onGenerate={handleGenerate} dataChoice={dataChoice}/>
      <OutputDisplay words={pseudowords} isPhonotactic={dataChoice === 'phonotactic'}/>
    </div>
  );
};

export default Generator;
