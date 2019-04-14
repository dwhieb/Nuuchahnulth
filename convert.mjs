import fs from 'fs';
import dlx from '@digitallinguistics/transliterate';

const { transliterate } = dlx;

const {
  readFile,
  writeFile,
} = fs.promises;

async function main() {

  let subs       = await readFile(`./transliteration.json`, `utf8`);
  subs           = JSON.parse(subs);
  let text       = await readFile(`./texts/GL1.txt`, `utf8`);
  text           = text.replace(/---.+---/gsu, ``);
  text           = text.trim();
  let utterances = text.split(/\n\s*\n/gu);
  utterances     = utterances.map(u => u.split(/[\n\r]+/gu));
  utterances     = utterances.map(u => u.filter(line => line));
  utterances     = utterances.map(u => u.map(line => line.trim()));
  utterances     = utterances.map(([trs, ...lines]) => [transliterate(trs, subs), ...lines]);
  utterances     = utterances.map(([trs, txn, ...lines]) => [trs, transliterate(txn, subs), ...lines]);
  utterances     = utterances.map(u => u.join(`\r\n`));
  text           = utterances.join(`\r\n\r\n`);
  await writeFile(`converted.txt`, text, `utf8`);

}

main().catch(console.error);
