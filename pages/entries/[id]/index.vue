<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-4">{{ item.title }}</h1>
    <p class="text-gray-700 mb-2">{{ item.memory_code }}</p>
    <p class="text-gray-700 mb-4">{{ item.description }}</p>
    <NuxtLink
      :to="'/items/' + item.id + '/edit'"
      class="btn bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
    >
      Edit
    </NuxtLink>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const route = useRoute();
const item = ref({});

onMounted(async () => {
  const { data } = await supabase
    .from("entries")
    .select()
    .eq("id", route.params.id)
    .single();
  item.value = data;
});
</script>
