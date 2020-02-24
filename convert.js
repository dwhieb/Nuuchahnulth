import fs from 'fs';
import dlx from '@digitallinguistics/transliterate';

const { transliterate } = dlx;

const {
  readdir: readDir,
  readFile,
  writeFile,
} = fs.promises;

let subs = {};

async function convertText(filename) {

  let text       = await readFile(`./texts/raw/${filename}`, `utf8`);
  const [header] = text.match(/---.+---/gsu);
  text           = text.replace(/---.+---/gsu, ``);
  text           = text.trim();

  let utterances = text.split(/\n\s*\n/gu);
  utterances     = utterances.map(u => u.split(/[\n\r]+/gu));
  utterances     = utterances.map(u => u.filter(line => line));
  utterances     = utterances.map(u => u.map(line => line.trim()));
  utterances     = utterances.map(([num, trs, txn, ...lines]) => [num, transliterate(trs, subs), transliterate(txn, subs), ...lines]);
  utterances     = utterances.map(u => u.join(`\r\n`));
  text           = utterances.join(`\r\n\r\n`);
  text           = `${header}\r\n\r\n\r\n${text}`;
  await writeFile(`./texts/converted/${filename}`, text, `utf8`);
  return text;

}

async function convertTexts() {

  subs = await readFile(`./transliteration.json`, `utf8`);
  subs = JSON.parse(subs);

  const rawTextFilePaths = await readDir(`./texts/raw`);
  const convertedTexts = await Promise.all(rawTextFilePaths.map(convertText));
  const combinedTexts = convertedTexts.join(`\r\n`);
  await writeFile(`./texts/converted/combined.txt`, combinedTexts);

}

convertTexts().catch(console.error);
