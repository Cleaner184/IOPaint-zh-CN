#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""IOPaint 简体中文汉化补丁 —— 安装 / 卸载 / 检查

用法（在任意已安装 iopaint 的 Python 环境里执行）：
    python apply.py              # 安装或更新
    python apply.py --check      # 只检查当前状态
    python apply.py --uninstall  # 完全还原英文原版
"""
import argparse
import hashlib
import re
import shutil
import sys
from pathlib import Path

try:  # 中文/表情符号在 GBK 控制台下不报错
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

HERE = Path(__file__).resolve().parent
PATCH_JS = HERE / "zh-CN.js"
MARK_RE = re.compile(r'\s*<script src="/assets/zh-CN\.js[^"]*"[^>]*></script>')


def web_dir() -> Path:
    try:
        import iopaint
    except ImportError:
        sys.exit("未找到 iopaint，请先在该环境执行: pip install iopaint==1.6.0")
    return Path(iopaint.__file__).resolve().parent / "web_app"


def version() -> str:
    return hashlib.md5(PATCH_JS.read_bytes()).hexdigest()[:8]


def install() -> int:
    web = web_dir()
    index = web / "index.html"
    if not index.exists():
        sys.exit(f"未找到前端入口: {index}")
    backup = web / "index.html.orig"
    if not backup.exists():
        shutil.copyfile(index, backup)
        print(f"[1/3] 已备份原版入口 -> {backup.name}")
    else:
        print("[1/3] 原版备份已存在，跳过")

    shutil.copyfile(PATCH_JS, web / "assets" / "zh-CN.js")
    print(f"[2/3] 已部署汉化脚本 -> assets/zh-CN.js（{version()}）")

    html = index.read_text(encoding="utf-8")
    html = MARK_RE.sub("", html)
    html = html.replace('<html lang="en">', '<html lang="zh-CN">')
    tag = f'    <script src="/assets/zh-CN.js?v={version()}" defer></script>\n  '
    if "</head>" not in html:
        sys.exit("index.html 结构异常，未找到 </head>")
    html = html.replace("</head>", tag + "</head>", 1)
    index.write_text(html, encoding="utf-8")
    print("[3/3] 已注入 <script> 标签，刷新浏览器即可看到中文界面")
    print("\n完成！如需还原： python apply.py --uninstall")
    return 0


def uninstall() -> int:
    web = web_dir()
    index, backup = web / "index.html", web / "index.html.orig"
    if backup.exists():
        shutil.copyfile(backup, index)
        print("已还原 index.html")
    else:
        index.write_text(MARK_RE.sub("", index.read_text(encoding="utf-8")), encoding="utf-8")
        print("已移除补丁标签（未找到备份）")
    (web / "assets" / "zh-CN.js").unlink(missing_ok=True)
    print("已删除 assets/zh-CN.js\n还原完成！")
    return 0


def check() -> int:
    web = web_dir()
    html = (web / "index.html").read_text(encoding="utf-8")
    m = re.search(r"zh-CN\.js\?v=(\w+)", html)
    state = "已启用（版本 %s）" % m.group(1) if m else "未启用"
    js_ok = "存在" if (web / "assets" / "zh-CN.js").exists() else "缺失"
    bak_ok = "存在" if (web / "index.html.orig").exists() else "缺失"
    print("前端目录 : %s" % web)
    print("汉化状态 : %s" % state)
    print("脚本文件 : %s" % js_ok)
    print("原版备份 : %s" % bak_ok)
    return 0


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description="IOPaint 简体中文汉化补丁")
    ap.add_argument("--uninstall", action="store_true", help="还原英文原版")
    ap.add_argument("--check", action="store_true", help="检查安装状态")
    a = ap.parse_args()
    sys.exit(uninstall() if a.uninstall else check() if a.check else install())
