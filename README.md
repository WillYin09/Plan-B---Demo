# Restart Guide · 重启指南 🧭

一款专为职场「暂停期」用户打造的一站式情绪陪伴与任务支持 Web App，由产品 Owner 独立设计并通过 AI 工具（ChatGPT + Cursor）完成开发。

---

## 🌟 产品定位

人生的暂停，不意味着停滞，而是一次重启的机会。Restart Guide 帮助用户缓解职场空窗期的焦虑，提供情绪陪伴、任务激励与信息引导，助力重新出发。

---

## ✨ 功能模块

- 📌 **启动引导（Onboarding）**

  - 通过简短问答，明确用户当前状态与需求
  - 自动生成个性化的任务建议

- 📝 **每日打卡（Daily Check-in）**

  - 记录每日心情、完成任务与主观感受
  - 数据自动记录并支持回显、修改

- 🤖 **AI情绪支持（Emotion Support）**

  - 提供 AI 对话陪伴与情绪调节技巧
  - 内置冥想模块，支持用户放松与自我调节

- 📚 **政策卡片（Policy Cards）**

  - 聚合各地职场相关政策，快速查询与参考

---

## 💡 项目亮点

- **AI驱动开发**：结构化 Prompt 驱动 AI 工具（Cursor、ChatGPT）高效完成代码与 UI 搭建。
- **完整数据闭环**：Supabase 搭建用户数据表，实现完整的数据插入、查询、回显。
- **温暖视觉语言**：统一视觉风格与柔和文案体系，提供贴心陪伴体验。
- **多角色协作**：以产品 Owner 身份协调前端、数据开发与 AI 工具，实现从产品设计到上线的闭环。

---

## 🧰 技术栈

- **前端框架**：Next.js (App Router)
- **样式体系**：Tailwind CSS + WindiCSS
- **数据库**：Supabase (PostgreSQL)
- **AI工具**：Cursor、ChatGPT
- **部署平台**：Vercel

---

## 📂 项目结构

```
Restart-Guide
├── app
│   ├── onboarding
│   ├── checkin
│   ├── mood
│   ├── policy
│   └── user
│   └── .. 其余模块
├── components
│   ├── Cards
│   ├── Buttons
│   └── UI
├── public
│   └── illustrations
├── supabase
│   └── schema.sql
├── styles
└── docs
    └── selected-dialogue.md
```

---

## 📸 演示预览

- 🎞️ [项目 DEMO 视频（点击观看）](#)
- 📷 [界面截图展示（点击查看）](#)

---

## 📚 精选对话记录

本项目的独特之处在于我与 GPT、Cursor 等 AI 工具的深度协作，完整记录了从需求定义、Prompt 设计到代码落地的全过程。

- 如何通过 Prompt 精准驱动 Cursor 自动化开发？
- 如何设计 Supabase 数据结构实现页面数据回显？
- 非技术人如何完整推进一个 Web 项目到部署上线？

详情请访问 [`docs/selected-dialogue.md`](#)

---

## 🚧 当前状态与下一步

**当前版本：v0.8**

- 已完成核心功能与数据闭环，页面稳定可用。

**下一步计划：**

- 优化打卡历史数据可视化
- 探索多模态（语音、图像）输入与反馈机制

---

## 🤝 联系与交流

欢迎通过以下方式与我交流、合作或提出建议：

- [GitHub Issues](https://github.com/WillYin09/restart_guide/issues)
- [小红书主页](https://www.xiaohongshu.com/user/profile/607615b4000000000101e2fa?xsec_token=YB8cACrT0fFfMOApQeWDvA3LVpFbURBITU29hFjqQMSE4%3D&xsec_source=app_share&xhsshare=CopyLink&appuid=607615b4000000000101e2fa&apptime=1751249221&share_id=0e751da180fa459cb01738d60e030a6c&share_channel=copy_link)

感谢关注！✨
