---
title: "Panic Mode"
order: 3
section: "Concepts"
---

## What panic mode does

Panic mode lets you set a second PIN — a "duress PIN" — that, when entered on the calculator, opens Arcanum normally but silently triggers a data wipe in the background. From the outside the app looks like it unlocked successfully. The wipe runs as a durable background job and completes even if the app is closed or the process is killed.

When the panic PIN is entered, it immediately replaces your real PIN on disk before the app even navigates away from the calculator screen. This means your real PIN is invalidated the instant you enter the panic PIN — there is no window where both PINs are valid simultaneously.

## Setting up a panic PIN

Go to **Settings → Panic Mode** and enable it. You will be prompted to set a panic PIN. The panic PIN must be different from your normal PIN — the system enforces this.

## Configuring what gets wiped

Once panic mode is enabled, you can choose between two modes and configure the details:

### Full wipe

Deletes every vault file Arcanum knows about, removes all vault records from the database, clears the calculator history, and revokes biometric access for all vaults.

### Selective wipe

Gives you granular control over what happens:

| Toggle | Default | Effect |
|---|---|---|
| Clear settings | On | Wipes Arcanum's app settings |
| Clear calculator history | On | Deletes the calculator's calculation history |
| Disable biometric | On | Revokes biometric keys for all vaults |

In addition, you can set a **per-vault action** for each vault you have registered:

- **Delete** — permanently deletes the vault file from storage and removes the record from the database.
- **Forget** — removes the vault record from Arcanum's database but leaves the actual file on disk. Useful if the vault is stored on external storage you want to keep.
- **Keep** — does nothing to this vault. It will still appear in Arcanum after the panic wipe runs.

## A note on "secure delete"

When Arcanum deletes a vault file during a panic wipe, it performs a simple file deletion rather than a multi-pass overwrite. This is intentional: VeraCrypt containers are fully AES-256 encrypted, so the raw bytes on disk are worthless without the container password. Multi-pass overwriting is also ineffective on modern eMMC and UFS flash storage because wear-leveling redirects writes to different physical cells, making overwrite-based erasure unreliable.

## Timing and deniability

Both the normal PIN path and the panic PIN path have identical timing before navigation. The app performs the same operations (a DataStore read and a cryptographic commit) on both paths, so an observer watching the screen cannot distinguish between them based on how long the unlock takes.
