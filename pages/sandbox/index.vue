<template>
  <div ref="sandoxContainer" class="m-5 p-3">
    <header class="my-5">
      <h1 class="text-2xl">sandbox</h1>
    </header>

    <div class="p-2 my-3 bg-red-100">
      <h2 class="text-xl">親コンポーネント</h2>
      <div class="p-3">
        <!-- <p>Counter: {{ counter }}</p> -->
        <p>NotReactiveCounter: {{ notReactiveCounter }}</p>
        <div class="flex gap-4">
          <button
            @click="incrementCounter"
            class="mt-2 py-1 px-3 bg-blue-500 text-white rounded"
          >
            Increment
          </button>
          <button
            @click="decrementCounter"
            class="mt-2 py-1 px-3 bg-blue-500 text-white rounded"
          >
            Decrement
          </button>
          <button
            @click="resetCounter"
            class="mt-2 py-1 px-3 bg-blue-500 text-white rounded"
          >
            Reset
          </button>
        </div>
      </div>
    </div>

    <div class="p-2 my-3 bg-cyan-100">
      <h2 class="text-xl">子コンポーネント</h2>
      <CounterChild :counter="counter" :on-click-add="() => {}" />
    </div>

    <div class="p-2 my-3 bg-cyan-100">
      <h2 class="text-xl">Not Reactive子コンポーネント</h2>
      <CounterChild :counter="notReactiveCounter" :on-click-add="incrementCounter" />
    </div>

    <div ref="insertMounted" class="p-2 my-3 bg-cyan-100"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CounterChild from "../../components/sandbox/CounterChild.vue";

const sandoxContainer = ref<HTMLElement | null>(null);
const counter = ref(0);
const insertMounted = ref<HTMLElement>();

let notReactiveCounter = 0;
const incrementCounter = () => {
  counter.value++;
  notReactiveCounter++;
};
const decrementCounter = () => {
  counter.value--;
  notReactiveCounter--;
};
const resetCounter = () => {
  counter.value = 0;
  notReactiveCounter = 0;
};
const insertDom = () => {
  setTimeout(() => {
    const newElement = document.createElement("div");
    newElement.textContent = "This is a dynamically generated DOM element. from method";
    newElement.className = "text-lg p-2 bg-amber-200";
    insertMounted.value!.appendChild(newElement);
  }, 100);
};
onMounted(() => {
  console.log("sandoxContainer", sandoxContainer.value);

  insertDom();

  if (insertMounted.value) {
    setTimeout(() => {
      const newElement = document.createElement("div");
      newElement.textContent =
        "This is a dynamically generated DOM element. from timeout";
      newElement.className = "text-lg p-2 bg-green-200";
      insertMounted.value!.appendChild(newElement);
    }, 5000);
  }

  nextTick(() => {
    const newElement = document.createElement("div");
    newElement.textContent = "This is a dynamically generated DOM element. from nextTick";
    newElement.className = "text-lg p-2 bg-gray-200";
    insertMounted.value!.appendChild(newElement);
  });
});
</script>
