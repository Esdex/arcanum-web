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

PIM (Personal Iterations Multiplier) adjusts the number of PBKDF2 iterations used to derive your key from your password. Leaving PIM empty uses VeraCrypt's default of 500,000 iterations. Setting a PIM changes the count to 15,000 + (PIM × 1000) — so a PIM of 485 matches the default, a higher value (for example 700 → 715,000 iterations) strengthens key derivation at the cost of slower unlock, and a lower value weakens it. Because a PIM below 485 falls under the default, the wizard then requires a password of at least 20 characters.

For most users, leaving PIM empty is the right choice. Whatever you pick, a strong password matters far more than the PIM. For guidance while creating a vault, see [Choosing a PIM](/docs/getting-started).

## What is a keyfile?

A keyfile is any file you designate as an additional authentication factor. To open a container protected by a keyfile, you need both the password and the exact keyfile. Arcanum can generate one for you, filled with cryptographically secure random data, or you can point it at an existing file such as a photo or a document — though a file some app might rewrite is a poor choice, since one changed byte makes it useless. Keep the keyfile safe — losing it is equivalent to losing your password. See [Keyfiles](/docs/keyfiles) for generating, sizing, and storing them.

## Why does the app look like a calculator?

This is the calculator disguise feature. See [Calculator Disguise](/docs/disguise) for how it works and how to access the vault interface.

## Can I shrink a vault?

No. Shrinking a container is fundamentally impossible without first mounting it, and neither Arcanum nor desktop VeraCrypt supports it.

The reason is how VeraCrypt encryption works: the entire container — including filesystem metadata — is encrypted as a flat array of bytes. From the outside, Arcanum cannot tell which sectors are occupied by real files and which are free space. It only sees ciphertext.

Growing a container avoids this problem, which is why desktop VeraCrypt offers it: new space is appended to the end of the file and existing data stays at exactly the same byte offsets, so nothing has to move. Arcanum does not offer it, because the filesystem inside the container would stay its original size and the added space would be unusable — see [Running Out of Space](/docs/expand-volume).

Shrinking is a different matter entirely. To do it safely you would need to:

1. Decrypt the container and mount the filesystem.
2. Read the filesystem structure to determine where real data ends.
3. Relocate the filesystem so it fits within the smaller boundary.
4. Truncate the container file.

This is equivalent to running `resize2fs` — and it requires a separate implementation for every supported filesystem (FAT32, exFAT, and any future additions). Desktop VeraCrypt does not support this either.

**Practical alternative:** create a new, smaller vault and move your files into it.

## Does Arcanum work on Android 10 and later?

Arcanum requires Android 10 (API 29) or later.
