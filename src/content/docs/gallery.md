---
title: "Photos and Videos"
order: 3
section: "Vault Management"
---

## Overview

The Gallery tab is the vault's photographs and videos, shown as a grid rather than as a list of file names. It is the same files the Files tab holds - nothing is stored twice - read out of the vault as they are needed and decrypted only in memory. Screenshots and screen recording are blocked while Arcanum is open (unless you have turned that protection off), so what is on this screen is not captured by anything else on the phone.

## What ends up in it

Everything Arcanum recognises as a photo or a video, wherever it sits in the vault. A vault is read through once when it is first opened, and after that the gallery follows what you do: a file imported, moved, renamed, copied or deleted in the Files tab appears, moves or goes here at the same moment.

If the gallery ever disagrees with the vault, opening the vault again reads it through afresh. There is also a rescan button, which is off by default and turned on in **Settings, Debug**.

## Arranging the grid

The **view options** button holds two things:

- **What to show:** all media, photos only, or videos only.
- **The order:** by date, name, size or type, ascending or descending - and Random, which arranges the whole collection differently every time you come back to the tab.

Ordered by date, the grid is a timeline: months and days get headings, with today and yesterday named rather than dated. The other orders have no headings, because "March 2026" over a grid sorted by size would describe nothing.

**Search** filters by file name and works alongside whatever else is set.

## Showing only some folders

The **folder button** lists every folder in the vault that holds media: four of its newest pictures in a square, the folder's name, and how many files are in it. Tick the folders you want to see and the gallery shows those; tick nothing and it shows everything, which is how it starts.

Several folders at once is fine. A ticked folder means that folder and not the tree beneath it - every folder that holds media has a row of its own, so a nested one is picked directly rather than through its parent.

The button is coloured while a filter is on. A gallery showing part of a vault should never be mistaken for one that has lost the rest.

The choice lasts as long as the vault is open and starts again at everything the next time you unlock it. A folder can be moved or emptied while the vault is closed, and a filter naming a folder that is no longer there would show you an empty gallery with nothing to explain it.

## Selecting

A long press selects a photograph and turns the top bar into a count and a delete button. With the timeline showing, the circle beside a month or a day heading selects everything under it, and shows at a glance whether all, some or none of it is already selected.

Deleting from here deletes from the vault. On a vault mounted read-only the button is greyed out.

## Opening one

Tapping a photograph opens the viewer. Swipe to move through the collection in the order the grid is in - including a random order, which stays fixed while you are in the viewer rather than reshuffling under you. Pinch to zoom, drag to pan.

A tap hides the interface, and the picture keeps the whole screen. The navigation area stays with the system, so the back gesture works as it does everywhere else. Another tap brings the interface back; swiping to the next photograph does not, since hiding it was deliberate. A video is the exception - it brings its controls back, because they are what plays, pauses and seeks it - and they go away by themselves a few seconds later.

## Videos

Videos play in the viewer, with a full-screen button for the ones that are wider than they are tall. Playback continues through a media session, which is what puts the controls on the lock screen and in the shade.

By default that session says nothing about what is playing: no file name, no artwork, no vault. What a media session carries is mirrored past the PIN, past biometrics, and onto whatever else is paired with the phone. **Settings, Security** has a switch for it if you would rather see the name of what is playing.

## Thumbnails

Thumbnails are made once and kept in an encrypted cache, so a large vault is slow only the first time. They are generated in the background after a vault is read through, and a thumbnail follows its file when it is renamed or moved inside the same vault rather than being made again.

Everything cached about a vault - its index, its thumbnails, the waveforms of its audio - is removed when the vault is forgotten, deleted or wiped by panic mode.
