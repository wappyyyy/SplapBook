<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <div>
      <label for="title" class="block text-sm font-medium text-gray-700"
        >タイトル</label
      >
      <input
        type="text"
        id="title"
        v-model="form.title"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
    <div>
      <label for="code" class="block text-sm font-medium text-gray-700"
        >コード</label
      >
      <input
        type="text"
        id="code"
        v-model="form.code"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
    <div>
      <label for="description" class="block text-sm font-medium text-gray-700"
        >説明</label
      >
      <textarea
        id="description"
        v-model="form.description"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      ></textarea>
    </div>
    <button
      type="submit"
      class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      送信
    </button>
  </form>
</template>

<script setup>
import { ref } from "vue";

const form = ref({
  title: "",
  code: "",
  description: "",
});

const onSubmit = () => {
  console.log(form.value);
};
</script>
