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

Your Arcanum PIN is stored as a SHA-256 hash in Android's `EncryptedSharedPreferences` (AES-256-GCM, Keystore-backed). The raw PIN is never written to disk.

## Biometric unlock

When you enable biometric unlock for a vault, Arcanum generates an AES key in the Android Hardware Security Module (Keystore) with `setUserAuthenticationRequired(true)`. Your vault password is encrypted with this key and stored in `EncryptedSharedPreferences`. The encrypted blob is useless without a successful biometric authentication — Android won't release the key otherwise.

The key is also configured with `setInvalidatedByBiometricEnrollment(true)`, which means adding a new fingerprint or face to the device immediately invalidates the key and revokes biometric access to that vault.

## Screenshot protection

Arcanum sets `FLAG_SECURE` on its window. This prevents the OS, system screenshots, and third-party screen-recording apps from capturing the app's contents. The app appears blank in the system recents screen.

## Open source

The complete source code is available on [GitHub](https://github.com/Esdex/Arcanum). We encourage security researchers to audit the implementation directly rather than taking this page at face value.
