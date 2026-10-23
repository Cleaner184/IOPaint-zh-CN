# IOPaint 简体中文汉化补丁 (zh-CN)

给 [IOPaint](https://github.com/Sanster/IOPaint) 1.6.0 的 WebUI 加上简体中文界面。
**不修改原打包文件、不改动后端逻辑**，通过运行时 DOM 翻译层实现，可一键还原。

## 为什么不用改源码
IOPaint 前端是 Vite 打包的单页应用（`iopaint/web_app/assets/index-*.js`），
源码里**没有任何 i18n 框架**，所有文案都硬编码在 21 个 TSX 组件中。
上游唯一的本地化请求（issue #307）被 stale 机器人自动关闭，从未实现；
GitHub 上也**不存在任何第三方汉化项目**（repo 搜索结果为 0）。

本补丁的做法：注入一个独立 JS，监听 DOM，把界面文本/占位符/提示替换为中文；
React 重渲染后自动重贴，因此不用重新编译前端，也不会在升级时引入冲突。

## 效果截图

| 扩散模型侧栏 | 设置 · 模型 | 首页 |
|---|---|---|
| ![diffusion](screenshots/diffusion-panel.png) | ![settings](screenshots/settings-model.png) | ![main](screenshots/main.png) |

## 安装
```bash
# 用装了 iopaint 的那个 Python 执行
D:\ai-models\venv-iopaint\Scripts\python.exe apply.py
# 然后刷新浏览器（Ctrl+F5）即可
```

## 检查 / 卸载
```bash
python apply.py --check      # 查看当前状态
python apply.py --uninstall  # 还原英文原版
```

## 升级 iopaint 后
`pip install -U iopaint` 会覆盖 `web_app`，重新执行一次 `apply.py` 即可。
（若上游将来支持 i18n，本补丁可直接卸载，无残留。）

## 目录说明
| 文件 | 作用 |
|---|---|
| `zh-CN.js` | 汉化引擎 + 词表（唯一需要维护的文件） |
| `zh-CN.dict.json` | 纯词表，便于校对/贡献 |
| `apply.py` | 安装 / 卸载 / 检查 |

## 覆盖情况（已在真实浏览器中逐屏验证）

| 界面 | 状态 |
|---|---|
| 首页 / 拖拽上传 / 文件选择 | ✅ |
| 编辑器工具栏（画笔、撤销重做、原图对比、保存、复制、修复按钮） | ✅ |
| 设置 · 模型页（当前模型、可用模型、四类分组） | ✅ |
| 设置 · 通用页（手动修复、下载遮罩、自动提取提示词及说明） | ✅ |
| 设置 · 插件页（抠图 / 超分 / 交互式分割及各自模型选择） | ✅ |
| 快捷键说明对话框（全部 15 项） | ✅ |
| 扩散模型侧栏（裁剪重绘、扩图、遮罩羽化、遮罩操作膨胀/收缩/反选/清空、直方图匹配、步数、引导、强度、采样器、种子、反向提示词、BrushNet、PowerPaint 任务、ControlNet、LCM） | ✅ |
| OpenCV(cv2) 侧栏 / LDM 侧栏 | ✅ |
| 文件管理器（目录切换、排序、布局、搜索） | ✅ |
| 交互式分割确认框、toast 提示 | ✅ |

**159 条词条已用「逐条注入 DOM 比对」方式全量回归：159/159 生效，0 条失效。**
（注意：BrushNet/ControlNet 的子选项面板需后端开启对应能力才会出现，其文案已预先录入并在引擎层验证通过。）

## 当前覆盖
- 首页、拖拽上传、工具栏全部 tooltip
- 设置对话框三个页签（模型 / 通用 / 插件）含全部说明文字
- 快捷键说明对话框
- 侧栏参数（画笔/反选/清空、裁剪重绘、BrushNet、ControlNet、LCM、扩图、
  PowerPaint 任务、步数/引导/采样器/种子/遮罩羽化/直方图匹配、遮罩操作）
- 文件管理器、交互式分割确认框、提示词输入、toast 提示

**有意保留英文**：模型 ID（`lama`、`briaai/RMBG-1.4`）、采样器名（`DPM++ 2M`）、
品牌名（RealESRGAN / BrushNet / PowerPaint / ControlNet / Stable Diffusion）。

## 技术要点
- 精确匹配词表 + 正则规则（处理含变量的句子，如 `Run xxx successfully in 1.4s`）
- MutationObserver 监听 `childList / characterData / attributes`，覆盖 Radix 的 Portal 弹层与 toast
- 跳过 `SCRIPT/STYLE/CODE/PRE/KBD/TEXTAREA`，不改 `input.value`（只改 placeholder），保证上传/参数提交不受影响
- 已含中文的节点不再二次处理，避免死循环

## 许可
词表与引擎为本项目原创，随 IOPaint 本体一同按 Apache-2.0 使用。
