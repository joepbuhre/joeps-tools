<template>
    <div class="md:px-44 px-4">
        <button @click="getWords()">getwords</button> {{ word }}
        <div>
            <div v-for="i in maxTries" class="flex gap-1 mt-2">
                <div v-for="ind in letters" class="grow h-16 border border-gray rounded-md flex"
                    :class="{ 'bg-green-500': (tries?.[i - 1]?.[ind - 1]?.correct === 1), 'bg-yellow-300': (tries?.[i - 1]?.[ind - 1]?.correct === 2) }">
                    <span class="m-auto text-xl">{{ tries?.[i - 1]?.[ind - 1]?.letter }}</span>
                </div>
            </div>
        </div>
        <div class="bg-slate-100 mb-24 mt-2">
            <button @click="removeLetter()">backspace</button>
            <div class="md:w-1/3">
                <div v-for="row in keyboardLayout" class="text-center mt-2">
                    <button v-for="key in row" @click="addLetter(key)"
                        class="border border-slate-400 w-7 py-2 mr-1 rounded-md"
                        :class="{ 'bg-green-500 border-green-500': (lettersCorrect[key] === 1), 'bg-yellow-300 border-yellow-300': (lettersCorrect[key] === 2) }">
                        {{ key }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from "axios";
import { computed } from '@vue/reactivity';

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

const reset = _ => {
    fullCorrect.value = false
    inputValue.value = ''
    atTry.value = 0
    lettersCorrect.value = {}
    setLetterArray()

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
    if (!words.value.includes(inputValue.value)) {
        // alert(`this isn't a word`)
        // return false
    }

    const letters = Array.from(inputValue.value)
    const corrWord = Array.from(word.value)
    letters.forEach((letter, index) => {
        if (letter === corrWord[index]) {
            tries.value[atTry.value][index].correct = 1
            lettersCorrect.value[letter] = 1
        } else if (corrWord.includes(letter)) {
            tries.value[atTry.value][index].correct = 2
            lettersCorrect.value[letter] = 2
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
})

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
    reset()
    const rand = Math.round(Math.random() * words.value.length)
    console.log(rand)
    word.value = words.value[rand]
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

</script>

