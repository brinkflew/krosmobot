# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.3] - 2021-01-27

### Added

- Command `poll` to create polls
- Command `remind` to set automatic reminders
- Do not cache logs in memory and prune older logs from the database
- Log tasks results
- Fix Discord metrics collection
- Refactor settings

## [0.1.2] - 2021-01-18

### Added

- Monitoring with PM2-IO and Keymetrics
- Command `monit` to check statistics on the process
- Roll dices and get a score

### Changed

- Commands' status messages are friendlier
- More and better deployment/development scripts 
- Better arguments parsing for `portal` and job `commands`

### Fixed

- Typo in sample DOTENV file prevents mapping the correct client owners
- Typos in localizations

## [0.1.1] - 2021-01-14

### Changed

- Filter out tweets that are replies when fetching news
- Improve argument parsing for jobs and enable handling of invalid arguments

## [0.1.0] - 2021-01-14

### Added

- Project structure and configuration
- Basic [commands](./README.md#Commands) to use within Discord
- Automatically fetch the [almanax](http://www.krosmoz.com/en/almanax) of the day at midnight
- Get news from twitter in real-time

[unreleased]: https://github.com/brinkflew/krosmobot/compare/v0.1.3...HEAD
[0.1.3]: https://github.com/brinkflew/krosmobot/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/brinkflew/krosmobot/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/brinkflew/krosmobot/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/brinkflew/krosmobot/releases/tag/v0.0.1
