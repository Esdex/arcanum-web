---
title: "Backing Up Your Settings"
order: 7
section: "Vault Management"
---

## Overview

**Settings → Backup** writes what Arcanum knows about your setup to a single file, and reads it back on another phone. It is for the day you replace the phone, not for protecting the vaults themselves - a vault is already a file you can copy, and this is about not having to set everything up again beside it.

## What a backup carries

- **Your settings**: the theme, auto-lock and its window, the editor, the gallery, and everything else in Settings.
- **The way the vault list is arranged**: its sorting and grouping.
- **The list of vaults**, if you ask for it: their names, their per-vault settings and how each of them was last mounted.

## What it never carries, and why

- **Your PIN, and the panic PIN.** A file that carries the way in is a key. Setting a PIN again takes a minute; a stolen backup that unlocks the app is a different kind of problem.
- **Panic mode.** What it does is bound to the phone it was set up on and to the vaults on it, and a file describing a duress plan is a dangerous document to leave lying around.
- **Fingerprint unlock.** Not a choice: those credentials are wrapped by keys that cannot leave the phone's hardware store, which is exactly what makes them worth having.
- **The calculator disguise.** It is applied by switching a launcher component and cannot be undone without reinstalling, so no file is allowed to turn it on.
- **Anything the app can rebuild**: the gallery's index, thumbnails, waveforms, logs.

## The password on the file

Protecting the file is a switch, and it is on by default.

**With a password**, the file is encrypted with a key derived from it - PBKDF2-SHA256 at 600,000 rounds - and sealed with AES-256-GCM. A wrong password and an edited file fail the same way, so a tampered backup cannot be restored half way. The password is typed once, it is not your PIN and not any vault's password, and **there is no way to recover it**. Keep it where you will still have it when the new phone arrives.

**Without one**, the file is plain: anyone who opens it reads the names of your vaults and where they were kept. The app says so under the switch, and again after it writes such a file.

## Restoring

Choose the file, give its password if it has one, and Arcanum tells you what came back: how many settings, how many vaults, and how many vaults were already in your list and were left exactly as they were. It never replaces a vault that is already there - the row on this phone knows where its file actually is, and the one in the file does not.

If anything is wrong - a wrong password, a file from a newer version of Arcanum, a file that is not a backup at all - nothing is applied.

## What happens to vaults on the new phone

A restored vault is a row, not a volume. The vault file stays where it was; the backup carries the name and the settings, not the encrypted container.

On another phone the path may not exist, and the permission you gave Arcanum to read that file certainly does not - Android grants it to an app on a device, and it does not travel. So a restored vault arrives marked with a crossed-out folder, and tapping it offers **Choose the file**. Point it at the container and it is whole again, with its name, its settings and its place in the list.

A vault on a USB drive is the exception. It is recognised by the volume itself rather than by a path, so it comes back ready to open with the drive plugged in.

## Pointing a vault at its file

This is not only for a new phone. A vault whose file you moved, renamed in a file manager, or restored from your own copy is in the same position, and the same **Choose the file** puts it right - keeping the vault's name, its settings, its fingerprint unlock and its place in panic mode's plan, all of which are lost if you forget the vault and add it again.

Arcanum checks what you point it at. Every volume carries a fingerprint in its header - the salt, readable without any password - and if the file is a different volume, Arcanum says so and asks you to choose another.

There is one way past that refusal, and it exists for a real case: **changing a volume's password writes a new salt**, so a vault whose password you changed on a desktop no longer matches the fingerprint this phone remembers. The file is yours, and Arcanum cannot tell that from a stranger - so it takes your word for it when you say so.
