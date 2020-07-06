# Nuuchahnulth

This repository contains linguistic texts in Nuuchahnulth, a language of the Wakashan language family, spoken in the Pacific Northwest. These texts are digitally-searchable versions of those prepared by Toshihide Nakayama (Tokyo University of Foreign Studies), and published as volumes A2-027 and A2-028 of the series _Endangered Languages of the Pacific Rim_. The texts were dictated by George Louie and Caroline Little to Toshihide Nakayama, who then transcribed, analyzed, and prepared the edited versions.

The texts are available in the `texts/converted`.

## Attribution

If you would like to use the data in the repository for research, please cite the following sources, depending on the text:

* Nakayama, Toshihide (ed.). 2003. _Caroline Little's Nuu-chah-nulth (Ahousaht) texts with grammatical analysis_ (Endangered Languages of the Pacific Rim A2-027). Kyoto: Nakanishi Printing Co.

* Nakayama, Toshihide (ed.). 2003. _George Louie's Nuu-chah-nulth (Ahousaht) texts with grammatical analysis_ (Endangered Languages of the Pacific Rim A2-028). Kyoto: Nakanishi Printing Co.

For other uses of this data, please contact [Toshihide Nakayama](mailto:nakayama@aa.tufs.ac.jp).

## Reporting Typos & Issues

To report a typo or other problem, please [open an issue][issues] on GitHub.


## Text Format

Each text follows a format called [scription][scription], which enforces consistency in the structure of the text, making it computationally parsable.

At the top of each text is a header (between the two sets of dashes `---`), which provides the title in English (and sometimes Nuuchahnulth), the abbreviation, and the unique ID for each text.

Beneath the header are utterances (sentences) in the text. Each utterance is separated from the next by a blank line.

Each utterance has 5 lines, which contain the following kinds of information:

1. **Utterance Number:** The number of the utterance within the text.
1. **Transcript:** A transcription of each utterance using the Nuuchahnulth writing system, along with punctuation.
1. **Morphemes:** A list of each morpheme (meaningful part) of each word, where morphemes are separated by hyphens.
1. **Glosses:** A short gloss (abbreviation) indicating the meaning of each morpheme in the word, separated by hyphens. See the [Abbreviations](#abbreviations) section below.
1. **Literal Translations:** Literal translations of each word.
1. **Free Translations:** A free (loose) translation for the utterance.

For more information about the scription format, visit [https://scription.digitallinguistics.io][scription].

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

[new-issue]: https://github.com/dwhieb/Nuuchahnulth/issues/new
[scription]: https://scription.digitallinguistics.io
