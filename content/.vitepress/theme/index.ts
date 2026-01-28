// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'


// custom
import './custom.css'
import 'viewerjs/dist/viewer.min.css';
import imageViewer from 'vitepress-plugin-image-viewer';
import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue';
import { useRoute } from 'vitepress';
import ToolCalc from './components/ToolCalc.vue';

// 公告栏组件
const Announcement = () => h('div', {
    class: 'announcement-banner',
}, '⚠️ Alpha版本：可能存在错误, 欢迎大家提 Issue 反馈问题或建议')


export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
      // 注册全局组件（可选）
      app.component('vImageViewer', vImageViewer);
      app.component('ToolCalc', ToolCalc);
  },
  setup() {
      const route = useRoute();
      // 启用插件
      imageViewer(route);
  },
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots

	    'layout-top': () => h(Announcement)
    })
  },
} satisfies Theme
