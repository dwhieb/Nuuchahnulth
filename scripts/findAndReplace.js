/**
 * Searches the entire Nuuchahnulth corpus using the provided search function,
 * and saves any changes that are made to the corpus, overwriting old files
 * @param  {Function} searchFunction A function that accepts an utterance as an argument, and returns an updated utterance. Return the original utterance if no changes need to be made.
 */
export default async function findAndReplace(searchFunction) {
  // for each file
  // - read the file, parse the JSON, get the utterances
  // - apply searchFunction to each utterance using .map()
  // - (save the new utterances array to the text)
  // - write the JSON back to the same file
}
