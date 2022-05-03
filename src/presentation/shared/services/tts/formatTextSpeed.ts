const phoneTextTTS = (text: string) => {
  return text.replace(/()/g, ' ');
};
const codeTextTTS = (text: string) => {
  return text.replace(/()/g, ',,');
};

export { phoneTextTTS, codeTextTTS };
