const phoneTextTTS = (text: string) => {
  return text.replace(/()/g, ';;');
};
const phoneTextCords = (text: string) => {
  let newtext = text.replace(/()/g, ';;');
  newtext = newtext.replace('.', 'ponto');
  newtext = newtext.replace('-', 'menos');
  return newtext;
};
const codeTextTTS = (text: string) => {
  return text.replace(/()/g, ';;;;;;;;');
};

export { phoneTextTTS, codeTextTTS, phoneTextCords };
