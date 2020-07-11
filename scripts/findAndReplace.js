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
 * @param  {Function} searchFunction A function that accepts an utterance as an argument, and returns an updated utterance. Return the original utterance if no changes need to be made.
 */
export default async function findAndReplace(searchFunction = u => u) {

  const jsonPath  = path.join(`texts`, `json`);
  const filenames = await readDir(jsonPath);

  await Promise.all(filenames.map(async filename => {
    const filePath = path.join(jsonPath, filename);
    const text = await readJSON(filePath);
    text.utterances = text.utterances.map(searchFunction);
    await writeJSON(filePath, text, { spaces: 2 });
  }));

  // for each file
  // - read the file, parse the JSON, get the utterances
  // - apply searchFunction to each utterance using .map()
  // - (save the new utterances array to the text)
  // - write the JSON back to the same file

}

findAndReplace();
