export const useColorStore = defineStore("colorStore", {
  state: () => ({
    primary: "154, 148, 148",
    secondary: "216, 211, 211",
  }),
  actions: {
    async fetchColors() {
      const data: { primary: string; secondary: string } = await new Promise(
        (r) => {
          setTimeout(() => {
            r({
              primary: "22, 87, 136",
              secondary: "0, 174 ,239",
            });
          }, 2000);
        }
      );
      this.primary = data.primary;
      this.secondary = data.secondary;
    },
  },
});
