---
title: "Running Out of Space"
order: 3
section: "Vault Management"
---

## Arcanum no longer expands vaults

Earlier versions had an **Expand Volume** action. It has been removed, because on Android it could not deliver what its name promised.

Expanding grew the encrypted container, but not the filesystem inside it. A vault expanded from 1 GB to 4 GB still held a 1 GB filesystem, so it accepted not one extra file — while the app cheerfully reported gigabytes of free space that no write could ever reach.

This is not an Android shortcoming. Desktop VeraCrypt has the same limit and warns about it before expanding: *"Only the VeraCrypt volume itself will be expanded, but not the file system."* On Windows it can finish the job for NTFS by asking the operating system to extend the filesystem, but it never does this for FAT or exFAT — the only two formats Arcanum uses. Android offers no equivalent call, and growing a FAT or exFAT filesystem by hand means moving the whole data region, since the allocation tables sit in front of it and have to grow first.

Rather than keep a button that quietly did nothing useful, it is gone. Here is what to do instead.

## Option 1: Create a larger vault and move your files

This is the straightforward path, and it works entirely on the phone.

1. Create a new vault at the size you actually want.
2. Mount both the old and the new vault.
3. Copy your files across in the **Files** tab, using Copy in the old vault and Paste in the new one.
4. Once you have confirmed everything arrived, delete the old vault.

Your files are never written to disk unencrypted during the move — they travel from one mounted vault to the other in memory.

Keep the old vault until you have checked the new one. Deleting it is the only irreversible step.

## Option 2: Expand on a desktop

If you would rather keep the same container file, master key and header backups, you can do the whole operation on a computer:

1. Copy the container file to a desktop machine.
2. Expand the volume with **VeraCrypt Expander**, accepting its FAT/exFAT warning.
3. Mount the expanded volume in VeraCrypt.
4. Extend the filesystem into the new space with a partition tool that can resize FAT or exFAT.
5. Copy the container file back to your device.

Step 4 is the one Arcanum cannot do for you, and the reason the in-app action was withdrawn.

## Why the vault filled up in the first place

Two different problems produce the same "not enough space" feeling, and they have different answers:

- **The volume is genuinely full.** The Storage screen shows how much room is left. Free some space, or move to a larger vault.
- **The folder cannot hold another entry.** On a FAT-formatted vault the top level has a fixed number of directory entries, and long filenames consume several each — so it can fill up after a hundred or so files while the vault itself is nearly empty. Import into a subfolder instead; subfolders have no such limit. Vaults created by current versions of Arcanum are formatted so this does not happen.

Arcanum tells you which of the two you have hit.
