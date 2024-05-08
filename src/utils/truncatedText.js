export const truncatedText = (text) => (text.length >= 25 ? `${text.substring(0, 25)}...` : text);
