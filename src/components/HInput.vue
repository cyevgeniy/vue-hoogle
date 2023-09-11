<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: string): void
}>()

const _modelValue = computed({
  get() {
    return props.modelValue
  },
  set(v: string) {
    emit('update:modelValue', v)
  }
})
</script>

<template>
  <input
    v-model="_modelValue"
    class="p-2 rounded-lg ring-0 outline-none"
    border="~ blue-300 focus:blue-700"
    v-bind="$attrs"
  >
</template>