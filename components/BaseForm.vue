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
      <label class="block text-sm font-medium text-gray-700">ルール</label>
      <ul class="flex">
        <li>
          <label class="ml-2 text-sm font-medium text-gray-700">
            <input
              type="radio"
              v-model="inputData.rule"
              :value="RuleTypes.NAWABARI"
            />
            ナワバリ
          </label>
        </li>
        <li>
          <label class="ml-2 text-sm font-medium text-gray-700">
            <input
              type="radio"
              v-model="inputData.rule"
              :value="RuleTypes.AREA"
            />
            ガチエリア
          </label>
        </li>
        <li>
          <label for="territory" class="ml-2 text-sm font-medium text-gray-700">
            <input
              type="radio"
              id="territory"
              v-model="inputData.rule"
              :value="RuleTypes.YAGURA"
            />
            ガチヤグラ
          </label>
        </li>
        <li>
          <label class="ml-2 text-sm font-medium text-gray-700">
            <input
              type="radio"
              v-model="inputData.rule"
              :value="RuleTypes.HOKO"
            />
            ガチホコ
          </label>
        </li>
        <li>
          <label class="ml-2 text-sm font-medium text-gray-700">
            <input
              type="radio"
              v-model="inputData.rule"
              :value="RuleTypes.ASARI"
            />
            ガチアサリ
          </label>
        </li>
      </ul>
    </div>
    <div>
      <label for="team" class="block text-sm font-medium text-gray-700">
        ブキ
      </label>
      <select
        v-model="inputData.wepon"
        required
        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option disabled value="">ブキを選択してください</option>
        <optgroup label="シューター">
          <option value="1">スプラシューター</option>
        </optgroup>
        <optgroup label="ローラー">
          <option value="2">スプラローラー</option>
        </optgroup>
        <optgroup label="チャージャー">
          <option value="3">スプラチャージャー</option>
        </optgroup>
      </select>
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
import { RuleTypes } from "~/consts/const.ts";

const supabase = useSupabaseClient();

const inputData = ref({
  title: "",
  memoryCode: "",
  description: "",
  rule: RuleTypes.NAWABARI,
  wepon: "1",
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
