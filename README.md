# Collegeville/.github

This repo holds the Collegeville organization's public profile, shown at [github.com/Collegeville](https://github.com/Collegeville). Edit [profile/README.md](profile/README.md) to change it.

The profile lists the Fables games. Its source of truth is the website catalog, `_data/games.yml` in [collegeville.github.io](https://github.com/Collegeville/collegeville.github.io). The **Check profile against the Games catalog** workflow runs weekly and on every change, and fails if a live or in-progress game is missing from the profile. When a game goes live, add its row to the table in the same week.

To run the check by hand: `node scripts/check-profile.js` (reads the catalog from GitHub) or `node scripts/check-profile.js ../collegeville.github.io/_data/games.yml` (a local copy).

## License

Code is under the [MIT License](LICENSE). Documents, written content, images, audio, and video are under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); see [LICENSE-CONTENT](LICENSE-CONTENT). © 2026 Michael A. Heroux.

## Image policy

No photos or likenesses of any real person, living or dead, appear in this repo or on anything built from it. All images are created together with Claude, so Michael A. Heroux owns them and they are licensed CC BY 4.0. The only exception is Michael himself: his standard professional portrait and an occasional informal photo. Any other exception needs Michael's explicit approval for that specific case. Future contributors, including AI coding sessions, must follow this policy.
