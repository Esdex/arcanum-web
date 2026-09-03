---
title: "Argon2id"
order: 8
section: "Concepts"
---

## Overview

Argon2id is a way of turning your password into the key that unlocks a vault. Arcanum's other five options — SHA-512, SHA-256, Whirlpool, Streebog, BLAKE2s-256 — do that by repeating a hash half a million times. Argon2id repeats less, but every pass has to fill and re-read a large block of memory.

That difference is the whole point. An attacker guessing at a stolen vault file runs the same derivation you do, on hardware built for it. A graphics card can run hundreds of PBKDF2 guesses in parallel because each one needs almost no memory. Ask for 416 MB per guess and the same card runs a handful.

Vaults made with it are ordinary VeraCrypt volumes and open in VeraCrypt 1.26.20 or newer on a computer. Anything older cannot open them at all — it has no Argon2id to try, so it reports a wrong password.

## What it costs

With the other five, the PIM adjusts an iteration count. With Argon2id it sets both the memory and the number of passes, and the two together are what an unlock costs — every time, on every device.

| PIM | Memory | Passes | Unlock on a modern phone |
|---|---|---|---|
| 1 | 64 MB | 3 | under half a second |
| 5 | 192 MB | 4 | about a second |
| **empty (means 12)** | **416 MB** | **6** | **about 2.5 seconds** |
| 20 | 672 MB | 9 | about 6 seconds |
| 31 and above | 1024 MB | 13 or more | 14 seconds and up |

The times are from a Nothing Phone (1); a faster phone is quicker, an old one slower. Memory is not negotiable in the same way: the vault asks for that much on whatever device opens it, and a phone that cannot spare it cannot open the vault at all.

## Choosing a PIM

**Leave it empty** and you get VeraCrypt's default, 416 MB and 6 passes. That is a sensible choice on any recent phone and the value another VeraCrypt user is most likely to try.

**A PIM of 1** costs 64 MB — cheaper than the default PBKDF2 derivation, and still far more expensive to attack in bulk. It requires a password of **20 characters or more**; Arcanum refuses shorter ones with a low PIM, the same rule VeraCrypt applies, because a short password with a cheap derivation is the combination worth guessing.

**High values** buy little against a strong password and cost you seconds and hundreds of megabytes at every unlock. Above PIM 31 the memory stops growing at 1 GB and only the passes climb.

Whatever you pick, remember it. The PIM is part of your credentials and is not stored anywhere in the vault — the same rule as everywhere else in VeraCrypt.

> The strength of a vault is mostly the strength of its password. Argon2id raises the cost of guessing; it does not rescue a password worth guessing.

## Opening a vault that uses it

Arcanum normally works out which derivation a vault uses by trying them all. It never tries Argon2id that way: one attempt would take hundreds of megabytes and seconds, on every mistyped password.

So it is used only when it is named:

- **An unlock that fails offers it.** Tap **Try Argon2id** under the message and the same password and PIM are tried again with it.
- **A vault remembers.** After one successful unlock, that vault goes straight to Argon2id next time, with no offer and no wasted attempt.
- **You can choose it directly** in the mount screen's PRF list, next to the five hashes.

If you have no Argon2id vault and would rather not be asked, turn off **Offer Argon2id after a failed unlock** in **Settings → Security**. The offer disappears; choosing the PRF by hand still works.

## When the memory is not there

Before it starts, Arcanum asks the system how much memory is free. If there is not enough, it says so with both numbers — what the vault needs and what the device has — instead of blaming your password.

- **Close some apps and try again.** This is usually enough; a phone frees memory as soon as something is closed.
- **Try anyway.** When the shortfall is only the safety margin, the message offers this. It risks nothing in the vault: the derivation happens before anything is opened, so the worst case is the system closing other apps, or this one.
- **Open it somewhere with more memory.** A computer, or another phone.
- **Make it cheaper, once.** On a device that can open the vault, **Changing password** lets you set a lower PIM, or move back to one of the five hashes. The vault keeps its contents; only the header is rewritten.

## Compatibility

- Works with every cipher and every cascade Arcanum offers, including the three-cipher ones.
- A vault made here opens in VeraCrypt 1.26.20 or newer, and one made there opens here, with the same password and PIM.
- A hidden volume can use Argon2id whether or not its outer volume does; opening either takes the same offer, or an explicit choice in the mount screen.

## Should you use it?

If your password is long and random, the five hashes are not a weak point, and the default derivation is fine.

Argon2id is worth it when the thing you are guarding against is someone taking the vault file and guessing at it for months on rented hardware. It makes that expensive in a way iterations cannot. The price is a few seconds and a few hundred megabytes every time you open the vault, and the certainty that a very old VeraCrypt, or a very weak phone, will not open it at all.
