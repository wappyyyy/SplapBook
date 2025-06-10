<template>
  <div class="text-lg">
    <p>Parent Counter: {{ counter }}</p>
    <button
      class="mt-2 py-1 px-3 bg-lime-500 text-white rounded"
      @click="onClickAdd"
    >
      Click!
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  counter: number;
  onClickAdd: () => void;
}>();
</script>
