---
title: "Calculator Disguise"
order: 5
section: "Concepts"
---

## How the disguise works

Arcanum does not appear as "Arcanum" on your home screen or in the app drawer. Instead, it presents itself as a plain, functional calculator. The calculator works normally — you can use it for arithmetic. Nothing about it reveals that an encrypted vault is hidden inside.

## Accessing the vault

To unlock Arcanum from the calculator:

1. Type your PIN digits. They appear as the number on the calculator display.
2. **Long-press the `=` key for 2 seconds.**

If the PIN is correct, Arcanum navigates to the vault list. If the PIN is wrong, the calculator simply does nothing — no error message, no indication that a PIN was attempted.

If too many wrong attempts have been made, the display shows a temporary lockout message ("Locked Xs") and resets after a few seconds.

## Panic PIN

If you have set up a panic PIN (see [Panic Mode](/docs/panic-mode)), entering it on the calculator follows the same procedure — type the panic PIN, long-press `=`. The app opens normally, and the background wipe begins silently. From an observer's perspective, both PINs produce the same visible result.

## Auto-lock

When Auto-Lock is enabled in Settings (it is on by default), Arcanum locks automatically when the app moves to the background. The next time you open it, you see the calculator interface and must enter your PIN again.

## Calculator history

The calculator keeps a history of your previous calculations. This history is separate from any vault contents. The panic mode "clear calculator history" option wipes this history when a duress unlock is triggered.
