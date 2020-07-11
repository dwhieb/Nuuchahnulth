import fs   from 'fs-extra';
import path from 'path';

const {
  readdir: readDir,
  readJSON,
  writeJSON,
} = fs;

/**
 * Searches the entire Nuuchahnulth corpus using the provided search function,
 * and saves any changes that are made to the corpus, overwriting old files
 * @param {Function} searchFunction    A function that accepts an utterance as an argument, and returns an updated utterance. Return the original utterance if no changes need to be made.
 * @param {Object}   [options={}]      An options hash
 * @param {Boolean}  [options.testRun] Whether to resave the files over the originals (testRun = false), or as a new file (testRun = true). Defaults to true.
 */
export default async function findAndReplace(searchFunction = u => u, { testRun = true } = {}) {

  const jsonPath  = path.join(`texts`, `json`);
  const filenames = await readDir(jsonPath);

  await Promise.all(filenames.map(async filename => {
    const filePath = path.join(jsonPath, filename);
    const text = await readJSON(filePath);
    text.utterances = text.utterances.map(searchFunction);
    const writePath = testRun ? filePath.replace(`.json`, `-updated.json`) : filePath;
    await writeJSON(writePath, text, { spaces: 2 });
  }));

}
