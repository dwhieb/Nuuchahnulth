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

    const text = await readFile(`texts/interlinear/${filename}`, `utf8`);
    const json = convert(text, options);

    filename = filename.replace(`.txt`, `.json`);
    await writeJSON(`texts/json/${filename}`, json, { spaces: 2 });

    progressBar.tick();

  }

}

convertTexts()
.then(() => spinner.succeed(`All texts converted`))
.catch(e => {
  spinner.fail(e.message);
  throw e;
});
