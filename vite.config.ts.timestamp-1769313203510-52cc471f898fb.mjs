// vite.config.ts
import { defineConfig } from "file:///C:/Users/nehaa/Downloads/clear-health-steps-main/clear-health-steps-main/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/nehaa/Downloads/clear-health-steps-main/clear-health-steps-main/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///C:/Users/nehaa/Downloads/clear-health-steps-main/clear-health-steps-main/node_modules/lovable-tagger/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\nehaa\\Downloads\\clear-health-steps-main\\clear-health-steps-main";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  // Base path for GitHub Pages - update 'repo-name' to your repository name
  // For custom domain or root deployment, use '/'
  base: process.env.VITE_BASE_PATH || "/"
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxuZWhhYVxcXFxEb3dubG9hZHNcXFxcY2xlYXItaGVhbHRoLXN0ZXBzLW1haW5cXFxcY2xlYXItaGVhbHRoLXN0ZXBzLW1haW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXG5laGFhXFxcXERvd25sb2Fkc1xcXFxjbGVhci1oZWFsdGgtc3RlcHMtbWFpblxcXFxjbGVhci1oZWFsdGgtc3RlcHMtbWFpblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvbmVoYWEvRG93bmxvYWRzL2NsZWFyLWhlYWx0aC1zdGVwcy1tYWluL2NsZWFyLWhlYWx0aC1zdGVwcy1tYWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgY29tcG9uZW50VGFnZ2VyIH0gZnJvbSBcImxvdmFibGUtdGFnZ2VyXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiBcIjo6XCIsXG4gICAgcG9ydDogODA4MCxcbiAgfSxcbiAgcGx1Z2luczogW3JlYWN0KCksIG1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIiAmJiBjb21wb25lbnRUYWdnZXIoKV0uZmlsdGVyKEJvb2xlYW4pLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgIH0sXG4gIH0sXG4gIC8vIEJhc2UgcGF0aCBmb3IgR2l0SHViIFBhZ2VzIC0gdXBkYXRlICdyZXBvLW5hbWUnIHRvIHlvdXIgcmVwb3NpdG9yeSBuYW1lXG4gIC8vIEZvciBjdXN0b20gZG9tYWluIG9yIHJvb3QgZGVwbG95bWVudCwgdXNlICcvJ1xuICBiYXNlOiBwcm9jZXNzLmVudi5WSVRFX0JBU0VfUEFUSCB8fCAnLycsXG59KSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXNaLFNBQVMsb0JBQW9CO0FBQ25iLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyx1QkFBdUI7QUFIaEMsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE9BQU87QUFBQSxFQUN6QyxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUyxDQUFDLE1BQU0sR0FBRyxTQUFTLGlCQUFpQixnQkFBZ0IsQ0FBQyxFQUFFLE9BQU8sT0FBTztBQUFBLEVBQzlFLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQTtBQUFBO0FBQUEsRUFHQSxNQUFNLFFBQVEsSUFBSSxrQkFBa0I7QUFDdEMsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
