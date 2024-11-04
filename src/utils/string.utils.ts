export const firstLetterUppercase = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const removeUnecessaryWhiteSpace = (str: string): string => {
  return str.replace(/\s+/g, ' ').trim();
};

export const formatBillTextDynamic = (text: string): string => {
  const beforeHyphenMatch = text.match(/^(.*?)\s*-\s*[A-Z]/);
  const afterHyphenMatch = text.match(/[a-zA-Z0-9]\s*-\s*(.*)$/);

  // If it matches a pattern with uppercase after the hyphen, return text before
  if (beforeHyphenMatch) {
    return beforeHyphenMatch[1].trim();
  }

  // If it matches a pattern with text after the hyphen, return text after
  if (afterHyphenMatch) {
    return afterHyphenMatch[1].trim();
  }

  // Return original text if no pattern matches
  return text.trim();
}