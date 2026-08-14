---
title: "Using Arcanum Safely"
order: 7
section: "Using Arcanum Safely"
---

Strong encryption only protects you if it is used well. Arcanum ports VeraCrypt's audited cryptography unchanged (see [How We Protect Your Data](/docs/security/)), but the crypto is only one link in the chain — how you choose passwords, store keyfiles, keep backups, and lock the app matters just as much.

> **What counts as "safe" depends on your threat model** — who you are protecting against and what they can realistically do. A curious roommate, a lost phone, a border search, and a targeted adversary are very different problems. Treat everything below as sensible defaults to adapt, not absolute rules.

## Passwords and keyfiles

- Use a long passphrase, not a short password. Length beats complexity; a memorable multi-word phrase is both stronger and easier to recall.
- Consider a **PIM** for extra key-derivation iterations, but remember it is part of your credentials: forgetting it locks you out exactly like forgetting the password.
- If you use a **keyfile**, store it *separately* from the container — ideally on a different device or medium. A keyfile sitting next to the vault it unlocks adds little.
- A keyfile (including one you generate) is just its exact bytes. If those bytes change or the file is lost, the vault is unrecoverable. Back keyfiles up like passwords.

## Back up everything that unlocks the vault

There is no recovery option, no reset, and no "forgot password" flow. If you lose your credentials or the container is damaged, the data is gone permanently.

- Keep an **offline backup** of the container file itself.
- Back up the **volume header** separately — a corrupted header can lock you out even when the data is intact. See [Backing Up and Restoring the Volume Header](/docs/backup-header/).
- Back up any **keyfiles**.
- Actually test a backup by opening it. An untested backup is a guess.

## Hidden volumes and plausible deniability

A [hidden volume](/docs/hidden-volumes/) lets you reveal a decoy password while a second, hidden vault stays undetectable inside the same file. It is a strong feature, but be clear-eyed about its limits:

- It does **not** defeat every adversary. In jurisdictions with key-disclosure laws, or under real coercion, deniability may not help you, and confidently claiming "there is nothing else here" can backfire.
- Traces can live **outside** the container: OS thumbnail caches, "recent files" lists, another app that opened an exported file, or a cloud/device backup. Deniability inside the vault does not erase those.
- When you write to the **outer** volume, enable hidden-volume protection so you do not overwrite the hidden one.
- Keep the outer (decoy) volume plausibly used — an empty decoy is not convincing.

## Panic mode

[Panic Mode](/docs/panic-mode/) can wipe vaults when a panic PIN is entered. Use it, but understand what it is:

- Configure exactly what it deletes, and confirm it with the built-in **dry run** before you rely on it.
- It is a last resort, not a guarantee. It cannot help if the device is seized while a vault is already mounted, or if copies exist elsewhere.

## The disguise and your PIN

- Arcanum presents as a calculator; choose a PIN that is not an obvious one (see [Calculator Disguise](/docs/disguise/)).
- A wrong PIN and a locked-out PIN look identical by design — no error is shown either way.
- The disguise hides the *app*, not the container files on disk. Someone browsing your storage can still see a vault file exists; that is what hidden volumes address.

## Lock quickly, and keep it locked

- Turn on **auto-lock**, and enable **unmount on lock** if you want mounted vaults closed when the app leaves the foreground or goes idle.
- Screenshots and screen recording are blocked at the OS level while Arcanum is open, so a background recorder cannot capture your files.
- Do not leave a vault mounted longer than you need it. A mounted vault is decrypted and accessible.

## Where you keep the container

- You control the file. A copy on local/internal storage that only you manage is the simplest to reason about.
- Network and SMB shares can be read-only from Android's side and widen your exposure; prefer a local copy when confidentiality matters.
- Storing the container outside the app means uninstalling Arcanum does **not** remove it — delete it deliberately if that is your intent.

## External app access and sharing into a vault

Both are **off by default**. While external app access is on for a mounted vault, other apps can read and modify its files through the system file picker. Enable it only when you need it, per vault, and unmount when you are done.

## Biometric unlock: convenience vs. control

- Biometric unlock is bound to a hardware-backed Keystore key and cannot be satisfied without a genuine match (see [How We Protect Your Data](/docs/security/)). It is convenient and, technically, not a weak point.
- The trade-off is situational, not cryptographic: a fingerprint can be easier to compel than a memorized passphrase in some circumstances. Decide based on your threat model.
- Enrolling a new fingerprint or face on the device invalidates the key; you will simply re-register on the next unlock.

## Keep Arcanum updated

- Update promptly — releases include security fixes.
- On F-Droid, builds are reproducible: you can verify the published APK was built from the public source, with nothing added.

## Quick checklist

- Long passphrase; keyfiles stored and backed up separately.
- Offline backup of the container **and** its header; tested.
- Understand what hidden volumes and panic mode do and do **not** protect against.
- Auto-lock on; unmount when finished.
- Keep the container where you control it; keep the app updated.
