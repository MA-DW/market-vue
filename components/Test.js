import { UikitCheckbox } from "#components";

export default defineComponent({
  setup() {
    const checked = ref(false);
    const indeterminate = ref(false);

    return () => [
      h(
        "div",
        h(UikitCheckbox, {
          modelValue: checked.value,
          "onUpdate:modelValue": (val) => (checked.value = val),
          indeterminate: indeterminate.value,
        })
      ),
      h("div", checked.value),
      h("div", indeterminate.value),
      h(
        "button",
        {
          onClick(ev) {
            indeterminate.value = !indeterminate.value;
          },
          class: "bg-primary text-white p-3",
        },
        "indeterminate state"
      ),
    ];
  },
});
