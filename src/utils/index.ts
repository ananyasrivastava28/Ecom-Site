export const upperFirst = (arg: string) => {
  return arg ? arg.charAt(0).toUpperCase() + arg.slice(1) : "";
};

export function sliceWords(sentence: string, numberOfWords: number) {
  return sentence.split(" ").slice(0, numberOfWords).join(" ");
}