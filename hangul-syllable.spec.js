const hangul = require('./hangul-syllable')

const samples = [
    [ ['ㅎ', 'ㅏ', 'ㄴ'], '한' ],
    [ ['ㄱ', 'ㅏ', 'ㄴ'], '간' ],
    [ ['ㄴ', 'ㅏ', ''], '나' ],
    [ ['ㄷ', 'ㅏ', 'ᆰ'], '닭' ],
    [ ['ㄷ', 'ㅏ', 'ㄹ', 'ㄱ'], '닭' ],
    [ ['ㄷ', 'ㅏ', 'ㄹ', 'ㄱ', 'ㅓ', 'ㄹ'], '달걸' ],
    [ ['ㅇ','ㅏ','ㄴ','ㄴ','ㅕ','ㅇ','ㅎ','ㅏ','ㅅ','ㅔ','ㅇ','ㅛ'], '안녕하세요' ],
    [ ['ㄷ', 'ㅏ', 'ㄹ', 'ㄱ', 'ㅂ', 'ㅏ', 'ㄹ'], '닭발' ],
]

samples.forEach( ([sample, expected]) => {

    console.table({sample, expected})

    if ( hangul.buildSyllables(sample) !== expected ) {
        throw new Error('Not the expected character')
    }
})
