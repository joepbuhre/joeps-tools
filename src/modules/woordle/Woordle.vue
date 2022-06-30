<template>
    <div class="md:px-44 px-4">
        <button @click="getWords()">getwords</button> {{word}}
        <input type="text" class="block border border-gray" v-model="inputValue">
        <div>
            <div v-for="i in 6" class="flex gap-3 mt-4">
                <div v-for="i in 5" class="grow h-16 border border-gray rounded-md flex" :class="{'bg-green-500': fullCorrect}">
                    <span class="m-auto text-xl">{{tries?.[0]?.[i - 1]}}</span>
                </div>
            </div>
        </div>
        <div class="bg-slate-100 my-24" >
            <button @click="removeLetter()">backspace</button>
            <div class="md:w-1/3">
                <div v-for="row in keyboardLayout" class="text-center mt-2">
                    <button v-for="key in row" @click="addLetter(key)" class="border border-slate-400 w-7 py-2 mr-1 rounded-md hover:bg-slate-400">
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

const tries = ref([])

const fullCorrect = ref(false)

const reset = _ => {
    fullCorrect.value = false
    inputValue.value = ''
    setLetterArray()
}

const setLetterArray = _ => {
    const number = 5
    tries.value = []
    for (let i = 0; i < number + 1; i++) {
        const arr = []
        for (let no = 0; no < number; no++) {
            arr.push('')            
        }
        tries.value.push(arr)
    }
}

onMounted(() => {
    const number = 5
    for (let i = 0; i < number + 1; i++) {
        const arr = []
        for (let no = 0; no < number; no++) {
            arr.push('')            
        }
        tries.value.push(arr)
    }
})

const setLetters = _ => {
    console.log(Array.from(inputValue.value))
    const letterArr = Array.from(inputValue.value)
    for (let i = 0; i < 5; i++) {
        tries.value[0][i] = (letterArr?.[i] !== undefined) ? letterArr[i] : ''
    }
}

const addLetter = letter => {
    inputValue.value += letter

    setLetters()

    if(inputValue.value === word.value) {
        fullCorrect.value = true
    }

}

const removeLetter = _ => {
    inputValue.value = inputValue.value.substring(0, inputValue.value.length -1)
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

