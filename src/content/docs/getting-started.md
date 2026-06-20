---
title: "Quick Start"
order: 1
section: "Getting Started"
---

## What is Arcanum?

Arcanum is an encrypted vault manager for Android that creates and opens standard VeraCrypt containers. Your files are stored inside encrypted containers using the same audited cryptographic code that powers VeraCrypt on Windows, macOS, and Linux. Any vault you create in Arcanum can be opened directly in desktop VeraCrypt, and vice versa — there is no proprietary format.

## Opening the app

Arcanum presents itself as a plain calculator on your home screen and in the app drawer. To open the vault interface, type your PIN on the calculator then **long-press the `=` key for 2 seconds**. The app will unlock and navigate to your vault list.

If you haven't set a PIN yet, the first launch will take you directly to setup.

## Creating your first vault

Tap the **+** button on the vault list screen to start the creation wizard. The wizard walks you through 10 steps for a standard vault:

1. **Volume type** — choose Standard Volume (or Hidden Volume if you need plausible deniability; see [Hidden Volumes](/docs/hidden-volumes)).
2. **Location** — store the vault inside Arcanum's private storage (no extra permissions needed), or pick a folder anywhere on your device (requires "All Files Access" on Android 11+). Enter a filename — the default is `vault.hc`, but any extension works.
3. **Encryption algorithm** — AES is the default and the fastest on modern hardware. All options are VeraCrypt-compatible. You also select a hash algorithm here (SHA-512 is the default).
4. **Volume size** — choose a preset (256 MB → 10 GB) or enter a custom size in MB or GB.
5. **Password** — type and confirm your password. Optionally attach keyfiles or enter a custom PIM for extra security. **There is no password recovery — if you lose your password, your data is unrecoverable.**
6. **Format mode** — Quick Format is faster; Secure Format overwrites the entire container with random data first (slower but leaves no trace of previous content).
7. **Filesystem** — FAT is recommended for most users and works on all operating systems. Choose exFAT only if you need to store individual files larger than 4 GB. See [Choosing a Filesystem](/docs/filesystems).
8. **Entropy** — drag your finger around the canvas to collect randomness for key generation. 500 unique touch points are required.
9. **Creating** — Arcanum formats the container. A progress indicator shows speed and time remaining.
10. **Done** — your vault is created. Tap "Open vault" to mount it immediately.

## Basic navigation

Once a vault is mounted, Arcanum gives you a full file manager and media viewer inside the encrypted container. Files are decrypted on the fly — they never exist unencrypted on your device's storage.

Tap the lock icon or navigate back to the vault list to unmount. If Auto-Lock is enabled in Settings, Arcanum will automatically lock when the app goes to the background.
