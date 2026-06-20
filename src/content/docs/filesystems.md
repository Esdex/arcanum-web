---
title: "Choosing a Filesystem"
order: 4
section: "Concepts"
---

## Overview

When creating a vault, step 7 asks you to choose a filesystem. The filesystem determines how files are organised inside your encrypted container and sets limits on individual file sizes. Your choice here does not affect the encryption — it only affects how the content inside the vault is structured.

Arcanum currently supports two filesystems. Two more (NTFS and Ext2) are listed as coming soon.

## FAT

**Recommended for most users.**

FAT is the most universally compatible filesystem. Containers formatted with FAT can be opened on Windows, macOS, and Linux without any additional software or drivers. Arcanum automatically recommends FAT unless your vault is extremely large.

**Limitation:** individual files inside the vault cannot exceed **4 GB**. If you need to store a 4K video, a large database, or a disk image, you will hit this limit.

Compatible with: Windows ✅ · macOS ✅ · Linux ✅

## exFAT

**Use when you need files larger than 4 GB.**

exFAT is a modern Microsoft filesystem designed for flash storage. It removes the 4 GB per-file limit and supports individual files up to 16 EB (effectively unlimited). Like FAT, it works natively on Windows, macOS, and Linux without extra drivers.

The trade-off: exFAT containers are slightly less universally supported on very old systems, but for any modern desktop or laptop this is not a concern.

Compatible with: Windows ✅ · macOS ✅ · Linux ✅

## Comparison

| | FAT | exFAT |
|---|---|---|
| Max file size | 4 GB | 16 EB (no practical limit) |
| Windows | ✅ | ✅ |
| macOS | ✅ | ✅ |
| Linux | ✅ | ✅ |
| Best for | General use, photos, documents | Large files: video, disk images |

## Which should I choose?

- If you don't have files larger than 4 GB, choose **FAT**. It is the safer default with the broadest compatibility.
- If you need to store individual files over 4 GB, choose **exFAT**.

When in doubt, the wizard will automatically recommend the right option based on your vault size.
