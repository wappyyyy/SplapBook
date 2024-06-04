<template>
  <div class="flex flex-col mt-5">
    <button
      class="block w-32 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      @click="fetchData"
    >
      一覧取得
    </button>
    <div
      v-for="(item, idx) in items"
      :key="idx"
      class="my-5 p-4 shadow-lg rounded-lg bg-gray-100 flex justify-between"
    >
      <div>
        <h3 class="text-xl font-bold">ID:{{ item.id }} {{ item.title }}</h3>
        <div class="flex items-center mt-2">
          <p class="text-gray-700">{{ item.memory_code }}</p>
          <button
            @click="copyToClipboard(idx, item.memory_code)"
            class="ml-2 relative"
          >
            <Icon
              class="text-gray-500"
              name="ic:baseline-content-copy"
              size="1.2em"
            />
            <span
              v-if="isShowTooltip(idx)"
              class="absolute whitespace-nowrap top-0 left-0 mt-8 ml-2 px-2 py-1 text-xs text-white bg-black rounded"
            >
              コピーしました
            </span>
          </button>
        </div>
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
import { ref } from "vue";

interface Post {
  id: number;
  title: string;
  memory_code: string;
  description: string;
}

const supabase = useSupabaseClient();

const items = ref<Post[]>([]);
const activeIndex = ref<number | null>(null);

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

const isShowTooltip = (idx: number) => {
  return idx === activeIndex.value;
};

const copyToClipboard = (idx: number, text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      activeIndex.value = idx;

      setTimeout(() => {
        activeIndex.value = null;
      }, 2000);
    })
    .catch((err) => {
      console.error("Failed to copy text:", err);
    });
};

onMounted(() => fetchData());
</script>
