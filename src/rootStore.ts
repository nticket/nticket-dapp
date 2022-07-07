import { defineStore } from "pinia";

export const useRootStore = defineStore("root", {
  state: () => ({ greeting: "" }),
  actions: {
    sayHello() {
      this.greeting = "HelloWorld!";
    },
  },
});
