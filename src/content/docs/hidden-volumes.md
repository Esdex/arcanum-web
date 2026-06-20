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
14. **Hidden entropy** — another 500-point collection for the hidden volume's key.
15. **Creating hidden volume** — the hidden volume is written into the free space of the outer container.
16. **Done** — both volumes are complete. A warning card is shown reminding you of the overfill rule.

## Important warnings

**Do not overfill the outer volume.** The hidden volume occupies the free space at the end of the outer container. If you copy too many files into the outer volume, you will silently overwrite and destroy the hidden volume. VeraCrypt and Arcanum cannot protect you from this — there is no warning at mount time, by design (a warning would reveal the hidden volume exists).

A safe practice: keep the outer volume lightly filled and treat it as a buffer.

**Both passwords must be different.** The wizard enforces this with a visible warning, but it is also a logical requirement: if both passwords were the same, the outer volume would always be opened and the hidden one would be inaccessible.

**Do not lose either password.** There is no recovery mechanism for either the outer or the hidden volume.
