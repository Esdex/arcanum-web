---
title: "Choosing a Filesystem"
order: 4
section: "Concepts"
---

## Overview

When creating a vault, the wizard asks you to choose a filesystem. The filesystem determines how files are organised inside your encrypted container and sets limits on individual file sizes. Your choice here does not affect the encryption — it only affects how the content inside the vault is structured.

Arcanum supports three filesystems: FAT, exFAT, and ext4.

## FAT

**Recommended for most users.**

FAT is the most universally compatible filesystem. Containers formatted with FAT can be opened on Windows, macOS, and Linux without any additional software or drivers. Arcanum recommends FAT for vaults up to 4 GB, and exFAT above that — a vault smaller than 4 GB cannot hold a file FAT would refuse, so there is nothing to gain by giving up FAT's compatibility.

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

## The same file in two places

Only in ext4 vaults.

Sometimes one file belongs in more than one place: a photo that is both in a trip folder and in a favourites folder, a document that two projects need. Copying it means two files from that moment on — twice the space, and editing one leaves the other behind.

An ext4 vault can give a file a **second name** instead. Open the three dots beside it, choose **Create link**, and pick the folder. To do several at once, select them and use the link icon in the bar at the top.

What you get is not a copy and not a shortcut. It is the same file, reached from two places:

- it takes no extra space — nothing was duplicated
- a change made through one name is there under the other, because there is only one file
- neither name is the original, and removing one leaves the other working
- the space comes back only when the last name is removed

Because both names are equally the file, there is nothing on screen to tell one from the other. The place it shows is **Properties**, which says how many places the file is in once there is more than one. Deleting says so too: removing a name from a file that has others tells you the file will stay where its other names are, and that no space will be freed.

### Linking a folder

A folder can be linked the same way, and the wording in the app is the same — but what you get is different, and the difference matters.

A folder link is a **pointer to the folder**, not the folder itself. Opening it takes you inside, and nothing is duplicated, but the pointer only works while the folder is where it was. Move the folder or delete it and the link goes dead. Arcanum marks a dead link as such rather than letting it look like a damaged file, and its Properties still say where it was pointing.

Files behave differently here on purpose: a second name for a file cannot go dead, because it is not pointing at anything. This is a rule of the filesystem, not a choice — a folder cannot have a second name, so a pointer is the only thing that can be offered.

### Links made on a computer

An ext4 vault written on a Linux desktop may already contain links, and Arcanum reads them: a link to a file opens the file, a link to a folder goes into the folder.

One thing to expect. A link written on a desktop often points at a path on that desktop — something like `/home/you/photos/holiday.jpg`. Inside a vault that path means "from the root of the vault", where nothing of the sort exists, so such links arrive already dead. They are marked as dead rather than shown as broken files, and their Properties say what they were looking for.

### Moving and copying a link

Inside its own vault a link stays a link. Copied, it is written again pointing at the same place — a dead one included, since a link that leads nowhere copies as a link that leads nowhere. Moved, it simply changes folder.

Moving anything inside a vault is a rename now: nothing is read and nothing is written, so it finishes at once however large the file is, and a file that has two names keeps both of them.

Into another vault — or onto a FAT or exFAT one, which cannot hold a link at all — a link cannot travel as a link. Copying it takes a copy of what it leads to. Moving it leaves it where it is rather than quietly turning it into a copy, and the summary at the end says how many items stayed behind.

### Taking one out of the vault

Export writes onto the phone's own storage, where nothing can hold a second name for a file. A link cannot leave the vault as a link, so what leaves is always a plain copy — and Arcanum says what that came to:

- a folder link is exported as a real copy of the folder it points at, under the link's own name
- a file exported under two of its names lands as two ordinary files, taking the space twice. The summary at the end says how many did, since that is the one thing the feature exists to avoid
- a link that leads nowhere is skipped rather than written out as an empty file, and so is a folder link pointing back into what is being exported. The summary counts those too

### Not on FAT or exFAT

Neither filesystem has any notion of one file under two names, and the option does not appear on those vaults. The only thing that could be offered instead is a copy — which takes the space again and stops being the same file, the two things this exists to avoid. If you need it, the vault has to be ext4.

## Comparison

| | FAT | exFAT | ext4 |
|---|---|---|---|
| Max file size | 4 GB | 16 EB (no practical limit) | 16 TB |
| Files per folder | Limited | Large | Unlimited |
| Same file in two places | ❌ | ❌ | ✅ |
| Windows | ✅ | ✅ | Driver needed |
| macOS | ✅ | ✅ | Driver needed |
| Linux | ✅ | ✅ | ✅ |
| Best for | General use, photos, documents | Large files: video, disk images | Linux-only workflows, many files |

## If the phone dies part way through a write

No vault carries a journal. FAT and exFAT have no such thing at all, and Arcanum's ext4 vaults are made without one deliberately — a journal that is written but never replayed is worse than none, and replaying one correctly is a large piece of work that buys nothing while the phone is the only thing writing to the vault.

The consequence is the same for all three: if the app is killed, the battery runs out, or a USB drive is pulled while a file is being written, the vault is left in whatever state the last completed write put it in.

**For ext4, what that means has been measured rather than assumed.** Every single block write of every operation — creating a file, deleting one, renaming, making and removing folders, growing a file, shortening one, writing into the middle of one — has been interrupted on purpose in testing, one write at a time, and the result checked with `e2fsck`. In every case what is left behind is bookkeeping a filesystem check tidies up, and the repair never costs anything else in the vault: every other file comes back byte for byte. What is **not** promised is the file being written at that moment. It may be there, it may be partly there, or it may not exist.

Arcanum marks an ext4 vault as being written to before it starts, and marks it finished when the writes are on disk. So:

- Opening a vault that was interrupted tells you so, once, and the vault opens and works normally.
- A Linux desktop opening the same container sees the same mark and runs its own check without being asked.

To run the check yourself, unlock the container in VeraCrypt with **Do not mount** selected, then:

```
sudo e2fsck -f /dev/mapper/veracrypt1
```

replacing `veracrypt1` with whatever VeraCrypt reports as the mapped device.

**For FAT and exFAT the same interruption is repaired by the host's own tools** — `chkdsk` on Windows, `fsck.vfat` or `fsck.exfat` on Linux — and the same caveat applies to the file being written. Arcanum does not mark these as being written to, so nothing will tell you a check is due; and unlike ext4, this has not been measured here the way the above was. If a vault was interrupted and you want certainty, run the check.

## Which should I choose?

- If you don't have files larger than 4 GB and want the vault to open anywhere, choose **FAT**. It is the safer default with the broadest compatibility.
- If you need to store individual files over 4 GB and still want Windows and macOS to open the vault, choose **exFAT**.
- If you only ever open the vault on Linux or on your phone, choose **ext4**. It handles a large number of files better than either FAT variant.

When in doubt, the wizard preselects an option based on your vault size, and you can override it.
