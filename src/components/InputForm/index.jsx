import React, { useState, useEffect, useRef } from "react";

const InputForm = ({ onGenerate }) => {
  const [wordLength, setWordLength] = useState(5);
  const [numWords, setNumWords] = useState(10);
  const [targetProbability, setTargetProbability] = useState(0.003);
  const [characterInputs, setCharacterInputs] = useState(Array(5).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    setCharacterInputs(Array(parseInt(wordLength)).fill(""));
    inputRefs.current = inputRefs.current.slice(0, parseInt(wordLength));
  }, [wordLength]);

  const handleWordLengthChange = (event) => {
    const newLength = parseInt(event.target.value, 10);
    if (!isNaN(newLength) && newLength > 1) {
      setWordLength(newLength);
    } else {
      setWordLength(2);
    }
  };

  const handleNumWordsChange = (event) => {
    const newNumWords = parseInt(event.target.value, 10);
    if (!isNaN(newNumWords) && newNumWords > 0) {
      setNumWords(newNumWords);
    } else {
      setNumWords(1);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onGenerate(wordLength, numWords, targetProbability, characterInputs);
  };

  const handleCharacterChange = (index, value) => {
    const updatedInputs = [...characterInputs];
    updatedInputs[index] = value;
    setCharacterInputs(updatedInputs);

    if (value && index + 1 < characterInputs.length) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <form className="inputForm" onSubmit={handleSubmit}>
      <div>
        <label>
          Word Length:
          <input
            type="number"
            className="inputField"
            value={wordLength}
            onChange={handleWordLengthChange}
          />
        </label>
      </div>
      <div>
        <label>
          Number of Words:
          <input
            type="number"
            className="inputField"
            value={numWords}
            onChange={handleNumWordsChange}
          />
        </label>
      </div>
      <div>
        <label>
          Target Probability:
          <input
            type="number"
            className="inputField"
            step="0.0001"
            max="1"
            min="0"
            value={targetProbability}
            onChange={(e) => setTargetProbability(parseFloat(e.target.value))}
          />
        </label>
      </div>
      <div className="characterInputs">
      
        <label>
          Required characters: </label>
          <div className="charForm">
          {characterInputs.map((char, index) => (
            <input
              key={index}
              type="text"
              autoCapitalize="none"
              className="charField"
              maxLength="1"
              value={char}
              onChange={(e) => handleCharacterChange(index, e.target.value)}
              ref={(el) => (inputRefs.current[index] = el)}
              placeholder={`${index + 1}`}
            />
          ))}
       
      </div>
      </div>
      <button className="calculateButton" type="submit">
        Generate
      </button>
    </form>
  );
};

export default InputForm;
