<template>
    <div class="md:px-44 px-4">
        <p class="text-center">
            <span v-if="alertText">{{ alertText }}</span>
            <span v-else>Woordle</span>
        </p>
        <div class="">
            <div v-for="i in maxTries" class="flex gap-1 mt-2 justify-center">
                <div v-for="ind in letters" class="h-12 w-12 border border-gray rounded-md flex"
                    :class="{ 'bg-green-500': (tries?.[i - 1]?.[ind - 1]?.correct === 1), 'bg-yellow-300': (tries?.[i - 1]?.[ind - 1]?.correct === 2), 'bg-gray-400': (tries?.[i - 1]?.[ind - 1]?.correct === 3) }">
                    <span class="m-auto text-2xl capitalize">{{ tries?.[i - 1]?.[ind - 1]?.letter }}</span>
                </div>
            </div>
        </div>
        <div class="h-[300px] mt-2 relative">
            <div class="absolute bottom-10 bg-slate-100 ">
                <div class="grid grid-cols-3 gap-5 my-2 p-3">
                    <button class="bg-blue-100 rounded-md px-2 py-1" @click="getWords()">Get Word</button>
                    <button class="bg-blue-100 rounded-md px-2 py-1" @click="showHint()">hint</button>
                    <button class="bg-blue-100 rounded-md px-2 py-1" @click="removeLetter()">backspace</button>
                </div>
                <div class="md:w-1/3">
                    <div v-for="row in keyboardLayout" class="text-center mt-2 flex justify-center gap-1">
                        <button v-for="key in row" @click="addLetter(key)"
                            class="border border-slate-400 w-8 py-2 rounded-md"
                            :class="{ 'bg-green-500 border-green-500': (lettersCorrect[key] === 1), 'bg-yellow-300 border-yellow-300': (lettersCorrect[key] === 2), 'bg-gray-400': (lettersCorrect[key] === 3) }">
                            {{ key }}
                        </button>
                    </div>
                    <button class="fixed top-0 right-0 text-xs opacity-10" @click="showWord()">cheat</button>
                </div>
            </div>
        </div>
    </div>
    <div v-if="modalOpen" @click.self="modalOpen = false" class="fixed inset-0 flex bg-black bg-opacity-20 px-3">
        <div class="m-auto p-3 bg-white rounded-md shadow-lg">
            <div v-html="modalText"></div>
            <button class="bg-blue-100 rounded-md px-2 py-1 block m-auto" @click="modalOpen = false">Sluit</button>

        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import axios from "axios";

const words = ref([])

const word = ref(null)

const inputValue = ref('')

const keyboardLayout = {
    "row1": [
        "q",
        "w",
        "e",
        "r",
        "t",
        "y",
        "u",
        "i",
        "o",
        "p"
    ],
    "row2": [
        "a",
        "s",
        "d",
        "f",
        "g",
        "h",
        "j",
        "k",
        "l"
    ],
    "row3": [
        "z",
        "x",
        "c",
        "v",
        "b",
        "n",
        "m"
    ]
}

const letters = ref(5)

const atTry = ref(0)
const maxTries = ref(letters.value + 1)

const guessedWord = ref(false)

const tries = ref([])

const fullCorrect = ref(false)

const lettersCorrect = ref({})

const wikiWord = ref(null)

const modalText = ref('')
const modalOpen = ref(false)

const reset = _ => {
    fullCorrect.value = false
    inputValue.value = ''
    atTry.value = 0
    lettersCorrect.value = {}
    guessedWord.value = false
    setLetterArray()

}

const showWord = _ => {
    alert(`Cheater ;). Het woord is: ${word.value}`)
}

const alertText = ref('')

const addAlert = text => {
    alertText.value = text
    setTimeout(() => {
        alertText.value = ''
    }, 1500);
}

const setLetterArray = _ => {
    tries.value = []
    for (let i = 0; i < maxTries.value; i++) {
        const arr = []
        for (let no = 0; no < letters.value; no++) {
            arr.push({
                letter: '',
                correct: null,
            })
        }
        tries.value.push(arr)
    }
}

