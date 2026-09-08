---
title: "Calculator Disguise"
order: 5
section: "Concepts"
---

## How the disguise works

Arcanum does not appear as "Arcanum" on your home screen or in the app drawer. Instead, it presents itself as a plain, functional calculator. The calculator works normally — it supports full arithmetic expressions including parentheses, percentages, and sign toggle. Nothing about it reveals that an encrypted vault is hidden inside.

The disguise is applied in **Settings → Security → Calculator Disguise**. Once enabled, the toggle is permanently grayed out and the change cannot be undone without reinstalling the app.

## Accessing the vault

To unlock Arcanum from the calculator:

1. Type your PIN digits. They appear as the number on the calculator display.
2. **Long-press the `=` key for 2 seconds.**

If the PIN is correct, Arcanum navigates to the vault list. Otherwise the calculator simply does nothing — no error message, no indication that a PIN was attempted. This is true whether the PIN was wrong or the vault is temporarily locked after repeated wrong attempts: the two outcomes are visually identical.

### Lockout is invisible while the disguise is on

Arcanum still rate-limits wrong PIN attempts internally — an escalating lockout kicks in after repeated failures — but with the calculator disguise enabled that lockout is **never shown on screen**. A visible "locked" message would let anyone who suspects the calculator is a vault confirm it by long-pressing `=` on random digits until the message appeared.

This is a deliberate concession of disguise mode: if you mistype your PIN enough times to trigger a lockout, the calculator keeps doing nothing — even for the correct PIN — until the lockout expires, with no on-screen explanation. If a correct PIN seems to be ignored, wait a short while and try again.

## Panic PIN

If you have set up a panic PIN (see [Panic Mode](/docs/panic-mode/)), entering it on the calculator follows the same procedure — type the panic PIN, long-press `=`. The app opens normally, and the background wipe begins silently. From an observer's perspective, both PINs produce the same visible result.

## Auto-lock

When Auto-Lock is enabled in Settings (it is on by default), Arcanum locks automatically when the app moves to the background. The next time you open it, you see the calculator interface and must enter your PIN again.

## Keeping a vault open names the app in the shade

If you turn on **Keep vaults open in the background** (Settings - Security), Android lists Arcanum in the notification shade's active apps panel for as long as a vault is open - the panel behind "1 app is active", with a button to stop it.

It is listed under the name **Arcanum**, not Calculator. The disguise changes the icon and label in your launcher; that panel uses the name Android knows the app by, which no setting can change. Anyone who pulls down the shade while a vault is open can see it.

The app warns about this before the switch goes on, and the switch is off by default. On Android 12 and earlier there is no such panel.

## Calculator history

The calculator keeps a history of your previous calculations. This history is separate from any vault contents. The panic mode "clear calculator history" option wipes this history when a duress unlock is triggered.
