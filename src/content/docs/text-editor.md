---
title: "Editing Text Files"
order: 3
section: "Vault Management"
---

## Overview

Notes, configuration files, scripts and code can be read and edited inside Arcanum, without handing them to another app. Everything on this page happens inside the mounted vault: the file is read out of it, held in memory while you work, and written back into it. Nothing is decrypted to your device's storage along the way, and no external app access is needed - that permission is only for **Open with…**.

## Opening a file

Tapping a text file opens the editor. The names it opens are the ones people expect to be text: `.txt`, `.md`, `.log`, `.csv`, `.json`, `.xml`, `.html`, `.ini`, `.conf`, `.yml`, `.toml`, `.sh`, `.kt`, `.java`, `.py`, `.c`, `.js`, `.css`, `.sql` and a good many more of the same kind.

Anything else - a file with no extension, a `.bak`, a config named after the program that wrote it - is opened through **Edit as text** in the file's own menu. That is safe to try on anything: a file with bytes no text has is refused with "Not a text file" rather than shown as rubbish and offered for saving.

Files up to **1 MB** open in the editor. A larger one is not opened here at all, and says so: the whole file is laid out at once, and past that size the wait stops being reasonable. **Open with…** still hands it to another app.

## Making a new file

The **+** button in the file browser holds **New…**, which asks what to make:

- **New folder**
- **New text document**, and then which kind: `.txt`, `.md`, or **Another extension**, where you type your own

The name is checked while you type it rather than after. A name already taken in that folder, or one holding a character the filesystem will not accept (`\ / : * ? " < > |`), is refused before anything is written. On FAT and exFAT that check ignores upper and lower case, because on those filesystems `Notes.txt` and `notes.txt` are one and the same file.

A document made this way opens in the editor straight away. If you would rather it did not, there is a switch for that in **Settings → Text editor**.

## In the editor

**Line numbers** run down the left. They number lines of the file: with wrapping on, a long line covering three rows on screen is still one line and gets one number.

**Wrapping** is off to begin with, so a line of the file is a line on screen and what does not fit is reached by dragging sideways. Turn it on in the settings if you would rather read prose than code.

**Colouring** knows six kinds of file: Markdown, JSON, XML and HTML, key-and-value files such as `.ini`, `.conf`, `.yml` and `.toml`, shell scripts, and code. It is colour and nothing else - not a single character of the file is changed by it, and a format it does not know is shown plain.

**Undo** and **redo** sit in the bar. A run of typing is one step, so undo takes back a word rather than a letter; opening a file starts with an empty history, so undo can never take a file to a state it was never in.

**Spaces and tabs** can be shown as dots and arrows. Like the colouring, this is drawn rather than substituted: what is saved is what you typed.

## Markdown

A `.md` file has two sides, and the button in the corner of the editor turns it over.

**Writing.** The marks are visible, and a row of them sits over the keyboard while it is up: bold, italic, struck through, code, a link, a heading, a quote, a bulleted list, a numbered list and a checkbox. Each one is a toggle - press it on text that already carries the mark and the mark comes off. The line-wide ones (heading, quote, lists, checkbox) replace whatever marker the line already has, so turning a bullet into a checkbox is one press.

**Reading.** Headings by size, with a rule under the first two levels. Bulleted and numbered lists, nested as deep as they are written. Quotes with a bar down their side. Code in a block of its own, monospaced, scrolling sideways rather than wrapping. Tables, with their columns measured from what is in them and the whole table scrolling sideways when it is wider than the screen. Rules, and the marks inside a line - bold, italic, struck through, code and links.

**Checkboxes are not a picture.** Tapping one in the reading view edits the file: `- [ ]` becomes `- [x]` in the text itself. Undo takes it back like any other change, and it needs saving like any other change. Both sides of the button show the same text rather than a copy of it, so they cannot drift apart.

**Front matter** - the block of `key: value` lines between two lines of three dashes at the very start of a file - is shown as properties rather than as a rule and a paragraph. It has its own panel in the reading view and its own colours in the editor. Three dashes anywhere else in the file are still a horizontal rule.

**Links** ask before they take you out of the app, and show the whole address while they ask. Nothing is fetched from the network to render a file kept in a vault - an image written as `![alt](url)` is shown as a link rather than loaded.

This is a small dialect on purpose: what people put in notes. Anything outside it - HTML, footnotes, reference-style links, setext headings, indented code blocks - is left as the text it is rather than swallowed, so nothing written in a file can go missing on the way to the screen.

## Saving

**Save** is in the bar, and it is active only while there is something to save. Leaving the editor saves as well, and so does anything that puts the app in the background - which is the last moment before an auto-lock can close the vault.

The write itself never goes over the file. Arcanum writes a second file beside it, removes the original and renames the new one into its place, so a save interrupted half way - by a killed process, a drive pulled out - leaves you with either the old file or the new one, never half of either.

## What the editor does not change

Four things about a text file are invisible on screen and break something when they change behind your back. Arcanum keeps all four:

- **the encoding.** A file that is not UTF-8 is held byte for byte and written back the same way.
- **the byte order mark**, if the file opens with one.
- **the way lines end**, Windows (CRLF) or Unix (LF). A `.conf` whose line endings quietly became LF is a file that stopped working on the machine it was written for.
- **whether the last line ends with a newline.** If it did not, it still does not.

Two cases are answered rather than guessed at:

A file that ends its lines **both ways** cannot be edited without settling on one, since the editor needs a single kind of line break to work with. It says so in a line under the bar, before anything is written, and saving unifies them.

A file that is **not UTF-8** is shown byte for byte, which means an old file in some other encoding looks wrong on screen but survives being opened and closed untouched. If what you type cannot be stored in that file's own encoding - Cyrillic in a Windows-1251 file, say - the save stops and asks, rather than writing question marks where the characters were. You can leave the file alone, or convert the whole thing to UTF-8, which is a change to the file itself: a program expecting the old encoding will read it differently afterwards.

## Settings

**Settings → Text editor** holds the font size, whether the font is monospaced, wrapping, line numbers, the marks for spaces and tabs, the colouring, whether a new document opens in the editor, and whether scrolling puts the keyboard away. The editor itself is drawn above them and changes as you change them, so nothing has to be described in words.

## Privacy

The editor is inside the app, so the same protections apply: screenshots and screen recording are blocked at the OS level, and the file is only ever readable while the vault is mounted. If the vault closes while the editor is open - an auto-lock, or an unmount from another screen - the editor says so and stops; anything already saved is in the vault, and the vault has to be unlocked again to carry on.
