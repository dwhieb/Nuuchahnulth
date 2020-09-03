/**
 * This script converts the transliterated versions of the texts
 * to DLx JSON format: https://format.digitallinguistics.io
 */

/* eslint-disable
  no-param-reassign,
*/

import convert       from '@digitallinguistics/scription2dlx';
import createSpinner from 'ora';
import fs            from 'fs-extra';
import ProgressBar   from 'progress';
import { Text }      from '@digitallinguistics/javascript/models';
import yamljs        from 'yamljs';

const { parse: parser } = yamljs;

const {
  emptyDir,
  readdir: readDir,
  readFile,
  writeJSON,
} = fs;

const punctuationRegExp = /[.,!?'"‘’“”():-]+/gu;
const spinner           = createSpinner(`Converting texts to JSON format`).start();

async function convertTexts() {

  await emptyDir(`texts/json`);

  const filenames   = await readDir(`texts/interlinear`);
  const progressBar = new ProgressBar(`:bar :current :total :percent :eta`, { total: filenames.length });

  for (let filename of filenames) {

    const options = {
      alignmentError: true,
      parser,
    };

    const scription = await readFile(`texts/interlinear/${filename}`, `utf8`);
    const text      = new Text(convert(scription, options));

    text.utterances.forEach(utterance => {

      delete utterance[`trs-en`]; // TODO: remove this once scription2dlx issue #136 is closed
      if (!(utterance.words && utterance.transcript.size)) return;
      if (utterance.transcript.has(`en`)) return;

      const tokens = tokenize(utterance.transcript.get(`default`));

      if (tokens.length === utterance.words.length) {

        tokens.forEach((token, i) => {
          utterance.words[i].transcription = new Map(Object.entries({ default: token }));
        });

      }

      utterance.transcription = new Map(Object.entries({ default: tokens.join(` `) }));

    });

    filename = filename.replace(`.txt`, `.json`);
    await writeJSON(`texts/json/${filename}`, text, { spaces: 2 });

    progressBar.tick();

  }

}

function tokenize(transcript) {
  return transcript
  .trim()
  .replace(punctuationRegExp, ``)
  .split(/\s+/gu);
}

convertTexts()
.then(() => spinner.succeed(`All texts converted`))
.catch(e => {
  spinner.fail(e.message);
  throw e;
});
