---
title: "Expanding a Vault"
order: 3
section: "Vault Management"
---

## What it does

Expand Volume increases the size of an existing encrypted container file. The vault grows in place — no data is moved, no files are re-encrypted, and the vault stays fully usable throughout the process.

## When to use it

Use Expand Volume when a vault is running low on free space and you want to give it more room without creating a new vault and migrating your files manually.

## How to expand

1. Go to the vault list and tap the vault you want to expand.
2. Open **Vault Config** and tap **Expand Volume**.
3. Enter your current password (and keyfiles / PIM if applicable).
4. Enter the new size. The new size must be larger than the current size.
5. Tap **Expand** — Arcanum runs the operation as a background foreground service. You can leave the screen and return; the process will continue.

## Constraints

- The new size must exceed the current size by at least **64 KB**.
- The new size must be a multiple of **512 bytes** (the wizard handles this automatically).
- You must have enough free space on the device for the size difference.
- **You cannot expand a vault that contains a hidden volume.** Expanding would extend into the area that proves the hidden volume's non-existence, which would compromise plausible deniability.

## How new space is filled

The added space is filled with AES-XTS encrypted zeros using a **temporary random key** generated for that operation only. The result is indistinguishable from real ciphertext — an observer cannot tell which part of the container is old data and which is newly added free space. This preserves plausible deniability even after expansion.
