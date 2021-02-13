# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.5] - 2021-02-13

### Added

- Providers: added type binding for documents
- Tests: added document typings for providers

### Changed

- Command `job`: refactored the `exec` method to better handle arguments and errors
- Command `help`: refactored the generation of usage and arguments description
- Command `dice`: added checks on rolls and faces values
- Command `echo`: added checks on permissions of targeted channel

### Fixed

- Task `almanax`: Remove doubled offset
- Command `job`: Display name of members instead of global user

## [0.1.4] - 2021-02-05

### Added

- Command `get`: see the currently configured parameters
- Command `about`: get information about the bot
- Tests: basic unit testing to cover locales, commands and arguments

### Changed

- Command `set`: simplify usage
- Command `job`: implements fuzzy search for job names
- Arguments: Dofus-related arguments parsing (`dofusServer`, `dofusDimension`, `dofusJob`)
- Providers: return docs instead of single key-value
- Misc: Minor corrections in localizations
- Misc: Harmonize constants and default values

### Removed

- Task `news`: RSS feed reading from [Dofus](https://www.dofus.fr/rss): blocked by CloudFlare

## [0.1.3] - 2021-01-27

### Added

- Command `poll`: create polls
- Command `remind`: set automatic reminders
- Providers: disable caching of logs in memory
- Task `logs`: prune older logs from the database
- Tasks: Log tasks results

### Changed

- Providers: refactor settings storage

### Fixed

- Metrics: Discord metrics collection

## [0.1.2] - 2021-01-18

### Added

- Metrics: Monitoring with PM2-IO and Keymetrics
- Command `monit`: check statistics about the current process
- Command `dice`: roll dices and get a score

### Changed

- Commands: friendlier status messages
- Project: improved deployment and development scripts 
- Commands: improved arguments parsing for `portal` and `job` commands

### Fixed

- Project: typo in sample DOTENV file preventing mapping the correct client owners
- Locales: typos in translations

## [0.1.1] - 2021-01-14

### Changed

- Task `twitter`: filter out tweets that are replies when fetching news
- Command `job`: improved argument parsing and handling of invalid arguments

## [0.1.0] - 2021-01-14

### Added

- Project: base structure and configuration
- Commands: Basic [commands](./README.md#Commands) to use within Discord
- Task `almanax`: automatically fetch the [almanax](http://www.krosmoz.com/en/almanax) of the day at midnight
- Task `twitter`: fetch news from twitter in (almost) real-time

[unreleased]: https://github.com/brinkflew/krosmobot/compare/v0.1.5...HEAD
[0.1.5]: https://github.com/brinkflew/krosmobot/compare/v0.1.4...v0.1.5
[0.1.4]: https://github.com/brinkflew/krosmobot/compare/v0.1.3...v0.1.4
[0.1.3]: https://github.com/brinkflew/krosmobot/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/brinkflew/krosmobot/compare/0.1.1...v0.1.2
[0.1.1]: https://github.com/brinkflew/krosmobot/compare/0.1.0...0.1.1
[0.1.0]: https://github.com/brinkflew/krosmobot/releases/tag/0.0.1
