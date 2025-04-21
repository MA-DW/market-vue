import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

const PRIMARY_COLOR = "PRIMARY_COLOR";
const SECONDARY_COLOR = "SECONDARY_COLOR";

export const useColorStore = defineStore("colorStore", {
  state: () => ({
    primary: useStorage(PRIMARY_COLOR, "154, 148, 148"),
    secondary: useStorage(SECONDARY_COLOR, "216, 211, 211"),
  }),
  actions: {
    async setColors(primary: string, secondary: string) {
      this.primary = primary;
      this.secondary = secondary;
    },
  },
});
