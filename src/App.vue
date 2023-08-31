<script setup lang="ts">
import { ref } from 'vue'
import { search } from './api/hoogle'

const query = ref('')
const res = ref<any>([])
const loading = ref(false)

async function onSearch() {
  if (!query.value) {
    res.value = []
    return
  }

  try {
    loading.value = true
    const resp = await search(query.value)
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
    <input  v-model="query">
    <button @click="onSearch"> Search </button>

    <div v-if="!loading" v-for="item in res">
      <a :href="item.url" target="_blank"><h2 v-html="item.item" /></a>
      <p v-html="item.docs" />
    </div>
</template>
