<script setup lang="ts">
import { ref } from 'vue'
import { search } from './api/hoogle'
import SearchBar from './components/SearchBar.vue'

const res = ref<any>([])
const loading = ref(false)

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
  <div class="w-full flex flex-col gap-4 items-center">
    <div class="max-w-[700px] w-full self-center flex gap-2 items-center">
        <h2 class="font-sans text-2xl lg:text-4xl my-0 text-purple-700"> Hoogle </h2>
        <SearchBar class="w-full" @search="onSearch"/>
    </div>

    <div v-if="!loading" class="w-full" v-for="item in res">
      <a class="text-16px text-blue-500 hover:text-blue-700" :href="item.url" target="_blank">
        <h2 v-html="item.item" />
      </a>
      <div class="docs" v-html="item.docs" />
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
 }
</style>
