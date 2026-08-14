---
title: "Keyfiles"
order: 6
section: "Concepts"
---

## Overview

A keyfile is a file you designate as a second thing needed to open a vault. With a keyfile attached, unlocking requires **both** the password and that exact file — knowing the password alone is not enough.

Arcanum's keyfiles are standard VeraCrypt keyfiles. A vault you protect with one here opens in desktop VeraCrypt with the same password and the same file, and the other way round.

> A keyfile is **its exact bytes**, not its name or location. Rename it, move it, copy it to another device — all fine. Change one byte inside it and the vault will not open again.

## Generating a keyfile

You no longer need to bring your own file. Arcanum can create one filled with cryptographically secure random data, from the same source it uses for encryption keys.

**The full generator** — tap the **+** button on the vault list and choose **Generate keyfile**. You get:

- **File name** — the base name to save under. Generating several appends `_1`, `_2`, and so on.
- **How many** — up to 10 files in one run.
- **Size** — 64 bytes to 1 MB, or switch on **Random size** to give each file a different one.
- **Randomness** — drag your finger across the canvas, the same step the vault creation wizard uses.

Then pick a folder and Arcanum writes the files there.

**While setting up credentials** — on the password step of vault creation, and on the new-keyfile step of Change Keyfiles, there is a **Generate new keyfile** button next to *Add keyfile*. It asks only for a folder, writes one 64-byte keyfile, and adds it to the list you are editing. No options, no extra steps.

Both produce equally strong keyfiles. The full generator exists for when you want several files or a specific size.

## How large should a keyfile be?

**64 bytes is enough.** Larger files are supported, but they do not make the vault harder to break.

Every byte of the keyfile — up to the first 1 MB, which is where VeraCrypt stops reading — is mixed into the password. But the mixing compresses everything into a small internal pool: 64 bytes, or 128 bytes if your password is longer than 64 bytes. That pool is the ceiling on what any keyfile can contribute, no matter how big the file is.

So a 64-byte file of true random data already saturates it. A 1 MB file is not stronger; it is just larger to store and back up.

## Using an existing file instead

Any file can serve as a keyfile — a photo, a document, a song. Three cautions:

- **It must never change.** Apps rewrite files more often than you would expect: a photo gets re-compressed, metadata is stripped on upload, a document is re-saved. Any of that destroys the keyfile. Prefer a generated file you keep untouched, or a copy of a file you are certain is frozen.
- **It should not be obvious.** A file that sits in the same folder as the vault, or is the only unusual file on the device, narrows an attacker's search considerably.
- **Only its first megabyte counts.** Nothing past that is read, here or in VeraCrypt, so two files that begin with the same megabyte are the same keyfile — an original and a shortened copy of it, for instance. It also means a large file whose opening is predictable, such as a format with a long fixed header, contributes far less than its size suggests.

## Keeping keyfiles safe

A keyfile carries the same consequence as a password: lose it and the vault is unrecoverable. There is no reset and no recovery.

- **Back it up**, in more than one place, the way you would back up a password.
- **Store it apart from the vault.** A keyfile sitting next to the container it unlocks adds very little — an attacker who has one has both.
- **Test it.** Open the vault with your backup copy at least once. An untested backup is a guess.

See [Using Arcanum Safely](/docs/using-arcanum-safely/) for how this fits with the rest of your setup.

## Keyfiles and biometric unlock

Turning on biometric unlock for a vault that uses keyfiles saves **where those keyfiles are**, never a copy of them — Arcanum does not keep your keyfile anywhere. Each unlock reads the files again from the locations you picked.

This is the one place where a keyfile's location matters as well as its bytes. If a file is no longer where it was, or the storage holding it is not available at that moment — a removed memory card, an unplugged USB drive, a cloud folder that is offline — Arcanum reports that the keyfiles are not accessible and asks you to unlock manually and select them again. A keyfile kept in a cloud folder also has to be downloaded before each unlock, so the vault opens only as quickly as that provider hands the file over.

Nothing is lost when this happens: the password and the keyfile open the vault as they always did. Arcanum switches the fingerprint shortcut off for that vault at the same time, so to get it back, unlock manually with the keyfiles selected and the biometric switch turned on — the new locations are saved with that unlock.

## Adding, changing, or removing keyfiles later

Keyfiles are not fixed at creation. Use **Vault Config → Change Keyfiles** to attach a keyfile to a vault that has none, swap in a different one, or remove keyfiles entirely. See [Changing Password or Keyfiles](/docs/change-password/).

Changing keyfiles rewrites the vault's header with the new credentials. The vault's contents are untouched — only what unlocks it changes.

## Very long passwords

If your password is longer than 64 **bytes**, note that length is counted in bytes rather than characters: a password written in a non-Latin alphabet reaches 64 bytes at roughly 33 characters, since those characters take two or more bytes each.

Arcanum switches its internal pool from 64 to 128 bytes past that point, exactly as VeraCrypt does. Versions of Arcanum before this one did not, so a vault created there with a keyfile and a password that long could not be opened in desktop VeraCrypt. Such vaults still open in Arcanum — it detects the old format and adjusts — and changing the password, or backing up and restoring the vault, rewrites it in the correct format.
