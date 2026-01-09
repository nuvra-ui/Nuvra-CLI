import * as p from "@clack/prompts";

export const getAddGroup = async () => {
  return await p.group(
    {
      framework: () =>
        p.select({
          message: "Pick the framework of your project.",
          options: [
            { value: "react", label: "React (tsx)" },
            { value: "vuejs", label: "Vue.js" },
          ],
        }),
      component: () =>
        p.multiselect({
          message: "Select the components you want to add to your project.",
          options: [
            { value: "Button", label: "Button" },
            { value: "Link", label: "Link" },
            { value: "Switch", label: "Switch" },
          ],
          required: true,
        }),
    },
    {
      onCancel: () => {
        p.cancel("Operation cancelled.");
        process.exit(0);
      },
    },
  );
};
