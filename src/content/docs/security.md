---
title: "How We Protect Your Data"
order: 6
section: "Security"
---

## Cryptographic foundation

Arcanum's encryption layer is a direct port of VeraCrypt's audited C cryptographic sources, compiled via the Android NDK. No custom crypto. The same code that powers VeraCrypt on desktop runs inside Arcanum on Android.

All containers use XTS mode with 512-bit keys (two 256-bit keys). Every container created in Arcanum is a standard VeraCrypt container — you can open it in desktop VeraCrypt on Windows, macOS, or Linux.

## Supported encryption algorithms

**Single ciphers:**

| Cipher | Speed | Notes |
|---|---|---|
| AES-256-XTS | Fast | Hardware-accelerated on ARMv8; default choice |
| Serpent-256-XTS | Medium | Conservative security margin, finalist cipher |
| Twofish-256-XTS | Medium | Flexible key schedule; AES finalist |
| Camellia-256-XTS | Medium | ISO/IEC 18033-3 certified |
| Kuznyechik-256-XTS | Medium | Russian GOST R 34.12-2015 standard |

**Cascade ciphers** (two or three ciphers in sequence, each encrypting the output of the previous):

AES-Twofish · AES-Twofish-Serpent · Serpent-AES · Serpent-Twofish-AES · Twofish-Serpent · Camellia-Kuznyechik · Camellia-Serpent · Kuznyechik-AES · Kuznyechik-Serpent-Camellia · Kuznyechik-Twofish

Cascades provide defense-in-depth: an attacker would need to break all ciphers in the chain. The trade-off is significantly slower performance.

## Supported hash algorithms (PBKDF2)

The hash algorithm is used for key derivation (PBKDF2) — it determines how your password is stretched into the encryption key.

- **SHA-512** (default)
- **SHA-256**
- **Whirlpool**
- **Streebog** (GOST R 34.11-2012)
- **BLAKE2s-256**

## No network access

Arcanum has no internet permission. It cannot transmit data, phone home, or communicate with any server. All cryptographic operations happen entirely on your device.

## How the PIN is stored

Your Arcanum PIN (4–12 digits) is hashed with **Argon2id** (t=2 iterations, m=64 MB memory, p=1 parallelism, 32-byte output, 32-byte random salt) and stored inside Android's `EncryptedSharedPreferences` (AES-256-GCM, Keystore-backed). The raw PIN is never written to disk. Older installations that used SHA-256 are automatically migrated to Argon2id on the first successful login.

## Failed attempt lockout

After too many wrong PINs, Arcanum enforces a timed lockout:

| Wrong attempts | Lockout duration |
|---|---|
| 1–4 | None |
| 5–7 | 30 seconds |
| 8–11 | 5 minutes |
| 12–14 | 30 minutes |
| 15 or more | 2 hours |

The lockout is always enforced, but whether it is shown depends on the disguise:

- **Disguise off** (PIN entry screen): the remaining time is displayed ("Locked Xs").
- **Disguise on** (calculator): the lockout is never shown — a locked vault behaves exactly like a wrong PIN, so an observer cannot distinguish the two. See [Calculator Disguise](/docs/disguise) for the trade-off this implies.

## Biometric unlock

When you enable biometric unlock for a vault, Arcanum generates an AES key in the Android Hardware Security Module (Keystore) with `setUserAuthenticationRequired(true)`. Your vault password is encrypted with this key and stored in `EncryptedSharedPreferences`. The encrypted blob is useless without a successful biometric authentication — Android won't release the key otherwise.

The key is also configured with `setInvalidatedByBiometricEnrollment(true)`, which means adding a new fingerprint or face to the device immediately invalidates the key and revokes biometric access to that vault.

**Per-vault unlock and app entry.** Both the per-vault unlock above and the optional biometric prompt shown when *opening the app* are bound to a Keystore operation, so neither can be spoofed — Android will not release the key without a genuine biometric match. App entry uses its own dedicated Keystore key, separate from the per-vault keys, and unwraps a small unlock token on success; that cryptographic step is what the biometric gates, so a success signal alone cannot satisfy it, even on a rooted or instrumented device. The same `setUserAuthenticationRequired(true)` and `setInvalidatedByBiometricEnrollment(true)` guarantees apply. Regardless, the app-entry prompt only ever protects the vault list — each vault still requires its own password or the Keystore-bound biometric to mount, so vault contents stay encrypted independently.

## Encrypted database

Arcanum's internal database (vault records, gallery index, calculator history) is encrypted with **SQLCipher** — an open-source SQLite extension that encrypts the database file at rest using AES-256. The database key is derived from the Keystore-backed key, so the database is unreadable without the device's hardware security module.

## Screenshot protection

Arcanum sets `FLAG_SECURE` on its window. This prevents the OS, system screenshots, and third-party screen-recording apps from capturing the app's contents. The app appears blank in the system recents screen.

Disabling this protection requires biometric or PIN authentication, and a 5-second countdown before the confirm button becomes active. The warning reads: *"Without screen protection, any app with the 'appear on top' permission — or a screen recorder — can capture what's shown in Arcanum, including passwords and private files."*

## Open source

The complete source code is available on [GitHub](https://github.com/Esdex/Arcanum). We encourage security researchers to audit the implementation directly rather than taking this page at face value.
