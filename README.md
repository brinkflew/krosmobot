# Krosmobot

<div align="center">

KrosmoBot is a semi-generic-purpose [Discord](https://discord.com/)
bot aimed at facilitating the management of [Dofus](https://www.dofus.com/en)
guilds by providing a suite of tools and commands to its users.

![Badge: GitHub release (latest SemVer)]
![Badge: GitHub license]

![Badge: GitHub issues]
![Badge: GitHub pull requests]
![Badge: GitHub all releases]
![Badge: GitHub contributors]

![Badge: Discord]

</div>

---

## Key Features

- Customize the prefix and colors of the bot
- Benefit from a multilingual experience
- Receive tweet directly from Ankama
- Display the almanax of the day automatically
- Find portals position thanks to [Dofus-Portals](https://dofus-portals.fr/)
- List and share your jobs with other guild members
- Join events and minigames on Discord
- Create polls, setup automatic reminders
- And many more...


## In the Future

- More minigames
- Improve portals localization (closest zaap, best route, etc.)
- [In Discussion] Integration with [Metamob](https://www.metamob.fr/)
- And more...

---

## Commands

A few commands are made available to the users of the Discord guild. By default,
those commands can be run in any text channel the bot has read-access to.

When in doubt, type `!help` to get a recap of all available commands.

### Dofus

- `!almanax` → Fetches the almanax of the day.
- `!job` → Information about members' jobs.
- `!portal` → Display the position of a portal.

### MiniGames

- `!dice` → Roll some dices and get a score.

### Miscellaneous

- `!poll` → Create polls and compare answers.
- `!remind` → Set an automatic reminder in the future.
- `!about`→ About this bot.

### Settings

- `!color` → Change the color used for embeds' borders in this guild.
- `!locale` → Change the language for the current guild.
- `!prefix` → Change the prefix for the current guild.
- `!set` → Configure a parameter.
- `!get` → Display values assigned to parameters.

### Utils

- `!echo` → Repeat a message in another channel.
- `!help` → Display help about commands.
- `!invite` → Generate an invite to add the bot to another Discord guild.
- `!monit` → Get statistics about the bot and its processes (owner only).
- `!ping` → Show the latency between this bot and Discord.

## Twitter

The bot is capable of fetching news from Twitter directly. Currently,
it follows the following accounts:

- [DOFUSfr](https://twitter.com/DOFUSfr?s=20)
- [AnkamaGames](https://twitter.com/AnkamaGames?s=20)
- [krosmobot](https://twitter.com/krosmobot?s=20)

The bot needs a channel to send the news to, see the [news setup](#News) for more details.

---

## Installation

To run the bot on your own server, you'll need [NodeJS](https://nodejs.org/en)
version *14.15.0* or above and the [yarn](https://yarnpkg.com/) package manager.

Some commands make use of [canvas](https://www.npmjs.com/package/canvas)
which itself requires a few dependencies to be installed on your system.
To see the list of dependencies and how to install them
on your operating system, please refer to
[the official canvas documentation](https://github.com/Automattic/node-canvas#compiling).

### Before You Begin

Open the [Discord Developer Portal](https://discord.com/developers/applications) and create a new bot application.

Login to the [Twitter Developer Portal](https://developer.twitter.com/en) and create a new app.

### Download the Latest Stable Version

Clone this repository to your machine and navigate
to the `krosmobot` folder:

```sh
git clone --branch stable git@github.com:brinkflew/krosmobot.git
cd krosmobot.git
```

### Configure

Copy the `.env.example` file to `.env` and open that new file with your favorite text editor. Fill-in the required parameters. You'll need a least
the Discord and Twitter credentials from the apps created earlier on their developer portals.

> **NOTE:** Make sure to __never__ share those credentials with anyone else. Those are yours and yours only.

```sh
cp .env.example .env
vim .env
```

Run the client with the provided startup script:

```sh
yarn start
```

That's it!

---

## Setup

Use the following commands to configure the bot for your Discord guild
(those are examples, feel free to change the values to your liking).

### Language

Changes the language used by the bot in the current guild.

```
!lang fr
```

### Color

Changes the colors used by the bot for general-purpose embeds.
A few distinct embeds will retain their own color to indicate an error,
warning or success message.

```
!color #c0ffee
```

### Almanax

Enables sending the almanax of the day automatically in the Discord channel name `#almanax`.
A channel with this name must already exist on the server and the bot must have
read and write access to that channel.

```
!set almanax #almanax
```

### News

Tells the bot to send a message in a given channel when one of the followed accounts sends
a new tweet. A channel with this name must already exist on the server and the bot
must have read and write access to that channel.

```
!set twitter #news
```

### Default Dofus Server

Set a default Dofus server to use when unspecified in some commands (almanax, etc.).

```
!set server Jahash
```

[Badge: GitHub release (latest SemVer)]: https://img.shields.io/github/v/release/brinkflew/krosmobot?label=Version
[Badge: GitHub license]: https://img.shields.io/github/license/brinkflew/krosmobot?label=License
[Badge: GitHub issues]: https://img.shields.io/github/issues-raw/brinkflew/krosmobot?label=Issues&logo=GitHub
[Badge: GitHub pull requests]: https://img.shields.io/github/issues-pr-raw/brinkflew/krosmobot?label=Pull%20Requests
[Badge: GitHub all releases]: https://img.shields.io/github/downloads/brinkflew/krosmobot/total?label=Downloads
[Badge: GitHub contributors]: https://img.shields.io/github/contributors/brinkflew/krosmobot?label=Contributors
[Badge: Discord]: https://img.shields.io/discord/399609103137112078?color=%237289DA&label=Discord&logo=Discord
