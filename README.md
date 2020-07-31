# Nuuchahnulth

This repository contains linguistic texts in Nuuchahnulth, a language of the Wakashan language family, spoken in the Pacific Northwest. These texts are digitally-searchable versions of those prepared by Toshihide Nakayama (Tokyo University of Foreign Studies), and published as volumes A2-027 and A2-028 of the series _Endangered Languages of the Pacific Rim_. The texts were dictated by George Louie and Caroline Little to Toshihide Nakayama, who then transcribed, analyzed, and prepared the edited versions.

## Contents

<!-- TOC -->

- [Attribution](#attribution)
- [Reporting Typos & Issues](#reporting-typos--issues)
- [Corpus Statistics](#corpus-statistics)
- [Text Formats](#text-formats)
- [Sounds of Nuuchahnulth](#sounds-of-nuuchahnulth)
- [Abbreviations](#abbreviations)
- [Converting the Corpus](#converting-the-corpus)

<!-- /TOC -->

## Attribution

If you would like to use the data in the repository for research, please cite the following sources, depending on the text:

* Nakayama, Toshihide (ed.). 2003. _Caroline Little's Nuu-chah-nulth (Ahousaht) texts with grammatical analysis_ (Endangered Languages of the Pacific Rim A2-027). Kyoto: Nakanishi Printing Co.

* Nakayama, Toshihide (ed.). 2003. _George Louie's Nuu-chah-nulth (Ahousaht) texts with grammatical analysis_ (Endangered Languages of the Pacific Rim A2-028). Kyoto: Nakanishi Printing Co.

You may also use the stable DOI made available through Zenodo to cite this online version of the corpus:

**DOI:**[10.5281/zenodo.3931864](http://doi.org/10.5281/zenodo.3931864)

[![DOI](https://zenodo.org/badge/181127642.svg)](https://zenodo.org/badge/latestdoi/181127642)

For other uses of this data, please contact [Toshihide Nakayama](mailto:nakayama@aa.tufs.ac.jp).

## Reporting Typos & Issues

To report a typo or other problem, [open an issue on GitHub][new-issue].

## Corpus Statistics

Statistic  | Value
-----------|------
Speakers   | 2
Texts      | 24
Utterances | 2,081
Tokens     | 8,366
Wordforms  | 4,216
Stems      | 2,547
Roots      | 1,313

## Text Formats

The texts are available in three formats:

* The "raw" versions of the texts, in a practical writing system used for the purpose of quickly typing in the data. These versions are used to produce the other versions of the texts. These versions are located in the folder `texts/raw`.

* An [<dfn>interlinear gloss format</dfn>][IGL] (<abbr title='interlinear gloss'>IGL</abbr>) — a format used by linguists to represent data in a way that can be read and understood by anyone. Each document itself follows a format called [scription][scription], which enforces consistency in the structure of the text, making it computationally parseable. These versions are located in the folder `texts/interlinear`.

  At the top of each text is a header (between the two sets of dashes `---`), which provides the title in English (and sometimes Nuuchahnulth), the abbreviation, and the unique ID for each text.

  Beneath the header are utterances (sentences) in the text. Each utterance is separated from the next by a blank line.

  Each utterance has 5 lines, which contain the following kinds of information:

  1. **Utterance Number:** The number of the utterance within the text.
  1. **Transcript:** A transcription of each utterance using the Nuuchahnulth writing system, along with punctuation.
  1. **Morphemes:** A list of each <dfn>morpheme</dfn> (meaningful part) of each word, where morphemes are separated by hyphens.
  1. **Glosses:** A short <dfn>gloss</dfn> (abbreviation) indicating the meaning of each morpheme in the word, separated by hyphens. See the [Abbreviations](#abbreviations) section below.
  1. **Literal Translations:** Literal translations of each word.
  1. **Free Translations:** A free (loose) translation for the utterance.

  For more information about the scription format, visit [https://scription.digitallinguistics.io][scription].

* A [JSON][JSON] version, formatted according to the [Data Format for Digital Linguistics][DaFoDiL] (<abbr>DaFoDiL</abbr>). This version of the corpus is most useful for programmatically interacting with the texts. See the [DaFoDiL page][DaFoDiL] for more information about how this data is formatted.

## Sounds of Nuuchahnulth

The following table shows the consonant sounds of Nuuchahnulth, arranged by place and manner of articulation in accordance with the [<dfn>International Phonetic Alphabet</dfn>][IPA] (<abbr title='International Phonetic Alphabet'>IPA</abbr>).

Manner            | Labial | Apical | Alveolar | Lateral | Palatal | Velar | Labio-Velar | Uvular | Labio-Uvular | Pharyngeal | Glottal
------------------|:------:|:------:|:--------:|:-------:|:-------:|:-----:|:-----------:|:------:|:------------:|:----------:|:------:
Stops             |   p    |   t    |    c     |    ƛ    |    č    |   k   |     kʷ      |   q    |      qʷ      |     ʕ      |    ʔ
Ejectives         |   p̓    |   t̓    |    c̓     |    ƛ̓    |    č̓    |   k̓   |     k̓ʷ      |        |     (q̓ʷ)     |            |
Fricatives        |        |        |    s     |    ɬ    |    š    |   x   |     xʷ      |   x̣    |              |     ḥ      |    h
Resonants         |   m    |   n    |          |         |    y    |       |      w      |        |              |            |
Glottal Resonants |   m̓    |   n̓    |          |         |    y̓    |       |      w̓      |        |              |            |

Ahousaht Nuuchahnulth has three vowels: /i, a, u/, each of which may be long (/Vː/), short, or variable-length (/V·/).

Certain suffixes in Nuuchahnulth change the sounds that precede them:

* <dfn>Hardening suffixes</dfn> change stops, affricates, and resonants into their glottalized counterparts, and fricatives into /w̓/ or /y̓/ depending on whether the consonant is rounded. Hardening suffixes are indicated by ⟨ʼ⟩.
* <dfn>Softening suffixes</dfn> change a preceding fricative into /w/ or /y/ depending on whether the consonant is rounded. Softening suffixes are indicated by ⟨ʽ⟩.

## Abbreviations

The following abbreviations are used in the texts.

Abbreviation | Meaning
-------------|-------------------------------------
CAUS         | causative
COND         | conditional mood
CONT         | continuative aspect
DEF          | definite
DIM          | diminutive
DISTR        | distributive
DUB          | dubitative mood
DUP          | CV reduplication
DUP#         | syllable reduplication
DUPCV        | CV reduplication
DUR          | durative aspect
EXP          | expression that cannot be translated
FIN(ITE)     | finite event
FUT          | future
FUT.IMP      | future imperative
GRAD         | graduative aspect
IMP          | imperative
INC          | inceptive aspect
INC.CAUS     | inceptive causative
IND          | indicative mood
INDF         | indefinite mood
INF          | inferential mood
INTER        | interrogative
INTJ         | interjection
IT           | iterative aspect
IT.INC       | iterative inceptive aspect
IT.PL        | iterative plural
LOC          | location
MOM          | momentaneous
MOMCAUS      | momentaneous causative
PL           | plural
POSS         | possessive
PURP         | purposive
QUOT         | quotative
REL          | relative mood
REL.DUB      | relative dubitative mood
REP          | repetitive aspect
SG           | singular
SHIFT        | perspective shifting
SIM          | simultaneous (‘while doing…’)
SPOR         | sporadic aspect
SUB          | subordinate mood

## Converting the Corpus

To run the scripts that convert the corpus for yourself, you will need to 1) install [Node.js][Node], 2) [clone this repository][clone] to your computer, 3) install the necessary scripts by running `npm install` from the command line in the folder for the repository, and 4) then run the command `npm build` from the command line in the folder for this repository.

You can also run just the transliteration step (`npm run transliterate`) or the conversion step (`npm run convert`).

## Find & Replace

I've also written a find-and-replace script ([`scripts/findAndReplace.js`](findAndReplace)), which allows the user to run searches on the corpus or update the JSON files in the corpus. See the documentation on how to use this function in the [`findAndReplace.js`][findAndReplace] file. An example of how to use this function can be seen in [`scripts/getCorpusStats.js`][getCorpusStats], which calculates the statistics for the corpus.

[clone]:          https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository
[DaFoDiL]:        https://format.digitallinguistics.io
[DLx]:            https://digitallinguistics.io
[findAndReplace]: https://github.com/dwhieb/Nuuchahnulth/blob/master/scripts/findAndReplace.js
[getCorpusStats]: https://github.com/dwhieb/Nuuchahnulth/blob/master/scripts/getCorpusStats.js
[IGL]:            https://www.eva.mpg.de/lingua/resources/glossing-rules.php
[IPA]:            https://www.internationalphoneticalphabet.org/
[JSON]:           https://en.wikipedia.org/wiki/JSON#Example
[new-issue]:      https://github.com/dwhieb/Nuuchahnulth/issues/new
[Node]:           https://nodejs.org/en/
[scription]:      https://scription.digitallinguistics.io
[transliterate]:  https://developer.digitallinguistics.io/transliterate/
