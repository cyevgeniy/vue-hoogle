<script setup lang="ts">
import { ref } from 'vue'
import HButton from './HButton.vue'
import HInput from './HInput.vue'

const query = ref('')

defineEmits<{
  (evt: 'search', query: string): void
}>()
</script>

<template>
  <div class="flex gap-2">
    <HInput v-model="query" class="grow" placeholder="search for..." />
    <HButton @click="$emit('search', query)">
      Search
    </HButton>
  </div>
</template>