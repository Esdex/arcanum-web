---
title: "Music"
order: 3
section: "Vault Management"
---

## Overview

Tapping a song in the Files tab opens Arcanum's music player. The track is read out of the mounted vault as it plays and decrypted only in memory, so nothing is written to the phone's storage along the way, and no other app is involved.

The songs in the list you opened it from - the folder, or the results of a search - become the playlist, in the order the list shows them, and previous and next move through it, from the player and from the notification alike. Shuffle and repeat are just above the waveform. Music keeps playing while you browse the vault, and has a player of its own, separate from the one videos use; see [Photos and Videos](/docs/gallery/) for how the two share the speaker.

By default nothing about what is playing reaches the lock screen or the notification shade: no title, no artwork, no vault. **Settings, Security** has a switch for it if you would rather see the name of the song.

## The waveform

Below the cover, the waveform shows the shape of the whole song: quiet intros, drops and breakdowns are where they are in the track. Tap it, or drag along it, to jump to that point.

It is worked out from the song's own audio the first time the song is played, and drawn as it is worked out: the bars appear from the left within a moment of opening the track, and you can seek on what is already there while the rest arrives. After that it is kept, encrypted, with the vault's other cached data, so the next time it is there at once. It is removed with the rest of that cache when the vault is forgotten, deleted or wiped by panic mode.

## File info

**File info** in the player's menu shows what the file says about itself: title, artist, album, album artist, genre, year, track number and lyricist, the cover, and on a second tab the lyrics. Below them are the details of the file - its length, sample rate, bit rate, channels and when it was last changed.

## Editing tags

The pencil in File info makes the tags editable. Change what you want and save: the tags are written into the file, and you are back in the player, which carries on from where it was.

- **What can be edited:** title, artist, album, album artist, genre, year, track number, lyricist and lyrics. Tags you did not touch, and anything else the file keeps in its tag that Arcanum does not show, are left exactly as they were.
- **Which files:** MP3. Other formats show their tags but have no pencil yet.
- **A tag Arcanum cannot write back** without losing part of it - one stored in a few rare forms some old taggers use - is not edited. File info says so, and the file is left as it is.

When the new tags fit in the space the old ones had, they are written over them and the music itself is not touched. When they do not - a long set of lyrics, a large new cover - the file is written again as a new copy beside the old one, which replaces the old one only once it is complete. Either way an interrupted save cannot damage the audio.

A song with a second name in the vault (see [Links](/docs/files/#links)) is one file under both names, and an edit made under either name shows under both. The one case Arcanum refuses is new tags that do not fit in the old space on such a file: writing a new copy would give one name the new file and leave the other with the old tags, so the file is left as it was and File info explains why. A song opened through a link is edited in the file the link points at, and the link stays a link.

## The cover

**Change cover** offers a picture from the vault's gallery or one from the phone. **Remove cover** takes it out.

A picture from the phone goes into the song and nowhere else; it is not imported into the vault as a file.

Wherever it comes from, a picture that carries data about itself - EXIF, which can say where and when it was taken and with which phone, or other notes of the kind - is redrawn before it goes in: turned the right way up, as a JPEG, without that data, so none of it travels with the song. So is a picture larger than 1500 pixels on its longer side or 1 MB, which comes out at 1500 pixels: plenty for a cover, and it keeps the file small. A picture with none of that goes in as it is.
