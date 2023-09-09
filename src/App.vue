<script setup lang="ts">
import { ref } from 'vue'
import { search } from './api/hoogle'
import SearchBar from './components/SearchBar.vue'

const res = ref<any>([])
const loading = ref(false)

const githubLink = ref("https://github.com/cyevgeniy/vue-hoogle")

async function onSearch(query: string) {
  if (!query) {
    res.value = []
    return
  }

  try {
    loading.value = true
    const resp = await search(query)
    if (resp.status === 200)
      res.value = resp.data
  } catch (e: any) {
    console.error(e)
    res.value = []
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="border border-b-slate-300 w-full gap-2 sm:gap-4 flex justify-center items-center bg-slate-50/90 pb-2 sticky top-0 m-0 p2">
      <div class="flex-1" />
      <div class="max-w-[700px] w-full flex flex-col sm:flex-row gap-2 items-center">
          <h2 class="font-sans text-2xl lg:text-4xl my-0 text-purple-700"> Hoogλe </h2>
          <SearchBar class="w-full" @search="onSearch"/>
          <div class="flex gap-2 flex-wrap self-start sm:hidden">
            <a :href="githubLink" class="op-70 hover:op-90 ">Github</a>
          </div>
      </div>
      
      <div class="flex flex-1 gap-2 items-center mr4 justify-end">
        <div class="hidden sm:flex" justify-center text-2xl op30 hover="op80">
          <a
            class="i-carbon-logo-github"
            text-inherit
            :href="githubLink"
            target="_blank"
          ></a>
        </div>
      </div>
  </div>

  <div class="w-full flex flex-col items-center gap-4 p2 mt-6">
    <div class="w-full max-w-[700px] flex flex-col gap-6">
      <template v-if="!loading">
        <div v-for="item in res">
          <a class="text-base font-bold font-sans text-blue-500 hover:text-blue-700" :href="item.url" target="_blank">
            <h2 v-html="item.item" />
          </a>
          <div class="docs" v-html="item.docs" />
        </div>
      </template>
      <div v-else class="font-xl mt-10 font-sans animate-bounce w-full p2">
        Loading...
      </div>
    </div>
  </div>
</template>

<style>
 .docs {
   font-size: 1rem;
   font-family: sans-serif;
 }

 pre {
   padding: 1rem;
   background-color: #f0f1fa;
   border-radius: 0.5rem;
   font-size: 0.9rem;
   overflow-x: auto;
   max-height: 200px;
 }
</style>
