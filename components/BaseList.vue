<template>
  <div class="flex flex-col mt-5">
    <div
      v-for="item in items"
      :key="item.id"
      class="mb-5 p-4 shadow-lg rounded-lg bg-gray-100"
    >
      <h3 class="text-xl font-bold">{{ item.title }}</h3>
      <p class="mt-2 text-gray-700">{{ item.memory_code }}</p>
      <p class="mt-2 text-gray-700">{{ item.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const supabase = useSupabaseClient();

const items = ref([]);

const fetchData = async () => {
  const { data, error } = await supabase.from("entries").select("*");
  if (error) {
    console.error("データ取得時のエラー:", error);
    return;
  }

  items.value = data;
};

onMounted(fetchData);
</script>
