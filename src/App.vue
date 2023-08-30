<script setup lang="ts">
import { onMounted, ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import { search } from './api/hoogle'

const res = ref<any>([])
const loading = ref(false)

onMounted(async () => {
  try {
    loading.value = true
    const resp = await search('print')
    if (resp.status === 200)
      res.value = resp.data
  } catch (e: any) {
    console.error(e)
    res.value = []
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div v-if="!loading" v-for="item in res">
    <p v-html="item.docs" />

  </div>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>

  <HelloWorld msg="Vite + Vue" />
</template>
