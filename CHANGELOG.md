# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Monitoring with PM2-IO and Keymetrics
- Command `monit` to check statistics on the process

### Changed

- Commands' status messages are friendlier
- More and better deployment/development scripts 
- Better arguments parsing for `portal` and job `commands`

### Fixed

- Typo in sample DOTENV file prevents mapping the correct client owners
- Typos in localizations

## [0.1.1] - 2021-14-01

### Changed

- Filter out tweets that are replies when fetching news
- Improve argument parsing for jobs and enable handling of invalid arguments

## [0.1.0] - 2021-14-01

### Added

- Project structure and configuration
- Basic [commands](./README.md#Commands) to use within Discord
- Automatically fetch the [almanax](http://www.krosmoz.com/en/almanax) of the day at midnight
- Get news from twitter in real-time

[unreleased]: https://github.com/brinkflew/krosmobot/compare/0.1.1...HEAD
[0.1.1]: https://github.com/brinkflew/krosmobot/compare/0.1.0...0.1.1
[0.1.0]: https://github.com/brinkflew/krosmobot/releases/tag/0.0.1
