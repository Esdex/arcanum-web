---
title: "Working with Files in a Vault"
order: 2
section: "Vault Management"
---

## Overview

Once a vault is mounted, Arcanum gives you a file manager inside it. Everything on this page happens inside the encrypted container: files are decrypted as they are read and encrypted as they are written, and nothing is written to your device's storage in the clear along the way.

The **+** button holds everything that puts something into the vault. Selecting items — long-press one, then tap the rest — replaces the bottom bar with the actions that work on a selection.

## Adding files

**Import files** opens the system picker and copies what you choose into the folder you are looking at. **Import folder** takes a whole folder with everything inside it, subfolders and all, and recreates it in the vault.

**Delete source files after import** is a switch on the import sheet. It removes the originals from where they came from, but only after the import has actually succeeded — a file that failed to write is never deleted from outside, and neither is anything from an import you stopped yourself.

### When a name is already taken

If something in the destination already has the name, Arcanum stops and asks: **Keep both**, **Skip**, or **Replace**. Your answer applies to the rest of that import, so a hundred colliding names is one question rather than a hundred. Keep both adds a number to the new name, the way `photo (1).jpg` follows `photo.jpg`.

The same question, with the same three answers, is asked by a copy and by a move.

## Watching an operation

While files are moving, a line appears under the top bar: what is being worked on now, which item of how many, and a progress bar. **Tap it** and a sheet opens with the whole picture:

- the file being written and how far into it, in bytes
- where it is in the batch, and how far along the batch is
- how fast it is going and roughly how long is left
- how long it has been running
- anything skipped, left behind or failed, as it happens rather than in a summary at the end

Some of those are missing sometimes, and that is deliberate. A percentage, a speed and a time remaining can only be honest if the total size is known, and it is not always: some providers will not say how large a file is before you read it, and a selection containing a folder has a size nobody knows until the folder has been walked. Rather than showing an invented number, Arcanum shows a bar without a position and leaves the estimates out.

Importing a folder is the exception it makes for itself: it walks the folder first, counting files and folders and adding up sizes, and only then starts writing. That is why an import of a large folder pauses for a moment on "Looking through the folder" before anything moves.

The sheet never opens on its own, and it does not stay behind when the work ends. Once an operation finishes, the notification that reports it is the way back to the details: tap it and the same sheet opens with the result.

## Stopping an import

An import can be stopped while it runs. Open the details sheet and use **Cancel import**; Arcanum asks before anything happens, and while that question is on screen the import is paused, so nothing more goes into the vault while you are deciding. Closing the question without answering counts as "no" and the import carries on from where it paused.

If you do stop it:

- files already imported stay in the vault
- the file being written at that moment is discarded rather than left half-finished — it would look like a whole file otherwise
- nothing else is started
- nothing is removed from where it came from, including the source folder when **Delete source files after import** is on

The other operations cannot be stopped yet.

## Taking files out

**Export** writes the selected items to a folder you pick outside the vault. What lands there is an ordinary, unencrypted copy — protecting it once it is out is up to you and to wherever you put it.

Two things are worth knowing about an export:

- A file that could not be read to the end still comes out, as far as it got, under the name `something.part`. The `.part` is the point: it says what you have is incomplete, so it is never mistaken for the whole file. The result also says how many came out that way.
- A link cannot leave the vault, because there is nothing outside to hold one. A file with two names inside the vault comes out as two separate copies, which takes twice the room; a link pointing at something that no longer exists cannot come out at all and is counted as skipped.

## Copying and moving

**Copy** and **Move** both ask where to, in one step. The sheet lists every mounted vault; if only one is mounted it opens straight inside it, and you browse to the folder you want and confirm with **Copy here** or **Move here**.

Copying something into the folder it is already in is how you duplicate it: the copy takes a numbered name and lands beside the original. That is the only way to duplicate a file, and it is the reason a copy into its own folder is not treated as a name clash worth asking about.

## Moving files between two vaults

Arcanum keeps as many vaults open as you mount, and that is what makes this possible: files travel from one vault straight into the other, without a stop in your phone's storage on the way.

1. Mount both vaults from the vault list. Opening the second does not close the first — both stay open.
2. Open the vault the files are in now and go to **Files**.
3. Long-press an item to start a selection, then tap the rest. A folder can be selected too, and crosses with everything inside it.
4. Tap **Move**, or **Copy** to leave the originals where they are. Because more than one vault is mounted, the sheet opens on a list of vaults rather than on folders: the one you are in is marked **This vault** in green, the others are named and carry the icon of the storage they live on.
5. Choose the other vault, browse to the folder you want, and confirm with **Move here** or **Copy here**.

Nothing is decrypted to disk in between. Arcanum reads a megabyte at a time out of one vault and writes it into the other, both of them mounted in the same app, so the readable bytes exist only in memory. A file that fails to write is removed from the destination rather than left half-finished, and a move only deletes the original once the copy is safely written.

Photographs and videos are in the second vault's gallery as soon as they arrive — the gallery's index travels with them, so there is no need to unmount and mount again.

Two things stay behind, and the result says how many: a link, because a link cannot point across vaults, and a special file such as a FIFO or a device node. Everything else — files, folders, empty folders, timestamps — goes across. If a name is already taken in the destination you are asked the same **Keep both / Skip / Replace** question an import asks, once for the whole batch.

If only one vault is mounted there is nothing to choose between, and the sheet opens straight inside that vault. That is the reason to mount both before you start: with a single vault open, the vault list never appears.

## Links

**Create link** gives something a second name in the vault without taking the space twice.

What that means depends on what you are linking:

- **A file** gets a hard link. There is one file with two names, and both are equally real: deleting either one leaves the other working, and the space is only freed when the last name is gone. When you delete one, Arcanum tells you the file is in more than one place and that removing it there frees no space.
- **A folder** gets a symbolic link, which is a path rather than the folder itself. Move or remove the folder it points at and the link stops working. Arcanum shows a broken link as broken rather than pretending it is a file.

Links live inside one vault. A link cannot point into another vault, and a copy or a move that would carry one somewhere it cannot exist — into another vault, or onto a FAT or exFAT vault, which have no links — leaves it behind rather than turning it into an empty file. The result says how many were left behind.

Links need a vault formatted with ext4. See [Choosing a Filesystem](/docs/filesystems/).

## Reading a PDF

Tapping a PDF opens it inside Arcanum. The pages scroll, pinch zooms in, and a double tap goes in and back out; while zoomed, one finger moves about the page and carries on through the document. The file is read a piece at a time from inside the mounted vault, so nothing is written out to be read and a large document opens as quickly as a small one. This needs no permission and no external app access - that is only for handing a file to another app. A PDF with a password of its own cannot be opened here: Android has no way to supply one.

## Editing a text file

Tapping a note, a configuration file or a script opens it in Arcanum's own editor, with line numbers, syntax colouring and undo. What it is careful about - the file's encoding, its line endings, the newline at its end - has a page of its own: [Editing Text Files](/docs/text-editor/).

## Opening a file in another app

**Open with…** hands a file to another app on your phone. The first time, Arcanum explains what that needs and asks: the other app reads the file straight from the mounted vault, nothing is decrypted to disk, and its access ends when you unmount. While that permission is on, the vault also appears in the system file picker, and you can turn it off again in the vault's settings.

## Deleting

**Delete** removes the selected items from inside the vault. There is no recycle bin: what is deleted is gone, and it is gone from inside an encrypted container, so nothing is left outside for a recovery tool to find.

Deleting inside the vault has no effect on anything outside it. If you imported a file and did not ask for the original to be deleted, the original is still where it was.
