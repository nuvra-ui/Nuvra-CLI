export function getFileExtension(framework: string): string {
  switch (framework) {
    case "react":
      return ".tsx";
    case "vuejs":
      return ".vue";
    default:
      return ".js";
  }
}
