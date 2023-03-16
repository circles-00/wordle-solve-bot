export const cyrilicToLatin = (letter: string) => {
  // macedonian to latin
  const cyrilicToLatinMap = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    ѓ: ']',
    е: 'e',
    ж: '\\',
    з: 'z',
    ѕ: 'y',
    и: 'i',
    ј: 'j',
    к: 'k',
    л: 'l',
    љ: 'q',
    м: 'm',
    н: 'n',
    њ: 'w',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    ќ: "'",
    у: 'u',
    ф: 'f',
    х: 'h',
    ц: 'c',
    ч: ';',
    џ: 'x',
    ш: '[',
  }

  return cyrilicToLatinMap[letter]
}
