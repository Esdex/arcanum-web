---
title: "Photos and Videos"
order: 3
section: "Vault Management"
---

## Overview

The Gallery tab is the vault's photographs and videos, shown as a grid rather than as a list of file names. It is the same files the Files tab holds - nothing is stored twice - read out of the vault as they are needed and decrypted only in memory. Screenshots and screen recording are blocked while Arcanum is open (unless you have turned that protection off), so what is on this screen is not captured by anything else on the phone.

## What ends up in it

Everything Arcanum recognises as a photo or a video, wherever it sits in the vault. A vault is read through once when it is first opened, and after that the gallery follows what you do: a file imported, moved, renamed, copied or deleted in the Files tab appears, moves or goes here at the same moment.

A link made in the Files tab is here as soon as it is made. A link to a file is a second name for that file, so the picture appears under both names, as it would after the vault was read through again. A link to a folder is not followed: what is inside it is shown once, under the folder it really lives in, and opening one of those pictures through the link opens that same file.

If the gallery ever disagrees with the vault, opening the vault again reads it through afresh. There is also a rescan button, which is off by default and turned on in **Settings, Debug**.

## Arranging the grid

The **view options** button holds two things:

- **What to show:** all media, photos only, or videos only.
- **The order:** by date, name, size or type, ascending or descending - and Random, which arranges the whole collection differently every time you come back to the tab. By name, numbers are read as numbers, so IMG_9 comes before IMG_10 and nothing has to be padded with zeros to come out in order.

Ordered by date, the grid is a timeline: months and days get headings, with today and yesterday named rather than dated. Turned round to oldest first, it runs from the oldest day to the newest all the way down, the days inside each month included. The other orders have no headings, because "March 2026" over a grid sorted by size would describe nothing.

**Search** filters by file name and by folder name, and works alongside whatever else is set. See [Finding a folder](#finding-a-folder).

## Showing only some folders

The **folder button** lists every folder in the vault that holds media: four of its newest pictures in a square, the folder's name, and how many files are in it. Tick the folders you want to see and the gallery shows those; tick nothing and it shows everything, which is how it starts.

Several folders at once is fine. A ticked folder means that folder and not the tree beneath it - every folder that holds media has a row of its own, so a nested one is picked directly rather than through its parent.

The button is coloured while a filter is on. A gallery showing part of a vault should never be mistaken for one that has lost the rest.

The choice lasts as long as the vault is open and starts again at everything the next time you unlock it. A folder can be moved or emptied while the vault is closed, and a filter naming a folder that is no longer there would show you an empty gallery with nothing to explain it.

## Finding a folder

The search box matches folder names as well as file names. Type Camera and the gallery shows what is in that folder, whatever the photographs are called - which is usually the point, since a camera names its files after the date and nobody remembers those.

Folders that match appear as rows above the results, each with its four newest pictures, its name and its count. Tap one and the gallery shows that folder alone: the search closes and the folder filter takes over, which is the same state the folder button would have left you in.

A search matches the folder's own name, not the whole path. Searching for a parent folder does not sweep in everything beneath it, for the same reason a ticked folder means that folder and not its tree.

## Fast scroll

While the grid scrolls, a handle appears on its right edge, and it goes again a moment after the scrolling stops. Drag it to move through the whole collection at once. Ordered by date, a ruler of years runs down the edge while you drag, with the year under your finger picked out, and the month is shown beside the handle. Ordered by name, size or type, the label is the first letter, the size or the extension instead.

The handle only appears when there are at least three screens of pictures, and it only answers a touch while it can be seen, so the right-hand column is tapped as usual the rest of the time. **Settings, Gallery** turns it off.

## Selecting

A long press selects a photograph and turns the top bar into a count and a delete button. With the timeline showing, the circle beside a month or a day heading selects everything under it, and shows at a glance whether all, some or none of it is already selected.

Deleting from here deletes from the vault. On a vault mounted read-only the button is greyed out.

## Opening one

Tapping a photograph opens the viewer. Swipe to move through what the grid is showing, in the order it shows it: the folders picked with the folder button, the photos or videos filter and the search all count, so the next picture is always one that was on screen. That includes a random order, which stays fixed while you are in the viewer rather than reshuffling under you. Pinch to zoom, drag to pan.

A tap hides the interface, and the picture keeps the whole screen. The navigation area stays with the system, so the back gesture works as it does everywhere else. Another tap brings the interface back; swiping to the next photograph does not, since hiding it was deliberate. A video is the exception - it brings its controls back, because they are what plays, pauses and seeks it - and they go away by themselves a few seconds later.

## Changing the date

**Details** in the viewer shows when a picture was taken, and the date and time there can be changed, down to the second - which keeps several pictures taken within the same minute in the order they were taken. The change moves the picture in the timeline, and on a JPEG it is written into the file's own EXIF data as well. Times are shown on the clock the phone is set to, 12-hour or 24-hour.

## Videos

Videos play in the viewer, with a full-screen button for the ones that are wider than they are tall. Besides the usual controls:

- **A lock** beside the seek bar stops the video from answering touches, so a stray finger cannot pause it, seek or swipe to the next file. Tap the screen, or press back, and an Unlock button appears.
- **Swipe up or down** on the right of the video for the volume, on the left for the brightness. The brightness is the player's only, and it goes back to normal when you leave the video.
- **Hold a finger** on the video to play it at twice the speed until you let go.
- **The menu** sets a speed from 0.25x to 2x and loops the video. Both last until the video is closed.

Each of these has its own switch in **Settings, Video player**, and all of them start switched on.

Music and video have a player each. A video that starts playing pauses any music, and when you swipe from it to a photograph or leave the viewer, the music carries on from where it stopped. **Settings, Video player** can leave it paused instead.

Playback continues through a media session, which is what puts the controls on the lock screen and in the shade. Tapping the music's notification opens its player, once you are past the lock if the app is locked.

By default that session says nothing about what is playing: no file name, no artwork, no vault. What a media session carries is mirrored past the PIN, past biometrics, and onto whatever else is paired with the phone. **Settings, Security** has a switch for it if you would rather see the name of what is playing.

## Thumbnails

Thumbnails are made once and kept in an encrypted cache, so a large vault is slow only the first time. They are generated in the background after a vault is read through, and a thumbnail follows its file when it is renamed or moved inside the same vault rather than being made again.

Everything cached about a vault - its index, its thumbnails, the waveforms of its audio - is removed when the vault is forgotten, deleted or wiped by panic mode.
