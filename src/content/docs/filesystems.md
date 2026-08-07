---
title: "Choosing a Filesystem"
order: 4
section: "Concepts"
---

## Overview

When creating a vault, step 7 asks you to choose a filesystem. The filesystem determines how files are organised inside your encrypted container and sets limits on individual file sizes. Your choice here does not affect the encryption — it only affects how the content inside the vault is structured.

Arcanum supports three filesystems: FAT, exFAT, and ext4.

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

## ext4

**Use if you work on Linux, or stay on the phone.**

ext4 is the standard Linux filesystem. It removes the structural limits FAT carries: there is no cap on how many files a single folder can hold, and it fragments far less as a vault fills up. Individual files can be up to 16 TB.

Because it is a real Linux filesystem, a vault formatted here mounts read-write on a Linux desktop with the standard tools, and an ext4 container created on a desktop opens in Arcanum.

**Limitation:** Windows and macOS have no built-in ext4 support. Opening such a vault there needs third-party software.

Arcanum's ext4 support is a clean-room implementation written from the published on-disk format. It carries no third-party filesystem code.

Compatible with: Windows ❌ (third-party driver needed) · macOS ❌ (third-party driver needed) · Linux ✅ · Android ✅

## Comparison

| | FAT | exFAT | ext4 |
|---|---|---|---|
| Max file size | 4 GB | 16 EB (no practical limit) | 16 TB |
| Files per folder | Limited | Large | Unlimited |
| Windows | ✅ | ✅ | Driver needed |
| macOS | ✅ | ✅ | Driver needed |
| Linux | ✅ | ✅ | ✅ |
| Best for | General use, photos, documents | Large files: video, disk images | Linux-only workflows, many files |

## Which should I choose?

- If you don't have files larger than 4 GB and want the vault to open anywhere, choose **FAT**. It is the safer default with the broadest compatibility.
- If you need to store individual files over 4 GB and still want Windows and macOS to open the vault, choose **exFAT**.
- If you only ever open the vault on Linux or on your phone, choose **ext4**. It handles a large number of files better than either FAT variant.

When in doubt, the wizard preselects an option based on your vault size, and you can override it.
