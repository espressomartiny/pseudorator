const getBigram = (bigrams, character, position, characterPosition) => {
  const validBigrams = bigrams.filter(
    (bigram) =>
      bigram &&
      bigram.bigram[characterPosition] === character && 
      bigram.sum_log_freq_pos &&
      bigram.sum_log_freq_pos[position.toString()]
  );
  if (validBigrams.length === 0) { 
    return null;
  }

  const weights = validBigrams.map((bigram) => ({
    bigram: bigram.bigram,
    weight: bigram.sum_log_freq_pos[position.toString()],
  }));
  const totalWeight = weights.reduce((acc, next) => acc + next.weight, 0);
  const random = Math.random() * totalWeight;
  let sum = 0;

  for (const { bigram, weight } of weights) {
    sum += weight;
    if (random <= sum) {
      return bigram;
    }
  }
  
  console.error(`no bigram selected ${character}, ${position}, ${sum}, ${random}`)
  return null;
};

const getRandomBigram = (bigrams, position) => {
  const validBigrams = bigrams.filter(
    (bigram) =>
      bigram &&
      bigram.sum_log_freq_pos &&
      bigram.sum_log_freq_pos[position.toString()]
  );
  const randomIndex = Math.floor(Math.random() * validBigrams.length)
  return validBigrams[randomIndex].bigram
}

const getY_X = (bigrams, left, right, position) => {
  const validLeftBigrams = bigrams.filter(
    (bigram) =>
      bigram &&
      bigram.bigram[0] === left && 
      bigram.sum_log_freq_pos &&
      bigram.sum_log_freq_pos[position.toString()]
  );
  if (validLeftBigrams.length === 0) {
    console.error(`no Y_X bigram selected '${left}_${right}' on position ${position} - couldn't found bigram from left`)
    return null;
  }

  const validRightBigrams = bigrams.filter(
    (bigram) =>
      bigram &&
      bigram.bigram[1] === right && 
      bigram.sum_log_freq_pos &&
      bigram.sum_log_freq_pos[position.toString()]
  );
  if (validRightBigrams.length === 0) {
    console.error(`no Y_X bigram selected '${left}_${right}' on position ${position} - couldn't found bigram from right`)
    return null;
  }

  // find intersectin of the two sets
  const validBigrams = validLeftBigrams.filter(lValue => validRightBigrams.filter(rValue => rValue.bigram[0] == lValue.bigram[1]));
  if (validBigrams.length === 0) {
    console.error(`no Y_X bigram selected '${left}_${right}' on position ${position} - couldn't intersection`)
    return null;
  }

  const randomIndex = Math.floor(Math.random() * validBigrams.length)
  return validBigrams[randomIndex].bigram[1]
}

export {getBigram, getRandomBigram, getY_X}

export default getBigram;
