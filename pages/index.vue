<template>
  <div class="m-5 p-5">
    <div class="m-5">
      <h1 class="text-2xl font-bold">チーム管理ぺーじへ</h1>
      <NuxtLink to="/teams">チーム管理</NuxtLink>
    </div>

    <!-- Supabase環境変数確認 -->
    <div class="m-5 p-4 bg-gray-100 rounded">
      <h2 class="text-lg font-semibold mb-2">Supabase設定確認</h2>
      <div class="space-y-2">
        <div><strong>SUPABASE_URL:</strong> {{ supabaseUrl }}</div>
        <div>
          <strong>SUPABASE_ANON_KEY:</strong>
          {{ supabaseKey ? "設定済み" : "未設定" }}
        </div>
        <div class="text-sm text-gray-600">
          <strong>Key (先頭20文字):</strong>
          {{ supabaseKey ? supabaseKey.substring(0, 20) + "..." : "なし" }}
        </div>
      </div>
    </div>

    <BaseForm />
    <BaseList />
  </div>
  <div>
    <NuxtLink to="/sandbox">砂場</NuxtLink>
  </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
const supabaseUrl = config.public.supabaseUrl;
const supabaseKey = config.public.supabaseKey;
</script>
