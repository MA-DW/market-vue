import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";

const STORE_USER = "STORE_USER";
const STORE_TOKEN = "STORE_TOKEN";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: useStorage<{
      id: number;
      name: string;
      company: { primary_color: string; secondary_color: string };
    } | null>(STORE_USER, null),
    token: useStorage<string | null>(STORE_TOKEN, null),
  }),
  actions: {
    login(userData: any, token: string) {
      this.user = userData;
      this.token = token;
    },
    logout() {
      this.user = null;
      this.token = null;
    },
  },
});
