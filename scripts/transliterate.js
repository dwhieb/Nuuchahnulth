/**
 * This script converts the raw, manually-entered transcriptions in the practical typing system
 * to the original orthography used in the published versions of the texts
 */

import alignWords        from '@digitallinguistics/word-aligner';
import convertQuotes     from 'smartquotes';
import { createRequire } from 'module';
import fs                from 'fs-extra';
import ProgressBar       from 'progress';
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
  .map((lines, i) => {

    const [num] = lines;
    let [, transcript] = lines;

    if (transcript.includes(`"`)) {
      transcript = transcript
      .replace(`"`, `“`)
      .replace(`"`, `”`);
    }

    if (i !== 0 && transcript.startsWith(`\\trs`)) {

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

  await emptyDir(`texts/interlinear`);

  const rawTextFilePaths = await readDir(`texts/raw`);
  let   combinedConvertedTexts = ``;
  let   combinedRawTexts       = ``;

  const progressBar = new ProgressBar(`:bar :current :total :percent :eta`, { total: rawTextFilePaths.length });

  for (const filename of rawTextFilePaths) {

    const headerRegExp = /---.+---/gsu;
    let   text         = await readFile(`texts/raw/${filename}`, `utf8`);

    combinedRawTexts += text;

    const [header] = text.match(headerRegExp);
    text           = text.replace(header, ``);
    text           = text.trim();
    text           = convertText(text);
    text           = `${header}\r\n${text}`;

    await writeFile(`texts/interlinear/${filename}`, text, `utf8`);

    combinedConvertedTexts += text;
    combinedConvertedTexts += `\r\n`;

    progressBar.tick();

  }

  await writeFile(`texts/combined-interlinear.txt`, combinedConvertedTexts);
  await writeFile(`texts/combined-raw.txt`, combinedRawTexts);

}

convertFiles()
.catch(console.error);
