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
- You want to switch the key derivation hash (PBKDF2 PRF) to a different algorithm.

## How to change the password

The wizard runs in 4 steps. Find it in **Vault Config → Change Password** (the vault must be unmounted first).

1. **Current credentials** — enter your current password, plus any keyfiles and PIM that protect the vault right now.
2. **New credentials** — enter the new password and confirm it. You can also:
   - Add or remove keyfiles for the new password.
   - Set a new PIM.
   - Change the PBKDF2 PRF hash algorithm (SHA-512, SHA-256, Whirlpool, Streebog, BLAKE2s-256).
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
2. **New keyfiles** — add the new keyfiles, either existing files or a fresh one via **Generate new keyfile** (see [Keyfiles](/docs/keyfiles)). Disabling keyfiles entirely will prompt for confirmation.
3. **Entropy** — a fresh entropy collection canvas generates a new header salt.

## Important notes

- The vault must be **unmounted** before you can change the password.
- Only the header is re-encrypted. Your data is not moved or re-written.
- If you lose the new password, there is no recovery — make sure you store it securely before closing the wizard.
