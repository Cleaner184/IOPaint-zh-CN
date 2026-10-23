/* IOPaint 简体中文汉化补丁 —— 运行时 DOM 翻译层
 * 作者：本地注入补丁（不改动原打包文件）
 * 原理：监听 DOM，把界面英文文本/占位符/提示替换为中文；React 重渲染后自动重贴
 */
(function () {
  "use strict";
  var DICT = {
  "Tap here to load your picture": "点击此处加载图片",
  "Click here or drag an image file": "点击选择或拖入图片文件",
  "Please drag and drop only one file": "一次只能拖入一个文件",
  "Please drag and drop an image file": "请拖入图片文件",
  "file too large": "文件过大",
  "Upload image": "上传图片",
  "Upload custom mask": "上传自定义遮罩",
  "Run custom mask": "应用自定义遮罩",
  "Custom mask": "自定义遮罩",
  "Rerun previous mask": "复用上次的遮罩",
  "Reset zoom & pan": "重置缩放与平移",
  "Reset Zoom/Pan": "重置缩放/平移",
  "Undo": "撤销",
  "Redo": "重做",
  "Show original image": "查看原图",
  "View Original Image": "查看原图",
  "Save Image": "保存图片",
  "Run Inpainting": "开始修复",
  "Copy inpainting result to clipboard": "复制修复结果到剪贴板",
  "Copy Result": "复制结果",
  "Save image success": "图片保存成功",
  "Uh oh! Something went wrong.": "哎呀，出错了。",
  "Paste Image": "粘贴图片",
  "Trigger Manually Inpainting": "手动触发修复",
  "Settings": "设置",
  "Ok": "确定",
  "General": "通用",
  "Model": "模型",
  "Plugins": "插件",
  "File Manager": "文件管理",
  "Current Model": "当前模型",
  "Available models": "可用模型",
  "Please download model first": "请先下载模型",
  "Inpaint": "修复模型",
  "Stable Diffusion": "Stable Diffusion 模型",
  "Stable Diffusion Inpaint": "Stable Diffusion 修复模型",
  "Other Diffusion": "其他扩散模型",
  "Enable manual inpainting": "启用手动修复",
  "Enable download mask": "启用下载遮罩",
  "Enable auto extract prompt": "自动提取提示词",
  "Enable upload mask": "启用上传遮罩",
  "Enable upload custom mask to perform inpainting.": "启用后可上传自定义遮罩进行修复。",
  "Remove Background": "抠图 / 去背景",
  "Remove background model": "抠图模型",
  "RealESRGAN Model": "超分模型",
  "Interactive Segmentation": "交互式分割",
  "Interactive Segmentation Model": "交互式分割模型",
  "Enable file manger": "启用文件管理器",
  "Input directory": "输入目录",
  "Save directory": "保存目录",
  "Loading...": "加载中…",
  "How to download new model": "如何下载新模型",
  "Select RealESRGAN model": "选择超分模型",
  "Select interactive segmentation model": "选择分割模型",
  "Manage your account": "管理你的账户",
  "Hotkeys": "快捷键",
  "Pan": "平移画布",
  "Space + Drag": "空格 + 拖拽",
  "Decrease Brush Size": "减小画笔",
  "Increase Brush Size": "增大画笔",
  "Hold Tab": "按住 Tab",
  "Toggle Hotkeys Dialog": "打开/关闭快捷键说明",
  "Toggle Settings Dialog": "打开/关闭设置",
  "Toggle File Manager": "打开/关闭文件管理",
  "Paint": "画笔",
  "Reverse": "反选",
  "Clear": "清空",
  "Cropper": "裁剪重绘",
  "BrushNet": "BrushNet 掩码引导",
  "Select brushnet model": "选择 BrushNet 模型",
  "ControlNet": "ControlNet 结构控制",
  "Select control method": "选择控制方式",
  "LCM LoRA": "LCM 加速 LoRA",
  "Negative prompt": "反向提示词",
  "Example Image": "参考图",
  "An example image to guide image generation.": "用一张参考图引导生成结果。",
  "Upload example image": "上传参考图",
  "Image guidance scale": "参考图引导强度",
  "BrushNet is enabled, Strength is disabled.": "已启用 BrushNet，重绘强度不可用。",
  "Strength": "重绘强度",
  "Extender": "扩图",
  "Select axis": "选择扩展方向",
  "Task": "任务类型",
  "Select task": "选择任务",
  "Steps": "步数",
  "Guidance": "提示词引导系数",
  "Sampler": "采样器",
  "Select sampler": "选择采样器",
  "Seed": "随机种子",
  "Using same parameters and a fixed seed can generate same result image.": "固定种子 + 相同参数可复现同一结果。",
  "Mask blur": "遮罩边缘羽化",
  "Match histograms": "色彩直方图匹配",
  "Match the inpainting result histogram to the source image histogram": "让修复区域与原图的色调保持一致",
  "Mask OP": "遮罩操作",
  "CV2 Flag": "OpenCV 算法",
  "Select flag": "选择算法",
  "CV2 Radius": "邻域半径",
  "More info": "更多信息",
  "Generate Mask": "生成遮罩",
  "upscale 2x": "放大 2 倍",
  "upscale 4x": "放大 4 倍",
  "Anime Segmentation": "动漫人物分割",
  "Do you want to remove it or create a new one?": "要移除它，还是新建一个？",
  "Remove": "移除",
  "Create new": "新建",
  "Cancel": "取消",
  "Accept": "确认",
  "Buy me a coffee": "请我喝杯咖啡",
  "Image Directory": "图片目录",
  "Output Directory": "输出目录",
  "Mask Directory": "遮罩目录",
  "Name": "文件名",
  "Created time": "创建时间",
  "Modified time": "修改时间",
  "Rows layout": "列表视图",
  "Grid layout": "网格视图",
  "Search by file name": "按文件名搜索",
  "Descending Order": "降序",
  "Ascending Order": "升序",
  "I want to repaint of...": "我想把它改绘成…",
  "Enter": "回车",
  "Close": "关闭",
  "Also download the mask after save the inpainting result.": "保存修复结果时，同时下载遮罩",
  "Perform outpainting on images to expand it's content.": "对图片进行扩图，向外扩展画面内容",
  "Please draw mask on picture": "请先在图片上涂抹遮罩",
  "Select removebg model": "选择抠图模型",
  "Crop": "裁剪",
  "Download": "下载",
  "Delete": "删除",
  "Save": "保存",
  "Upload": "上传",
  "Apply": "应用",
  "Reset": "重置",
  "Yes": "是",
  "No": "否",
  "Prev": "上一页",
  "Next": "下一页",
  "Previous": "上一张",
  "For erase model, click a button to trigger inpainting after draw mask.": "擦除类模型：涂好遮罩后需点击按钮才会开始修复。",
  "Automatically extract prompt/negativate prompt from the image meta.": "从图片元数据中自动提取提示词 / 反向提示词。",
  "Hi, if you found my project is useful, please conside buy me a coffee to support my work. Thanks!": "觉得这个项目好用？欢迎请作者喝杯咖啡支持一下，谢谢！",
  "Inpainting on part of image, improve inference speed and reduce memory usage.": "只对图片局部进行修复，提升速度并降低显存占用。",
  "BrushNet is a plug-and-play image inpainting model works on any SD1.5 base models.": "BrushNet 是即插即用的修复模型，可搭配任意 SD1.5 底模使用。",
  "PowerPaint is a plug-and-play image inpainting model works on any SD1.5 base models.": "PowerPaint 是即插即用的修复模型，可搭配任意 SD1.5 底模使用。",
  "Using an additional conditioning image to control how an image is generated": "用一张额外的条件图来控制画面生成方式",
  "Negative prompt guides the model away from generating certain things in an image": "反向提示词：告诉模型不要生成某些内容",
  "Perform outpainting on images to expand it": "对图片进行扩图，向外扩展画面",
  "How much to blur the mask before processing, in pixels. Make the generated inpainting boundaries appear more natural.": "修复前对遮罩做高斯模糊的像素半径，越大边缘越自然。",
  "Expand or shrink mask. Using the slider to adjust the kernel size for dilation or erosion.": "膨胀或收缩遮罩，用滑块调整核大小。",
  "Notifications (F8)": "通知 (F8)",
  "Expand": "膨胀",
  "Shrink": "收缩",
  "text-guided": "文本引导",
  "context-aware": "上下文感知",
  "shape-guided": "形状引导",
  "object-remove": "对象移除",
  "outpainting": "扩图",
  "Clean": "清洁",
  "Hotkey": "快捷键"
};
  var RULES = [
    [/^Images \((\d+)\)$/, "图片 ($1)"],
    [/^Run (.+?) successfully in (.+?)s$/, "$1 处理完成，用时 $2 秒"],
    [/^Switching model from (.+) to (.+)$/, "正在切换模型：$1 → $2"],
    [/^Switch to (.+) success$/, "已切换到 $1"],
    [/^Switch to (.+) failed: (.+)$/, "切换到 $1 失败：$2"],
    [/^The size of the mask must same as image: (.+)$/, "遮罩尺寸必须与图片一致：$1"],
    [/^Something went wrong: (.+)$/, "出错了：$1"],
    [/^Please draw mask on picture$/, "请先在图片上涂抹遮罩"],
  ];
  var ATTRS = ["placeholder", "title", "aria-label", "alt", "label"];
  var SKIP_TAG = { SCRIPT: 1, STYLE: 1, CODE: 1, PRE: 1, KBD: 1, TEXTAREA: 1 };
  var CJK = /[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/;

  function translate(raw) {
    if (!raw) return null;
    var s = raw.trim();
    if (!s || s.length > 120 || CJK.test(s)) return null;
    if (Object.prototype.hasOwnProperty.call(DICT, s)) return DICT[s];
    for (var i = 0; i < RULES.length; i++) {
      if (RULES[i][0].test(s)) return s.replace(RULES[i][0], RULES[i][1]);
    }
    return null;
  }

  function doText(node) {
    var zh = translate(node.nodeValue);
    if (zh === null) return;
    var v = node.nodeValue, lead = v.match(/^\s*/)[0], tail = v.match(/\s*$/)[0];
    node.nodeValue = lead + zh + tail;
  }

  function doAttrs(el) {
    if (!el.getAttribute) return;
    for (var i = 0; i < ATTRS.length; i++) {
      var a = ATTRS[i], v = el.getAttribute(a);
      if (!v) continue;
      var zh = translate(v);
      if (zh !== null) el.setAttribute(a, zh);
    }
  }

  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) { doText(root); return; }
    if (root.nodeType !== 1) return;
    if (SKIP_TAG[root.tagName]) return;
    doAttrs(root);
    var kids = root.childNodes;
    for (var i = 0; i < kids.length; i++) walk(kids[i]);
  }

  var scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    setTimeout(function () { scheduled = false; walk(document.body); }, 60);
  }

  function boot() {
    document.documentElement.lang = "zh-CN";
    walk(document.body);
    new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        var m = muts[i];
        if (m.type === "characterData") { doText(m.target); }
        else if (m.type === "childList") {
          for (var j = 0; j < m.addedNodes.length; j++) walk(m.addedNodes[j]);
        } else if (m.type === "attributes") { doAttrs(m.target); }
      }
      schedule();
    }).observe(document.body, {
      childList: true, subtree: true, characterData: true, attributes: true,
      attributeFilter: ATTRS,
    });
    var delays = [300, 800, 1600, 3000, 6000];
    delays.forEach(function (d) { setTimeout(function () { walk(document.body); }, d); });
    console.log("[汉化] IOPaint 简体中文补丁已加载，词条 " + Object.keys(DICT).length + " 条");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
