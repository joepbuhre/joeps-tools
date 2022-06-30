<template>
    <h1>View all tools here</h1>
    <div class="md:flex md:px-44 px-5 gap-10 justify-center w-full mt-10">
        <router-link v-for="cusModule in modules" :to="{name: cusModule.toLowerCase()}">
            <div  class="border border-gray h-24 w-full md:w-56 mt-5 flex shadow-sm hover:shadow:lg hover:bg-blue-600 hover:text-white ease duration-200">
                <span class="m-auto">{{cusModule}}</span>
            </div>
        </router-link>
    </div>
</template>

<script setup>
import { computed } from '@vue/reactivity';

const files = import.meta.glob('./**/*.vue')

const modules = computed(() => {
    return Object.keys(files).map(item => {
        return item.replace(/^.*\/|\.vue/gi, '')
    })
})

</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
