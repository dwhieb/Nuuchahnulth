/**
 * This script converts the raw, manually-entered transcriptions in the practical typing system
 * to the original orthography used in the published versions of the texts
 */

/* eslint-disable
  no-await-in-loop,
*/

import alignWords        from '@digitallinguistics/word-aligner';
import convertQuotes     from 'smartquotes';
import { createRequire } from 'module';
import fs                from 'fs-extra';
import { transliterate } from '@digitallinguistics/transliterate/transliterate.js';

const require = createRequire(import.meta.url);

const {
  emptyDir,
  readdir: readDir,
  readFile,
  writeFile,
} = fs;

const substitutions = require(`../transliteration.json`);

function convertText(text) {

  const newLineRegExp      = /(?:\r\n)+/gu;
  const newUtteranceRegExp = /\r\n\s*\r\n/gu;

  return text
  .split(newUtteranceRegExp)
  .map(u => u.split(newLineRegExp))
  .map(u => u.filter(Boolean))
  .map(u => u.map(line => line.trim()))
  .map(lines => {

    const [num] = lines;
    let [, transcript] = lines;

    if (transcript.includes(`"`)) {
      transcript = transcript.replace(`"`, `“`).replace(`"`, `”`);
    }

    if (transcript.startsWith(`\\trs`)) {

      const [,, tln] = lines;

      transcript = transcript.startsWith(`\\trs-en`) ?
        convertQuotes(transcript) :
        transliterate(transcript, substitutions);

      return [num, transcript, convertQuotes(tln)];

    }

    const [,, morphemes, glosses, literal, translation, note] = lines;

    const words = [
      transliterate(transcript, substitutions),
      transliterate(morphemes, substitutions),
      glosses,
      literal,
    ];

    return [
      num,
      ...alignWords(words),
      convertQuotes(translation),
      convertQuotes(note || ``),
    ];

  })
  .map(u => u.join(`\r\n`).trim())
  .join(`\r\n\r\n`);

}

async function convertFiles() {

  await emptyDir(`texts/converted`);

  const rawTextFilePaths = await readDir(`texts/raw`);
  let   combinedConvertedTexts = ``;
  let   combinedRawTexts       = ``;

  for (const filename of rawTextFilePaths) {

    const headerRegExp = /---.+---/gsu;
    let   text         = await readFile(`texts/raw/${filename}`, `utf8`);

    combinedRawTexts += text;

    const [header] = text.match(headerRegExp);
    text           = text.replace(header, ``);
    text           = text.trim();
    text           = convertText(text);
    text           = `${header}\r\n${text}`;

    await writeFile(`texts/converted/${filename}`, text, `utf8`);

    combinedConvertedTexts += text;
    combinedConvertedTexts += `\r\n`;

  }

  await writeFile(`texts/combined-converted.txt`, combinedConvertedTexts);
  await writeFile(`texts/combined-raw.txt`, combinedRawTexts);

}

convertFiles().catch(console.error);
