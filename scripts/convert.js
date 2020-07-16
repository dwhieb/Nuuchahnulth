/* eslint-disable
  no-await-in-loop,
*/

import convert       from '@digitallinguistics/scription2dlx';
import createSpinner from 'ora';
import fs            from 'fs-extra';
import ProgressBar   from 'progress';
import yamljs        from 'yamljs';

const { parse: parser } = yamljs;

const {
  emptyDir,
  readdir: readDir,
  readFile,
  writeJSON,
} = fs;

const spinner = createSpinner(`Converting texts to JSON format`).start();

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
    const text      = convert(scription, options);

    text.utterances.forEach(utterance => {

      if (!(utterance.words && utterance.transcript)) return;

      const tokens = tokenize(utterance.transcript);

      if (tokens.length === utterance.words.length) {

        tokens.forEach((token, i) => {
          // eslint-disable-next-line no-param-reassign
          utterance.words[i].transcription = token;
        });

      }

    });

    filename = filename.replace(`.txt`, `.json`);
    await writeJSON(`texts/json/${filename}`, text, { spaces: 2 });

    progressBar.tick();

  }

}

function tokenize(transcript) {
  return transcript
  .trim()
  .replace(/[.,!?'"‘’“”():-]+/gu, ``)
  .split(/\s+/gu);
}

convertTexts()
.then(() => spinner.succeed(`All texts converted`))
.catch(e => {
  spinner.fail(e.message);
  throw e;
});
