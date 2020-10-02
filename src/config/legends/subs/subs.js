import cyrillic from "./cyrillic.json";
import hiragana from "./hiragana.json";
import katakana from "./katakana.json";
import hangul from "./hangul.json";
import arabic from "./arabic.json";
import greek from "./greek.json";
import hebrew from "./hebrew.json";
import chinese from "./chinese.json";
import devanagari from "./devanagari.json";
import czech from "./czech.json";

const SUBS = {
  arabic: arabic,
  cyrillic: cyrillic,
  chinese: chinese,
  greek: greek,
  hangul: hangul,
  hebrew: hebrew,
  hiragana: hiragana,
  katakana: katakana,
  devanagari: devanagari,
  czech: czech,
};

export default SUBS;

export const subOptions = Object.keys(SUBS);
