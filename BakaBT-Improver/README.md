# BakaBT Improver

## [Install](https://github.com/Efreak/BakaBT-Improver/raw/master/BakaBTImprover.user.js)
This userscript is based on [this](https://greasyfork.org/en/scripts/370934-bakabt-improver) BakaBT Improver script created by Cholik. Currently it only works on the browse page.

Features (can all be toggled, colors can be customized)
1. ✔️ adds different row backgrounds for torrents that are in your user profile
2. ✔️ adds the bakabt favicon after names of torrents that are in your user profile
3. ✔️ changes the color of the background of the category icon on freeleech torrents

Locations that these tweaks are applied
1. ✔️ first page of search results (original version)
2. ✔️ all other search results pages (this version)
3. ❌️ Torrent description pages (planned)

How it works
1. ✔️ fetches your profile page on every page load (BAD!)
2. ✔️ updates every minute - should probably be changed to 30-60 minutes
3. ❌️ fetches your profile page and saves the list of torrents locally and a timestamp
   - (currently it fetches your profile on every page load
4. ❌️ update above local list 1 & 5 minutes after clicking the 'download' link on the description page.
5. ❌️ skips creating icons for 'owned' torrents that already have one when updating
   - currently it just removes all the existing icons before updating)

# License

There's no license on the original script. That means I shouldn't do this (I think?). But I did. You can do what you want with my modifications: CC0, WTFPL, whatever.
