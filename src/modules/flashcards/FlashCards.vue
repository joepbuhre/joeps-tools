<template>
    <div class="md:grid grid-cols-2" @keydown="detect($event)" v-if="!showCards">
        <div class="px-10">
            Submit your flashcards
            <input type="text" class="border border-gray block my-5 px-2 py-1" v-model="splitToken">
            <textarea name="" id="" cols="90" rows="10" v-model="inputItems"
                class="border border-gray block"></textarea>
             <label
                    class="w-64 flex flex-col items-center py-2 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-600 hover:text-white ease duration-200">
                    <svg class="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path
                            d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span class="mt-2 text-base leading-normal">Select a file</span>
                    <input type='file' @change="detectFile($event)" class="hidden" />
                </label>
            <div class="flex gap-10 mt-4">
                <button class="bg-slate-100 rounded-md py-2 px-3 hover:bg-slate-50" @click="createCards()"> create
                    cards</button>
                <button class="bg-slate-100 rounded-md py-2 px-3 hover:bg-slate-50" @click="shuffleCards()"> shuffle
                    cards</button>
                <button class="bg-slate-100 rounded-md py-2 px-3 hover:bg-slate-50" @click="toggleFlashCards()">Show
                    Cards</button>
            </div>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Front</th>
                        <th>Back</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items">
                        <td>{{ item.front }}</td>
                        <td>{{ item.back }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="fixed flex inset-0 bg-black bg-opacity-30" v-if="showCards">
        <button class="px-3" @click="itemsController.prev()">&lt;</button>

        <div class="md:w-1/3 w-full h-44 m-auto rounded-md bg-slate-100 flex px-10 py-6 text-2xl text-center relative"
            @click="frontShow = !frontShow">
            <span class="text-sm absolute top-2 left-2">
                {{ flashcardPosition + 1 }} / {{ items.length + 1 }}
            </span>
            <button class="absolute top-2 right-2 text-sm" @click="toggleFlashCards()">x</button>
            <div class="m-auto">
                <div v-if="frontShow">
                    {{ items[flashcardPosition]?.front }}
                </div>
                <div v-if="!frontShow">
                    {{ items[flashcardPosition]?.back }}
                </div>
            </div>
        </div>
        <button class="px-3" @click="itemsController.next()">&gt;</button>

    </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const inputItems = ref('')

const splitToken = ref(';')

const items = ref([])

const frontShow = ref(true)

const flashcardPosition = ref(0)

const showCards = ref(false)

const detectFile = e => {
    const reader = new FileReader()
    reader.onload = (e) => {
        inputItems.value = e.target.result
        createCards()
    };
    reader.readAsText(e.target.files[0])
}

const createCards = _ => {
    flashcardPosition.value = 0
    items.value = []
    inputItems.value.split('\n').forEach(row => {
        const splitted = row.split(splitToken.value)
        items.value.push({
            front: splitted[0],
            back: splitted[1]
        })

    })
}

const shuffleCards = _ => {
    flashcardPosition.value = 0
    for (var i = items.value.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = items.value[i];
        items.value[i] = items.value[j];
        items.value[j] = temp;
    }
}

function preventZoom(e) {
    var t2 = e.timeStamp;
    var t1 = e.currentTarget.dataset.lastTouch || t2;
    var dt = t2 - t1;
    var fingers = e.touches.length;
    e.currentTarget.dataset.lastTouch = t2;

    if (!dt || dt > 500 || fingers > 1) return; // not double-tap

    e.preventDefault();
    e.target.click();
}

onMounted(() => {
    document.addEventListener('keydown', detect)
    document.addEventListener('touchstart', preventZoom)
    createCards()
})

onBeforeUnmount(() => {
    document.removeEventListener('keydown', detect)
    document.addEventListener('touchstart', preventZoom)
})
const toggleFlashCards = _ => showCards.value = !showCards.value

const itemsController = {
    next: _ => {
        frontShow.value = true
        flashcardPosition.value++
    },
    prev: _ => {
        frontShow.value = true
        flashcardPosition.value--
    },
    toggle: _ => {
        frontShow.value = !frontShow.value
    }
}


const detect = (event = KeyboardEvent) => {
    event.stopPropagation()
    if (event.code === 'Space' || event.code === 'ArrowDown' || event.code === 'ArrowUp') {
        itemsController.toggle()
    }

    if (event.code === 'ArrowRight' && flashcardPosition.value < items.value.length) {
        itemsController.next()
    }
    if (event.code === 'ArrowLeft' && flashcardPosition.value > 0) {
        itemsController.prev()
    }

    if (event.code === 'Escape' && showCards.value === true) {
        toggleFlashCards()
    }
}


</script>