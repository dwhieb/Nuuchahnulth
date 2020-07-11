import createSpinner from 'ora';
import fs            from 'fs-extra';
import path          from 'path';
import ProgressBar   from 'progress';

const {
  readdir: readDir,
  readJSON,
  writeJSON,
} = fs;

/**
 * Searches the entire Nuuchahnulth corpus using the provided search function,
 * and saves any changes that are made to the corpus, overwriting old files
 * @param {Function} searchFunction            A function that accepts an utterance as an argument, and returns an updated utterance. Return the original utterance if no changes need to be made.
 * @param {Object}   [options={}]              An options hash
 * @param {Boolean}  [options.testRun=true]    Whether to resave the files over the originals (testRun = false), or as a new file (testRun = true). Defaults to true.
 * @param {Boolean}  [options.searchOnly=true] Whether function is being called for search, or for find and replace. If true, does not update/resave files. If false, files are saved/overwritten.
 */
export default async function findAndReplace(searchFunction = u => u, { searchOnly = true, testRun = true } = {}) {

  const spinner = createSpinner(`Running ${searchOnly ? `search` : `find and replace`}${testRun ? ` as a test run` : ``}.`).start();

  const jsonPath  = path.join(`texts`, `json`);
  const filenames = await readDir(jsonPath);

  const progressBar = new ProgressBar(`:bar :current :total :percent :eta`, { total: filenames.length });

  await Promise.all(filenames.map(async filename => {

    const filePath = path.join(jsonPath, filename);
    const text     = await readJSON(filePath);

    text.utterances = text.utterances.map(searchFunction);

    if (searchOnly) return progressBar.tick();

    const writePath = testRun ? filePath.replace(`.json`, `-updated.json`) : filePath;
    await writeJSON(writePath, text, { spaces: 2 });
    progressBar.tick();

  })).catch(e => {
    spinner.fail(e.message);
    throw e;
  });

  spinner.succeed(`${searchOnly ? `Search` : `Find and replace`} complete.`);

}