const checkLetters = _ => {
    if (!words.value.includes(inputValue.value) && !(inputValue.value.substring(0, 3) === 'qqq')) {
        addAlert(`Dit is geen woord, ofwel maar helaas voor jou`)
        return false
    }

    const letters = Array.from(inputValue.value)
    const corrWord = Array.from(word.value)

    let checkedLetters = []


    letters.forEach((letter, index) => {

        if (letter === corrWord[index]) {
            tries.value[atTry.value][index].correct = 1
            lettersCorrect.value[letter] = 1
        } else if (corrWord.includes(letter) && !checkedLetters.includes(letter)) {
            checkedLetters.push(letter)

            tries.value[atTry.value][index].correct = 2

            if (lettersCorrect?.value?.[letter] !== 1) {
                lettersCorrect.value[letter] = 2
            }

        } else {
            tries.value[atTry.value][index].correct = 3
            lettersCorrect.value[letter] = 3
        }
    })
    atTry.value++

    let tmpInput = inputValue.value

    setTimeout(() => {
        if (word.value === tmpInput) {
            guessedWord.value = true
            if (confirm('Yes je hebt t correct geraden! Wil je opnieuw beginnen?')) {
                reset()
                setWord()
            }

        }

        if (atTry.value === maxTries.value && !guessedWord.value) {
            alert(`Helaas je hebt t niet gehaald, het juiste woord was: ${word.value}`)
            reset()
            return false
        }

    }, 300);
    inputValue.value = ''

}

onMounted(() => {
    setLetterArray()
    getWords()
    setWord()
})

watch(wikiWord, () => {

    if (wikiWord.value?.extract === undefined) {
        setWord()
        return false
    }

    if ('missing' in wikiWord.value) {
        setWord()
        return false
    }

    if (wikiWord.value?.extract.match(/\'/gi)) {
        setWord()
    }

    if (wikiWord.value?.extract.match(/(kan verwijzen naar)/gi)) {
        setWord()
        return false
    }
})

const showHint = _ => {
    const reg = new RegExp(word.value, 'gi')
    modalText.value = wikiWord.value?.extract.replace(reg, `<span class="blur-text">${word.value}</span>`)
    modalOpen.value = true
}

const setLetters = _ => {
    console.log(Array.from(inputValue.value))
    const letterArr = Array.from(inputValue.value)
    for (let i = 0; i < letters.value; i++) {
        tries.value[atTry.value][i].letter = (letterArr?.[i] !== undefined) ? letterArr[i] : ''
    }
    if (letterArr.length === letters.value) {
        checkLetters()
    }
}

const addLetter = letter => {
    if (inputValue.value.length === letters.value) {
        return false
    }

    inputValue.value += letter

    setLetters()

    if (inputValue.value === word.value) {
        fullCorrect.value = true
    }

}

const removeLetter = _ => {
    inputValue.value = inputValue.value.substring(0, inputValue.value.length - 1)
    setLetters()
}

const setWord = () => {
    addAlert('Aan het zoeken voor een woord')
    reset()
    const rand = Math.round(Math.random() * words.value.length)
    word.value = words.value[rand]
    checkWord()

}

const getWords = _ => {
    axios.get('https://raw.githubusercontent.com/OpenTaal/opentaal-wordlist/master/elements/basiswoorden-gekeurd.txt')
        .then(res => {
            words.value = res.data.split('\n').filter(word => {
                return word.length === 5
            })
            setWord()
        })
}

const checkWord = _ => {
    const url = new URL('https://nl.wikipedia.org/w/api.php')
    const search = new URLSearchParams({
        action: "query",
        prop: "extracts",
        titles: word.value,
        format: "json",
        origin: "*",
        redirects: null,
        exsentences: 2,
        explaintext: null
    })
    url.search = search.toString()
    axios.get(url.toString())
        .then(res => {
            wikiWord.value = Object.values(res?.data?.query?.pages)?.[0]
        })

}

</script>

<style>
.blur-text {
    text-shadow: 0 0 8px black;
    color: transparent;
}
</style>