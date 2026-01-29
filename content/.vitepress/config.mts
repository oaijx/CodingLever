import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

const hostname = 'https://vibelever.com'

// 如果是 GitHub Actions 环境 (workflow/deploy)，使用仓库子路径 '/CodingLever/'
const baseConfig = process.env.GITHUB_ACTIONS === 'true' ? '/CodingLever/' : '/'

// https://vitepress.dev/reference/site-config
export default withMermaid(defineConfig({
  lang: 'zh-CN',
  title: "Coding Lever",
  description: "编程即直觉，思考即杠杆",
  base: baseConfig,
  cleanUrls: true,
  // ignoreDeadLinks: true,
  sitemap: {
    hostname
  },
  markdown: {
    math: true
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'author', content: 'oaijx' }],
    ['meta', { name: 'keywords', content: 'Vibe Coding, 编程直觉, 思考杠杆, 工程化经验, 实战技巧' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Coding Lever' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@oaijx' }]
  ],
  // 动态生成每页的 meta 标签
  transformPageData(pageData) {
    const canonicalUrl = `${hostname}/${pageData.relativePath}`
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '.html');
    
    pageData.frontmatter.head = pageData.frontmatter.head || [];
    
    // 添加 canonical link
    pageData.frontmatter.head.push([
      'link',
      { rel: 'canonical', href: canonicalUrl }
    ]);

    // 如果页面有 description，则更新 og:description
    if (pageData.description) {
      pageData.frontmatter.head.push([
        'meta',
        { property: 'og:description', content: pageData.description }
      ]);
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/image/logo.png',
    // 1. 顶部导航：区分大章节
    nav: [
      { text: '📖 知识库', link: '/docs/' },
      { text: '🛠️ 工具箱', link: '/tool/' },
      { text: '🎯 案例库', link: '/cases/' }
    ],
    // 2. 侧边栏：区分具体的目录
    sidebar: {
      '/docs/': [{
          text: 'Coding Lever 教程',
          items: [
            { text: '第1章：Vibe Coding 决策指南', link: '/docs/vibecoding/', collapsed: true,
              items: [
                { text: '核心技术与策略详解', link: '/docs/vibecoding/claude_prompt_guide' }
              ]
            },
            { text: '第2章：语言与平台', link: '/docs/lang/', collapsed: true,
              items: [
                { text: 'Android', link: '/docs/lang/android/', collapsed: true,
                  items: [
                    { text: 'Android 基础1', link: '/docs/lang/android/android_1' },
                    { text: 'Android 基础2', link: '/docs/lang/android/android_2' },
                    { text: '布局与 XML', link: '/docs/lang/android/android_xml' },
                    { text: '动画', link: '/docs/lang/android/android_animate' },
                    { text: 'Gradle 构建', link: '/docs/lang/android/android_gradle' },
                    { text: 'APK 混淆与保护', link: '/docs/lang/android/android_apk_proguard' },
                    { text: '逆向与安全', link: '/docs/lang/android/android_reverse' }
                  ]
                },
                { text: 'C/C++', link: '/docs/lang/cxx_' },
                { text: 'Go', link: '/docs/lang/golang_' },
                { text: 'Swift', link: '/docs/lang/swift_' },
                { text: 'Flutter', link: '/docs/lang/flutter_' },
                { text: 'MVC/MVP/MVVM', link: '/docs/lang/architecture_mvc_mvp_mvvm' },
                { text: '软件设计的 7 大原则', link: '/docs/lang/architecture_7principle_in_software' }
              ]
            },
            { text: '第3章：数据库', link: '/docs/database/', collapsed: true,
              items: [
                { text: 'Redis 手册', link: '/docs/database/redis_manual' },
                { text: '常见 Db 基础', link: '/docs/database/common_details' },
                { text: 'MySQL 知识与实战', link: '/docs/database/mysql_info' },
                { text: 'Db 抽象理解', link: '/docs/database/dbs_abstract' },
                { text: 'High Performance Mysql 阅读', link: '/docs/database/high_performance_mysql' }
              ]
            },
            { text: '第4章：DevOps', link: '/docs/devops/', collapsed: true,
              items: [
                { text: 'Docker 基础', link: '/docs/devops/docker-base' },
                { text: 'K8s 基础', link: '/docs/devops/k8s_base' },
                { text: 'K8s 网络模式', link: '/docs/devops/k8s_net_mode' },
                { text: 'K8s 服务暴露方式', link: '/docs/devops/k8s_net_expose' },
                { text: 'K8s 服务类型', link: '/docs/devops/k8s_net_srv' },
                { text: 'K8s 滚动更新', link: '/docs/devops/k8s_rolling_update' },
                { text: 'K8s 在阿里云 GPU 环境', link: '/docs/devops/k8s_ali_gpu' },
                { text: 'IPVS 在 K8s 中的应用', link: '/docs/devops/ipvs_in_k8s' },
                { text: 'Redis Cluster 部署', link: '/docs/devops/redis_cluster' }
              ]
            },
            { text: '第5章：网络', link: '/docs/network/', collapsed: true,
              items: [
                { text: 'Tcp 与 Udp 对比', link: '/docs/network/introduce_tcp_udp' },
                { text: 'VPN 概览', link: '/docs/network/introduce_vpn' },
                { text: 'Grpc Over Http2', link: '/docs/network/grpc/grpc_over_http2' },
                { text: 'Grpc Interceptor With Go', link: '/docs/network/grpc/grpc_interceptor_with_go' },
                { text: 'Grpc Connectivity Semantics And Api', link: '/docs/network/grpc/grpc_connectivity_semantics_and_api' },
                { text: 'Grpc Source Notes', link: '/docs/network/grpc/grpc_source_notes' },
                { text: 'Http/2.0 与 Go 实践', link: '/docs/network/http2/http2_in_go' }
              ]
            },
            { text: '第6章：技能', link: '/docs/skills/', collapsed: true,
              items: [
                { text: '设计与 UI', link: '/docs/skills/design_' },
                { text: 'Git', link: '/docs/skills/git_' },
                { text: 'Linux', link: '/docs/skills/linux_' },
                { text: 'MacOS', link: '/docs/skills/macos_' },
                { text: '图形渲染', link: '/docs/skills/graph_render' },
                { text: '字符编码与字体', link: '/docs/skills/utils_font_and_coding' },
                { text: 'Windows 断点', link: '/docs/skills/windows_breakpoint' },
                { text: 'Windows 证书', link: '/docs/skills/windows_certificate' },
                { text: 'Windows 运行库', link: '/docs/skills/windows_runtime_lib' },
                { text: 'Office 文档安全', collapsed: true, items: [
                  { text: 'Office 格式简析', link: '/docs/skills/office/office_ms' },
                  { text: 'Office 加密机制', link: '/docs/skills/office/office_ms_crypto' },
                  { text: 'ShellLink 格式', link: '/docs/skills/office/office_ms_shellink' },
                  { text: 'PDF 结构分析', link: '/docs/skills/office/office_pdf_struct' }
                ]},
                { text: 'AI 与数学', collapsed: true, items: [
                  { text: 'PCA 原理推导', link: '/docs/skills/ai/derivation_of_PCA' }
                ]},
                { text: '编程与工具', collapsed: true, items: [
                  { text: 'Qt 基础', link: '/docs/skills/program_qt_base' },
                  { text: '测试实践', link: '/docs/skills/program_tests' },
                  { text: '少儿编程', link: '/docs/skills/children_program' },
                  { text: 'Linux 内存排查', link: '/docs/skills/linux_mem_grows' }
                ]}
              ]
            },
            { text: '第7章：分发与运营', link: '/docs/store/', collapsed: true,
              items: [
                { text: 'Google Play 指南', link: '/docs/store/google_play' },
                { text: 'GMS 服务集成', link: '/docs/store/gms_integration' }
              ]
            },
            { text: '第8章：读书与笔记', link: '/docs/rnote/', collapsed: true,
              items: [
                { text: '深度思考', link: '/docs/rnote/rnote_deep_mind' },
                { text: '持续交付（极客时间）摘要', link: '/docs/rnote/rnote_geekbang_devops' },
                { text: '架构（极客时间）摘要', link: '/docs/rnote/rnote_geekbang_architecture' },
                { text: 'Google 技能评分卡', link: '/docs/rnote/rnote_google_skill_level' },
                { text: '关于 PM', link: '/docs/rnote/about_pm' },
                { text: '网络协议', link: '/docs/rnote/network/', collapsed: true,
                  items: [
                    { text: '命令：ip', link: '/docs/rnote/network/cmds/ip' },
                    { text: '命令：ifconfig', link: '/docs/rnote/network/cmds/ifconfig' }
                  ]
                }
              ]
            }
          ]
      }],
      '/tool/': [
        { text: '常用工具', items: [ { text: '计算器', link: '/tool/calc' } ] }
      ]
    },
    // 3. 右侧大纲：显示文章内的小节
    outline: {
      level: [2, 3], 
      label: '本页大纲'
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换'
            }
          }
        }
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/oaijx/vibelever' }
    ],

    editLink: {
      pattern: 'https://github.com/oaijx/vibelever/blob/main/content/:path'
    },

    footer: {
      message: '<a href="https://beian.miit.gov.cn/" target="_blank">京ICP备2026xxxxxx号-x</a>',
      copyright: '本作品采用 <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议（CC BY-NC-SA 4.0）</a> 进行许可'
    }
  }
}))
