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

    <!-- ルール選択 -->
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

    <!-- ブキ選択 -->
    <div>
      <label for="wepon" class="block text-sm font-medium text-gray-700">
        ブキ
      </label>
      <select
        id="wepon"
        v-model="weaponType"
        required
        class="mt-1 block pl-3 pr-10 py-2 text-base border-2 border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option disabled value="">ブキタイプを選択してください</option>
        <option v-for="(wt, key) in WeaponTypesList" :key="key" :value="key">
          {{ wt }}
        </option>
      </select>
      <select
        v-model="inputData.weapon"
        required
        class="mt-1 block pl-3 pr-10 py-2 text-base border-2 border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option disabled value="">武器を選択してください</option>
        <option
          v-for="weapon in filteredWeapons"
          :key="weapon.id"
          :value="weapon.id"
        >
          {{ weapon.name }}
        </option>
      </select>
    </div>

    <!-- ステージ選択 -->
    <div>
      <label for="stage" class="block text-sm font-medium text-gray-700">
        ステージ
      </label>
      <select
        class="mt-1 block pl-3 pr-10 py-2 text-base border-2 border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option disabled value="">ステージを選択してください</option>
        <option v-for="stage in StageList" :key="stage.id" :value="stage.id">
          {{ stage.name }}
        </option>
      </select>
    </div>

    <!-- ウデマエ -->
    <div>
      <label for="udemae" class="block text-sm font-medium text-gray-700">
        ウデマエ
      </label>
      <select
        id="udemae"
        required
        v-model="selectedUdemae"
        class="mt-1 block pl-3 pr-10 py-2 text-base border-2 border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option disabled value="">ウデマエを選択してください</option>
        <option v-for="name in UdemaeList" :key="name" :value="name">
          {{ name }}
        </option>
      </select>

      <div v-if="selectedUdemae === 'X'">
        <label for="xPower" class="block text-sm font-medium text-gray-700">
          Xパワー
        </label>
        <input
          id="xPower"
          type="text"
          inputmode="numeric"
          pattern="[0-9]*"
          required
          class="mt-1 block pl-3 pr-10 py-2 text-base border-2 border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
      </div>
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

<script setup lang="ts">
// TODO: indexでInsertする
import { ref, computed } from "vue";
import {
  RuleTypes,
  WeaponTypes,
  WeaponTypesList,
  WeaponListByType,
  StageList,
  UdemaeList,
} from "~/consts/const";
import type { UdemaeType } from "~/types/type";

const supabase = useSupabaseClient();

const inputData = ref({
  title: "",
  memoryCode: "",
  description: "",
  rule: RuleTypes.NAWABARI,
  weapon: null,
});
const weaponType = ref<number | null>(null);
const selectedUdemae = ref<UdemaeType | null>(null);

const filteredWeapons = computed(() => {
  return weaponType.value
    ? WeaponListByType[weaponType.value]
    : WeaponListByType[WeaponTypes.SHOOTER];
});

const onSubmit = async () => {
  const { error } = await supabase.from("entries").insert([
    {
      title: inputData.value.title,
      memory_code: inputData.value.memoryCode,
      description: inputData.value.description,
    },
  ]);

  inputData.value = {
    title: "",
    memoryCode: "",
    description: "",
    rule: RuleTypes.NAWABARI,
    weapon: null,
  };
};
</script>
