module.exports = (firstWord, secondWord, options) => {
  if (firstWord === secondWord) {
    return options.fn(this);
  }
  return options.inverse(this);
};
