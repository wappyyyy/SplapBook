<template>
  <div class="flex flex-col mt-5">
    <button
      class="block w-32 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      @click="fetchData"
    >
      一覧取得
    </button>
    <div
      v-for="item in items"
      :key="item.id"
      class="my-5 p-4 shadow-lg rounded-lg bg-gray-100 flex justify-between"
    >
      <div>
        <h3 class="text-xl font-bold">ID:{{ item.id }} {{ item.title }}</h3>
        <p class="mt-2 text-gray-700">{{ item.memory_code }}</p>
        <p class="mt-2 text-gray-700">{{ item.description }}</p>
        <NuxtLink
          :to="'/entries/' + item.id"
          class="text-blue-500 hover:underline mt-2 block"
        >
          詳細ページへ
        </NuxtLink>
      </div>
      <div>
        <button @click="onDeleteItem(item.id)">
          <Icon class="text-red-400" name="ic:baseline-delete" size="1.5em" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// TODO: indexでfetchする
import { ref, onMounted } from "vue";
const supabase = useSupabaseClient();

const items = ref([]);

const fetchData = async () => {
  console.log("fetch data");
  const { data, error } = await supabase.from("entries").select("*");
  if (error) {
    console.error("データ取得時のエラー:", error);
    return;
  }

  items.value = data;
};

const onDeleteItem = async (id: number) => {
  const { error } = await supabase.from("entries").delete().eq("id", id);
  if (error) {
    console.error("データ削除時のエラー:", error);
    return;
  }
  fetchData();
};

onMounted(() => fetchData());
</script>
