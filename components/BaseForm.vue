<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <div>
      <label for="title" class="block text-sm font-medium text-gray-700">
        タイトル
      </label>
      <input
        type="text"
        id="title"
        v-model="inputData.title"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
    <div>
      <label for="code" class="block text-sm font-medium text-gray-700">
        コード
      </label>
      <input
        type="text"
        id="code"
        v-model="inputData.memoryCode"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
    <div>
      <label for="description" class="block text-sm font-medium text-gray-700">
        説明
      </label>
      <textarea
        id="description"
        v-model="inputData.description"
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
// TODO: indexでInsertする
import { ref } from "vue";

const supabase = useSupabaseClient();

const inputData = ref({
  title: "",
  memoryCode: "",
  description: "",
});

const onSubmit = async () => {
  const { error } = await supabase.from("entries").insert({
    title: inputData.value.title,
    memory_code: inputData.value.memoryCode,
    description: inputData.value.description,
  });

  inputData.value = { title: "", memoryCode: "", description: "" };
};
</script>
