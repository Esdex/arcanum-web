---
title: "Changing Password or Keyfiles"
order: 4
section: "Vault Management"
---

## What it does

The Change Password wizard re-encrypts your vault's **header** — the small section of the container that stores your encryption keys and algorithm settings. Your actual encrypted data is never touched or re-written: the operation takes seconds regardless of vault size.

## When to use it

- You want to use a stronger password.
- You believe your current password may have been compromised.
- You want to add, remove, or rotate keyfiles.
- You want to switch the key derivation to a different algorithm — including to or from [Argon2id](/docs/argon2/), which is also how a vault that is too expensive to open on a phone can be made cheaper.

## How to change the password

The wizard runs in 4 steps. Find it in **Vault Config → Change Password** (the vault must be unmounted first).

1. **Current credentials** — enter your current password, plus any keyfiles and PIM that protect the vault right now. Leave **Current hash** on Auto unless the vault uses [Argon2id](/docs/argon2/): Auto tries the five PBKDF2 hashes and never that one, exactly as unlocking does, so a vault made with Argon2id has to name it here.
2. **New credentials** — enter the new password and confirm it. You can also:
   - Add or remove keyfiles for the new password.
   - Set a new PIM.
   - Change the key derivation (SHA-512, SHA-256, Whirlpool, Streebog, BLAKE2s-256, or [Argon2id](/docs/argon2/)).
3. **Header wipe mode** — choose how many times the old header is overwritten before the new one is written:

   | Mode | Passes | Notes |
   |---|---|---|
   | Fast | 1 | Random data; sufficient for most users |
   | US DoD 5220.22-M | 3 | Recommended |
   | US DoD (extended) | 7 | Stronger overwrite |
   | Gutmann | 35 | Paranoia-level |
   | Maximum | 256 | Slowest; not meaningfully more secure on modern flash |

4. **Done** — the vault header is re-encrypted with your new credentials.

## Changing keyfiles only

If you only want to change keyfiles (not the password), use **Vault Config → Change Keyfiles**. This is a shorter 3-step wizard:

1. **Current credentials** — current password and any existing keyfiles.
2. **New keyfiles** — add the new keyfiles, either existing files or a fresh one via **Generate new keyfile** (see [Keyfiles](/docs/keyfiles/)). Disabling keyfiles entirely will prompt for confirmation.
3. **Entropy** — a fresh entropy collection canvas generates a new header salt.

## Changing a hidden volume's password

Enter the **hidden** volume's password on the first step and the wizard changes that volume, leaving the outer volume's password and headers alone — the same rule the unlock screen follows, where the password decides which of the two volumes you get. The same goes for the Change Keyfiles wizard.

Two things are worth knowing:

- If the hidden volume uses a different hash from the outer volume, set **Current hash** to the hidden volume's.
- Both of that volume's headers are rewritten, the working one and its backup, so the old password stops working everywhere rather than surviving in the backup.

## Important notes

- The vault must be **unmounted** before you can change the password.
- Only the header is re-encrypted. Your data is not moved or re-written.
- If you lose the new password, there is no recovery — make sure you store it securely before closing the wizard.
