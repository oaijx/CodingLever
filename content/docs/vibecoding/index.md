---
title: Vibe Coding 决策指南
description: 掌握 Prompt Engineering 的核心决策逻辑，为不同任务选择最优的提示词策略。
keywords: Vibe Coding, Prompt Engineering, 提示词工程, 决策指南, AI 提效
---
# Vibe Coding 决策指南

> [!CAUTION]
> ⚠️ **可能存在错误, 欢迎大家提 Issue 反馈问题或建议**

如何为你的任务选择最合适的提示词策略？

本章将带你深入理解 Prompt Engineering 的核心决策逻辑。你可以通过下方的思维导图快速定位，也可以深入阅读各个章节。

## 🗺️ 决策思维导图 (Mindmap)

```mermaid
%%{init: {'theme': 'default', 'themeVariables': { 'fontSize': '18px' }}}%%
mindmap
  root((🎯 决策入口))
    输入类型
      简单事实
        主策略
          零样本提示 Zero-Shot
        辅助
          清晰指令 Clear Instructions
      特定格式
        主策略
          少样本提示 Few-Shot
        辅助
          Markdown 规范
    推理复杂度
      单点复杂
        主策略
          思维链 CoT
        辅助
          自洽性 Self-Consistency
      多步长流程
        主策略
          任务分解 Decomposed
        辅助
          从少到多 Least-to-Most
    创意程度
      创意内容
        主策略
          角色扮演 Role
          风格模拟 Style
        辅助
          骨架填充 Skeleton
    专业性
      专家分析
        主策略
          角色扮演 Role
        辅助
          上下文增强 Contextual
          换位思考 Perspective-Taking
    决策风险
      关键决策
        主策略
          思维树 ToT
        辅助
          自洽性 Self-Consistency
          交互式迭代 Interactive
```



## 章节概览

- **[核心技术与策略详解 (Core Techniques & Strategies)](/docs/vibecoding/claude_prompt_guide)**
  <br>深入理解 Prompt Engineering 的基础原子与实战策略组合，涵盖从简单格式化到复杂逻辑推理的全方位落地指南。


## Reference
- https://claude.ai/public/artifacts/d3981927-4a8c-4e95-bc61-12c64cc10132
- https://github.com/ThamJiaHe/claude-prompt-engineering-guide
