import findAndReplace from './findAndReplace.js';

async function getCorpusStats() {

  const types    = new Set;
  let utterances = 0;
  let tokens     = 0;

  await findAndReplace(({ words }) => {

    utterances++;

    if (words) {
      tokens += words.length ?? 0;
      words.forEach(({ analysis }) => types.add(analysis));
    }

  }, { searchOnly: true });

  console.info(`Utterances: ${utterances}`);
  console.info(`Tokens: ${tokens}`);
  console.info(`Types: ${types.size}`);

}

getCorpusStats().catch(e => {
  console.error(e);
  throw e;
});
