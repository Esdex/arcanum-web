---
title: "Frequently Asked Questions"
order: 7
section: "FAQ"
---

## Is Arcanum part of the VeraCrypt project?

No. Arcanum is an independent project and is not affiliated with or endorsed by the VeraCrypt team. We use VeraCrypt's open-source cryptographic library to ensure full container compatibility, but Arcanum is developed and maintained separately.

## Is Arcanum compatible with desktop VeraCrypt?

Yes, completely. Arcanum containers are standard VeraCrypt containers. A vault created in Arcanum can be opened in VeraCrypt on Windows, macOS, or Linux, and a container created in desktop VeraCrypt can be opened in Arcanum. There is no proprietary format or metadata — the container header follows the VeraCrypt specification exactly.

## What encryption algorithms are supported?

Arcanum supports all five VeraCrypt single ciphers — AES, Serpent, Twofish, Camellia, and Kuznyechik — plus ten cascade combinations (two or three ciphers in sequence). For hash/key derivation: SHA-512, SHA-256, Whirlpool, Streebog, and BLAKE2s-256.

See [How We Protect Your Data](/docs/security) for the full list.

## What happens if I forget my password?

Nothing can recover it. This is a fundamental property of the encryption, not a limitation of Arcanum. The container's key material is derived from your password using thousands of PBKDF2 iterations and is never stored anywhere. Without the correct password (and keyfile, if you added one), the container is indistinguishable from random data.

There is no "forgot password" option and no backdoor. Keep a secure backup of your password.

## Is the Pro version more secure than the free version?

No. All security features are identical across both versions. The Pro upgrade (available in the Play Store version) unlocks convenience features only — such as the ability to create more containers. The F-Droid version is fully free and has all features unlocked with no limitations.

## Can I use Arcanum without the Play Store?

Yes. Arcanum is available on F-Droid. The F-Droid version has no Play Billing, no tracking, and all features enabled for free. It is the recommended version for privacy-conscious users.

## What is a PIM and should I use it?

PIM (Personal Iterations Multiplier) adjusts the number of PBKDF2 iterations used to derive your key from your password. The default (leaving PIM empty) uses VeraCrypt's standard iteration count, which is well within the secure range. A custom PIM above the default strengthens key derivation further at the cost of slower unlock times. A PIM below the default weakens it — the wizard warns you if you enter a value that is lower than VeraCrypt's standard.

For most users, leaving PIM empty is the right choice.

## What is a keyfile?

A keyfile is any file you designate as an additional authentication factor. To open a container protected by a keyfile, you need both the password and the exact keyfile. This can be a photo, a document, or any other file. Keep the keyfile safe — losing it is equivalent to losing your password.

## Why does the app look like a calculator?

This is the calculator disguise feature. See [Calculator Disguise](/docs/disguise) for how it works and how to access the vault interface.

## Does Arcanum work on Android 10 and later?

Arcanum requires Android 10 (API 29) or later.
