---
title: "Hidden Volumes"
order: 2
section: "Concepts"
---

## What is a hidden volume?

A hidden volume is a second, secret encrypted volume nested inside a standard VeraCrypt container. The outer volume looks completely normal and contains its own files and its own password. The hidden volume lives in the free space of the outer volume, invisible and undetectable without its own separate password.

The critical property: both passwords are cryptographically valid. If you enter the outer password, you get the outer volume. If you enter the hidden password, you get the hidden volume. There is no way for an observer — or a forensic tool — to prove a hidden volume exists at all.

## When to use it

Hidden volumes are designed for **plausible deniability** under coercion. If someone forces you to reveal your password, you give them the outer password. The outer volume can contain plausible but non-sensitive files. Your actual sensitive data stays in the hidden volume, which remains cryptographically invisible.

This is a genuine security property, not security theater — it's the same mechanism used in desktop VeraCrypt.

## How to create a hidden volume

Select **Hidden Volume** on the first step of the creation wizard. The wizard runs 16 steps total: the first 9 create the outer volume, then the wizard guides you through creating the hidden volume inside it.

**Outer volume (steps 1–9):**

1. **Volume type** — select Hidden Volume. The wizard now runs 16 steps.
2. **Location + filename** — same as a standard vault.
3. **Outer encryption algorithm** — choose cipher and hash for the outer volume.
4. **Outer volume size** — total size of the container file. The hidden volume must fit inside this.
5. **Outer password** — this is the "decoy" password you can reveal safely. You will see a reminder that this must differ from the hidden password.
6. **Format mode** — Quick or Secure format for the outer volume.
7. **Filesystem** — filesystem for the outer volume.
8. **Entropy** — collect 500 randomness points for the outer volume.
9. **Creating** — outer volume is written to disk.

**Hidden volume (steps 10–16):**

10. **Hidden volume info** — an info screen summarises what was just created and explains the next phase. It also shows a warning about the overfill risk (see below).
11. **Hidden algorithm** — choose a separate cipher and hash for the hidden volume. These can differ from the outer volume's settings.
12. **Hidden volume size** — must be between 4 MB and (outer size − 4 MB). The wizard validates this and shows an error if the value is out of range.
13. **Hidden password** — must be **different** from the outer volume password. The wizard shows a warning reminding you of this. Optionally enter a separate PIM for the hidden volume.
14. **Hidden keyfile** — optionally add one or more keyfiles for the hidden volume (separate from any outer keyfiles).
15. **Hidden entropy** — another 500-point collection for the hidden volume's key.
16. **Creating hidden volume** — the hidden volume is written into the free space of the outer container.
17. **Done** — both volumes are complete. A warning card is shown reminding you of the overfill rule.

## Hidden volumes on a USB drive

A hidden volume can go inside a vault on a USB drive as well as inside a file, which is what desktop VeraCrypt allows too — *"a hidden volume can be created within any type of VeraCrypt volume, i.e., within a file-hosted volume or partition/device-hosted volume"*. Pick **Hidden Volume** on the first step and a USB drive as the location, and the wizard runs the same 16 steps.

One difference is worth knowing: a vault on a drive has no size to choose, because it fills whatever you gave it — the whole drive, or the partition you selected. The size step shows you that number rather than asking for one, and the hidden volume's size is then chosen inside it as usual. If you want the vault to take only part of the drive, make a partition for it on the location step; the rest of the drive stays ordinary storage.

Protection works there exactly as it does for a file: unlock the outer volume with the hidden volume's password given, and writes that would reach the hidden volume are refused.

## Protecting the hidden volume while you write to the outer one

The hidden volume lives in the free space at the end of the outer container, and the outer volume's filesystem has no idea it is there. Writing enough files into the outer volume will overwrite it.

To prevent that, open the unlock screen's options, turn on **Protect hidden volume**, and enter the hidden volume's password — along with its PIM, its keyfiles and its hash, if they differ. Arcanum then finds where the hidden volume starts and refuses any write to the outer volume that would reach it.

**Protection either holds or the vault does not open.** If the hidden volume cannot be opened with what you entered, the unlock fails and says so, rather than opening the outer volume without protection — a mount that could not find the hidden volume is exactly the mount that would destroy it. Two things cause that failure: the hidden password, PIM or keyfiles are wrong, or the hidden volume uses Argon2id, which is never searched for automatically (see [Argon2id](/docs/argon2/)). Choose it under the hidden password, or accept the offer that a failed unlock makes.

Worth knowing:

- **A fingerprint cannot protect a hidden volume.** The hidden volume's password is not saved anywhere — not with your fingerprint credentials, not beside the vault. A vault whose last unlock used protection asks for the password instead of unlocking on a fingerprint.
- **Protection is per unlock, not a property of the vault.** You enter the hidden password each time you intend to write to the outer volume.
- **Read-only and protection are alternatives.** A read-only mount writes nothing at all, so protection is switched off alongside it.
- **The outer volume looks smaller than it is.** The space the hidden volume occupies is out of reach, so the outer volume reports itself full early. That is the protection working.

Desktop VeraCrypt has the same feature, with the same options (`--protect-hidden`, `--protection-password`, `--protection-pim`, `--protection-hash`).

## Important warnings

**Writing to an unprotected outer volume destroys the hidden one.** With protection off there is no warning at mount time and none while you write — by design, since a warning would reveal that the hidden volume exists. Either unlock with protection whenever you intend to write to the outer volume, or treat the outer volume as read-only.

A safe practice: keep the outer volume lightly filled and treat it as a buffer.

**Both passwords must be different.** The wizard enforces this with a visible warning, but it is also a logical requirement: if both passwords were the same, the outer volume would always be opened and the hidden one would be inaccessible.

**Do not lose either password.** There is no recovery mechanism for either the outer or the hidden volume.
