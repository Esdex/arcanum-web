---
title: "Backing Up and Restoring the Volume Header"
order: 5
section: "Vault Management"
---

## What is the volume header?

The volume header is the first few kilobytes of every VeraCrypt container. It stores — in encrypted form — the master key, the cipher and hash settings, and other metadata required to mount the vault. Without a valid header, the vault cannot be opened, even if the rest of the container is intact.

Every container also has an **embedded backup header** stored at the end of the file. This built-in backup is used automatically when Arcanum detects that the primary header is damaged.

## When to back up the header

- **Before changing your password.** The password change operation overwrites the header. If something goes wrong mid-write (power loss, storage error), having an external backup lets you restore it.
- **Before making changes to a vault you consider irreplaceable.** The backup takes seconds and costs nothing.
- **Whenever you store the vault on a drive that might fail.**

## How to back up

Find it in **Vault Config → Backup Header**. The vault can be mounted or unmounted.

1. Enter your current password (and keyfiles / PIM if applicable) — Arcanum needs to verify you own the vault before exporting the header.
2. Choose a destination file via the file picker.
3. Arcanum writes the header backup to the chosen file.

Store the backup file separately from the vault — on a different device, a password manager's notes field, or a printed secure location. A header backup stored in the same place as the vault offers limited extra protection.

## How to restore

Find it in **Vault Config → Restore Header**. The vault must be unmounted.

1. Choose the source:
   - **Embedded backup** — uses the backup copy already inside the container file. Use this if the primary header was partially overwritten but the rest of the file is intact.
   - **External backup file** — pick the backup file you exported previously.
2. Enter the password that was correct at the time the backup was made.
3. Arcanum overwrites the primary header with the backup copy.

> **Note:** if you restore a header from before a password change, the old password is restored too. The vault will only open with the password that was active when the backup was taken.

## Desktop VeraCrypt compatibility

Header backups created in Arcanum are standard VeraCrypt header backup files. They can be restored using **VeraCrypt → Tools → Restore Volume Header** on Windows, macOS, or Linux. Likewise, headers backed up with desktop VeraCrypt can be restored in Arcanum.
