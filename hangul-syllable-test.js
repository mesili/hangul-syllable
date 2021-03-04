
/* 
 * http://www.unicode.org/versions/Unicode9.0.0/ch03.pdf
 *
 * https://en.wikipedia.org/wiki/Korean_language_and_computers
 *
 * TODO : compose / decompose final consonants if the next character
 * is in the lead table or not
 * Example : 
 * 닭 = ㄷ + ㅏ + ㄹ + ㄱ  
 * 닭발 = ㄷ + ㅏ + ㄹ + ㄱ + ㅂ + ㅏ + ㄹ  (ㅂ is a consonant)
 * 달걸 = ㄷ + ㅏ + ㄹ + ㄱ + ㅓ + ㄹ (ㅏ is not a lead, we must decompose 닭 as 달 + 거)
 */



const values = {
    vowel:{
        1 :  ['ᅡ', 'ㅏ'],
        2 :  ['ᅢ', 'ㅐ'],
        3 :  ['ᅣ', 'ㅑ'],
        4 :  ['ᅤ', 'ㅒ'],
        5 :  ['ᅥ', 'ㅓ'],
        6 :  ['ᅦ', 'ㅔ'],
        7 :  ['ᅧ', 'ㅕ'],
        8 :  ['ᅨ', 'ㅖ'],
        9 :  ['ᅩ', 'ㅗ'],
        10:  ['ᅪ', 'ㅘ'],
        11:  ['ᅫ', 'ㅙ'],
        12:  ['ᅬ', 'ㅚ'],
        13:  ['ᅭ', 'ㅛ'],
        14:  ['ᅮ', 'ㅜ'],
        15:  ['ᅯ', 'ㅝ'],
        16:  ['ᅰ', 'ㅞ'],
        17:  ['ᅱ', 'ㅟ'],
        18:  ['ᅲ', 'ㅠ'],
        19:  ['ᅳ', 'ㅡ'],
        20:  ['ᅴ', 'ㅢ'],
        21:  ['ᅵ', 'ㅣ'],
    },
    lead:{
        1 :  ['ᄀ', 'ㄱ'],
        2 :  ['ᄁ', 'ㄲ'],
        3 :  ['ᄂ', 'ㄴ'],
        4 :  ['ᄃ', 'ㄷ'],
        5 :  ['ᄄ', 'ㄸ'],
        6 :  ['ᄅ', 'ㄹ'],
        7 :  ['ᄆ', 'ㅁ'],
        8 :  ['ᄇ', 'ㅂ'],
        9 :  ['ᄈ', 'ㅃ'],
        10:  ['ᄉ', 'ㅅ'],
        11:  ['ᄊ', 'ㅆ'],
        12:  ['ᄋ', 'ㅇ'],
        13:  ['ᄌ', 'ㅈ'],
        14:  ['ᄍ', 'ㅉ'],
        15:  ['ᄎ', 'ㅊ'],
        16:  ['ᄏ', 'ㅋ'],
        17:  ['ᄐ', 'ㅌ'],
        18:  ['ᄑ', 'ㅍ'],
        19:  ['ᄒ', 'ㅎ'], 
    },
    tail:{
        1 :  ['ᆨ', 'ㄱ'],
        2 :  ['ᆩ', 'ㄲ'],
        3 :  ['ᆪ', 'ㄳ'],
        4 :  ['ᆫ', 'ㄴ'],
        5 :  ['ᆬ', 'ㄵ'],
        6 :  ['ᆭ', 'ㄶ'],
        7 :  ['ᆮ', 'ㄷ'],
        8 :  ['ᆯ', 'ㄹ'],
        9 :  ['ᆰ', 'ㄺ'],
        10:  ['ᆱ', 'ㄻ'],
        11:  ['ᆲ', 'ㄼ'],
        12:  ['ᆳ', 'ㄽ'],
        13:  ['ᆴ', 'ㄾ'],
        14:  ['ᆵ', 'ㄿ'],
        15:  ['ᆶ', 'ㅀ'],
        16:  ['ᆷ', 'ㅁ'],
        17:  ['ᆸ', 'ㅂ'],
        18:  ['ᆹ', 'ㅄ'],
        19:  ['ᆺ', 'ㅅ'],
        20:  ['ᆻ', 'ㅆ'],
        21:  ['ᆼ', 'ㅇ'],
        22:  ['ᆽ', 'ㅈ'],
        23:  ['ᆾ', 'ㅊ'],
        24:  ['ᆿ', 'ㅋ'],
        25:  ['ᇀ', 'ㅌ'],
        26:  ['ᇁ', 'ㅍ'],
        27:  ['ᇂ', 'ㅎ'],
    }

}

const composeTail = (a, b) => {
    const sequences = {
        'ㄲ': [1,1],
        'ㄺ': [8,1],
    }   
    //console.log({a,b})

    return Object.entries(sequences).filter(e => (
        e[1][0] === hangulNumber(a, 'tail')
        && e[1][1] === hangulNumber(b, 'tail' 
    )))[0][0]
}

/*
 * Naive algorithm with dual consonant as single character input
 */

const hangulNumber = (jamo, position) => {
    const number = Object.entries(values[position]).filter(
        e => e[1].indexOf(jamo) > -1
    )
    return parseInt(number[0] || 0)
}

/* 
 * han - Returns coharacter
 * from it's lead, vowel and tail characters
 */
const han = (lead, vowel, tail) => {
    const cLead = hangulNumber(lead, 'lead')
    const cVowel = hangulNumber(vowel, 'vowel')
    const cTail = hangulNumber(tail, 'tail')

    let composedCode = cTail + ((cVowel-1) * 28) + ((cLead-1) * 588 )
    composedCode += 44032

    if (composedCode > 55171 || composedCode < 44032) {
        console.error([lead, vowel, tail])
        throw new Error('Invalid hangul code')
    }

    const composedCharacter =  String.fromCharCode(composedCode)
    return composedCharacter
}

const build = jamos => {
    const syllables = []
    //
    // Logic
    // loop through the jamos
    // define lead, vowel, tail (if any)
    // if there is a tail
    //  - look up the next jamo
    //  달   ㄷㅏㄹ        if there is none : do nothing
    //  닭   ㄷㅏㄹㄱ      if it is a consonant followed by a consonant or by nothing: compose
    //  달걸 ㄷㅏㄹㄱㅓㄹ  if it is a consonant followed by a vowel  : do not compose
    let cursor = 0


    while(cursor < jamos.length) {
        //console.log({cursor})
        let lead = jamos[cursor]
        let vowel = jamos[cursor+1]
        let tail = jamos[cursor+2]

        let hasMoreJamos = jamos.length - cursor > 3
        let hasNoTail = hangulNumber(jamos[cursor+3], 'vowel') > 0
        let hasDoubleTail = hangulNumber(jamos[cursor+3], 'tail') > 0
        let followedByNothingOrVowel = hangulNumber(jamos[cursor+4], 'vowel') > 0

        if (hasNoTail && !hasDoubleTail) tail = ''

        if ( hasMoreJamos && !hasNoTail && hasDoubleTail && followedByNothingOrVowel) {
            cursor+=3
        } else if (hasMoreJamos && !hasNoTail && hasDoubleTail) {
            tail = composeTail(tail, jamos[cursor+3])
            cursor+=4
        } else if (hasMoreJamos && !hasDoubleTail && hasNoTail) {
            cursor +=2 
        } else {
            cursor+=3
        }

        syllables.push(han(lead, vowel, tail))
        
    }

    return syllables.join('')
}

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

    if ( build(sample) !== expected ) {
        throw new Error('Not the expected character')
    }
})
