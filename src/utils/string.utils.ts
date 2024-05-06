export const firstLetterUppercase = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const removeUnecessaryWhiteSpace = (str: string): string => {
  return str.replace(/\s+/g, ' ').trim();
};
