---
title: "Other Apps and a Vault"
order: 5
section: "Vault Management"
---

## Overview

A vault can be opened by other apps on your phone, in both directions: you can hand a file out to an app that knows how to read it, and you can let an app write straight into the vault. Neither is on by default. **External app access** is a per-vault setting, off until you turn it on, and it only means anything while that vault is open.

Everything crosses the boundary encrypted. An app reading a file from a vault is served the bytes on demand, decrypted as they are handed over; an app writing into a vault has its bytes encrypted on the way in. Nothing is decrypted to your device's storage at any point, and there is no temporary copy left behind.

## Turning it on

Open the vault's settings and turn on **External app access**. While that vault is open, two things become true:

- **Open with…** appears in a file's menu inside Arcanum.
- The vault shows up in your phone's file picker as a storage location, so other apps can browse to it and save into it.

Turn it off again in the same place. Access also ends the moment the vault is closed, whether you close it yourself or Arcanum locks.

Other apps never see the vault on their own. Arcanum's storage location is registered with the system in a way only Android's own file picker can list; another app reaches a file or a folder only because you picked it there and granted it.

## Handing a file out

**Open with…** in a file's menu passes the file to another app. See [Working with Files in a Vault](/docs/files/) for that side of it.

## Letting another app write in

Anywhere another app asks you to choose a folder - a download location, a save destination, an export target - the open vault can be chosen. From then on that app writes into the vault instead of your phone's storage, and what it writes is encrypted like everything else inside.

When an app creates a file whose name is already taken, the new one is saved alongside as `name (1).ext` rather than replacing what is there.

Granting a folder grants the whole of it. An app you have handed a folder to can create, rename and delete inside it, not only add to it. Pick the folder you mean, not the root of the vault, when the app only needs one place to write.

If the vault is mounted read-only, other apps can read from it and nothing more.

## Using a vault as a download folder

A download manager, a comic or podcast app, a scanner - anything that saves files unattended - can be pointed at a vault so its downloads land encrypted. Three things to set up:

1. Turn on **External app access** for the vault.
2. In **Settings > Security**, turn on **Keep vaults open in the background**. Without it Android is free to close Arcanum while you are in the other app, and the vault closes with it, which kills the download partway.
3. In that vault's settings, check that **Unmount when in background** and **Unmount on lock screen** are off.

Auto-lock itself will not interrupt a download in progress: writing into a vault counts as activity, so the idle clock does not run while files are arriving.

## When the vault is closed

The vault disappears from the file picker and every read and write fails. Arcanum will never quietly put your data somewhere else in the clear.

What the other app does about that failure is its own business, and worth knowing before you rely on it: some report an error, some retry, and some fall back to their default folder on ordinary storage. Keep the vault open while something is downloading into it.

## What Arcanum cannot control

The file inside the vault is encrypted. What the other app keeps elsewhere is not.

Some apps write to their own temporary folder first and move the finished file into the destination afterwards, which leaves an unencrypted copy on ordinary storage until they delete it. Reader apps commonly cache covers, thumbnails and rendered pages in their own cache folder, outside the vault. None of that is visible to Arcanum and none of it can be prevented from here.

If it matters to you, test with one small file first and look through the other app's own settings for a temporary or cache location.

## Worth knowing

- Files inside a vault are not registered with Android's media database, so gallery apps and media scanners do not index them.
- Writing into a vault is slower than writing to ordinary storage: every write is encrypted and placed inside the container file.
- A vault formatted as FAT32 cannot hold a file larger than 4 GB. For large downloads, choose exFAT or ext4 when creating the vault - see [Choosing a Filesystem](/docs/filesystems/).
- While external app access is on and the vault is open, anything you have granted keeps its access. Turn the setting off, or close the vault, when you are done - see [Using Arcanum Safely](/docs/using-arcanum-safely/).
