export const VALID = {
    LANGUAGE: /[\u0D00-\u0D7F]+/g,
    SPECIAL_CHAR: /[^\w\s,.:/-]/g,
    MULTIPLE_SPACE: /\s{2,}/g,
    NEW_LINE: /\n/g,
    MULTIPLE_COMMA: /,\s*,/g,
    TRAILING_COMMA: /,\s*$/,
    NON_LETTERS: /^[^A-Za-z]+/,
    NAME: /(?:Name\s*[:\-]?\s*)?([A-Z][a-z]*\s+(?:[A-Z](?:[a-z]+)?\s*)+)/i,
    DOB: /\b(\d{2}\/\d{2}\/\d{4})\b/,
    GENDER: /\b(Male|Female|Other)\b/i,
    AADHAAR_NUMBER: /\d{4}\s\d{4}\s\d{4}/,
    ADDRESS: /(?:Address|Add|Addr|S\/O|C\/O|D\/O|W\/O)[\s:]+([\s\S]+?)(?=\d{4}\s\d{4}\s\d{4}|\n{2,}|$)/i,
};