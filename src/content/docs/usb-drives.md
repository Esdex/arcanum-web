---
title: "USB Flash Drives"
order: 7
section: "Concepts"
---

## Overview

Arcanum can put a vault on a USB flash drive plugged into your phone, and open one that is already there. The vault works exactly as a file-based one does — same encryption, same filesystems, same passwords and keyfiles — but the drive itself is a physical object that Android also wants to manage, and that produces behaviour worth understanding before you rely on it.

A drive can hold a vault in two shapes:

- **A partition**, with the rest of the drive left as ordinary storage. The drive still looks and behaves like a normal flash drive.
- **The whole device**, with no partition table at all. Everything on the drive is the vault.

The partition is the better choice for almost everyone, for reasons the next section explains.

## Three things Android does, none of them faults

**The drive disappears while Arcanum is using it.** To read and write raw sectors, Arcanum takes the USB interface from the system driver. Android loses the drive for as long as Arcanum holds it, and gets it back when you unplug and replug — not when you unmount the vault. Nothing is broken; the drive is simply claimed by another program.

**A whole-device vault makes Android offer to format the drive.** With no partition table there is nothing the system recognises, so it concludes the drive is unformatted and offers to fix it. That offer appears on every connection, and accepting it destroys the vault. This is the single strongest argument for putting the vault in a partition instead: a partitioned drive raises no such prompt.

**Pulling a drive can lose the last writes.** A flash drive has its own write cache, and many drives do not implement the command that would flush it on demand. Arcanum flushes what it holds when you leave the app or the screen locks, and unmounting flushes everything it can — but the drive's own cache is beyond reach. Use **Eject** and wait for the confirmation before pulling a drive.

## Partitions

Arcanum has a small partition editor, reached from the drive step when creating a vault. It works on the MBR layout: four partitions at most, and GPT drives are recognised but not written.

**What each partition is for is a question the editor asks**, and the answer is not cosmetic. Every partition carries a type byte:

| Purpose | Type | What Android does |
|---|---|---|
| Ordinary storage | `0x0c` (FAT32) | Mounts it, shows it in the file manager |
| A vault | `0x83` (Linux data) | Reads the entry, ignores it, says nothing |

A vault placed in a partition marked as FAT32 would be a partition Android believes it owns and cannot read — and the format prompt comes back. So when you pick an existing FAT partition to hold a vault, Arcanum re-marks it as Linux data at the moment the vault is created. Backing out before that leaves the partition exactly as it was.

**Deleting a partition removes its entry from the table, not its contents.** The data stays on the drive until something writes over it. That matters twice: a vault in a deleted partition is still physically there for anyone examining raw sectors, and a partition deleted by accident has not yet lost anything.

**Taking the whole drive destroys the partition table** and every partition with it. Arcanum names the number of partitions it is about to remove and asks first.

## Why a partition cannot be grown

There is no "extend this partition" action, and the reason is worth stating plainly.

Growing the *entry* in the partition table is four bytes. Growing what lives inside it is the actual work, and it is a different job for each case:

- A **FAT32 partition** would keep reporting its old size until the filesystem itself is grown, which means rewriting its allocation tables.
- A **partition holding a vault** is harder still. The volume's size is recorded in its header, and its backup header sits at the volume's end — so both would have to be rewritten and moved. Arcanum had an Expand Volume action once and withdrew it for exactly this reason: it grew the container without growing the filesystem, which helped nobody.

Only free space immediately after a partition could extend it in any case; a gap elsewhere on the drive would mean moving data.

The supported answer is to delete the partition and create a larger one. It hides no state and loses nothing that deleting would not have lost anyway.

## Recognising a drive again

A USB vault has no file path to remember it by, and a drive's device name changes between connections. Arcanum identifies a vault by a hash of its volume header's random salt, read from the start of whatever holds it.

This has a consequence worth knowing: **changing a vault's password changes how it is recognised.** VeraCrypt generates a fresh salt whenever it rewrites a header, so Arcanum re-reads the fingerprint as part of those operations. It is handled, but it is why an operation on a USB vault insists the drive stays connected until it finishes.

If a drive is plugged in but holds a different volume than the one you tapped, Arcanum says so rather than asking for a password it could never accept.

## Compatibility

A vault created on a drive here opens in desktop VeraCrypt, whole-device and in a partition alike. An ext4 vault mounts read-write on a Linux desktop with the standard tools. A drive partitioned by Arcanum is an ordinary MBR drive that any partitioning tool will recognise.

## Counterfeit drives

Arcanum does not detect drives that lie about their capacity, and neither does Android. A counterfeit drive reports a size its memory does not have; writes past the real end are discarded or fold back over what was written earlier, and nothing reports an error.

Detecting this reliably means filling the drive and reading it all back, which takes hours — it cannot be sampled, because a fake drive returns exactly what was just written to any single spot you check. If you are unsure about a drive, test it with a tool built for the job, such as [F3](https://fight-flash-fraud.readthedocs.io/) or h2testw, before trusting a vault to it.

What Arcanum does check is narrower and honest: after creating a vault it reads the volume's backup header back from the far end of the drive. A drive that accepted those writes and kept nothing fails that check, and the vault is not added.
