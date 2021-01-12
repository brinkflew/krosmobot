# Krosmobot

An extensive Discord bot for not-too-serious Dofus guilds.

## Key Features

- A few util commands that allow to personnalize the bot for your own guild
- Automatic notification for the Almanax. Every day at midnight
- Get a notification when an official Dofus-related tweet is posted (updates, lives, maintenances, etc.)
- Multilang support (currently only French and partial English are supported)
- Track the jobs of your character in Dofus or find someone in your guild who can craft something for you
- Find the last known location of a portal to one of the divine dimensions

## In the Future

- Events-related commands (dice roll, cards, etc.)
- Improve portals localizations (closest zaap, best route, etc.)
- [In Discussion] Integration with Metamob: track and organize your quest for the mighty Ocre Dofus
- More!

---

## Commands

A few commands are made available to the users of the Discord guild. By default, those commands can be run in any text channel the bot has read-access to.

When in doubt, type `!help` to get a recap of all available commands.

### Dofus

- `!almanax` → Fetches the almanax of the day.
- `!job` → Information about members' jobs.
- `!portal` → Display the position of a portal.

### Settings

- `!color` → Change the color used for embeds' borders in this guild.
- `!locale` → Modifies the language for the current guild.
- `!prefix` → Modifies the prefix in this guild.
- `!set` → Assigns a value to a parameter.

### Utils

- `!echo` → Repeats a message.
- `!help` → Displays help about commands.
- `!invite` → Generates an invite to add the bot to another Discord guild.
- `!ping` → Latency between this bot and Discord.

## Twitter

The bot is capable of fetching news from Twitter directly. Currently, it follows the following accounts:

- [DOFUSfr](https://twitter.com/DOFUSfr?s=20)
- [AnkamaGames](https://twitter.com/AnkamaGames?s=20)
- [AnkamaLive](https://twitter.com/AnkamaLive?s=20)

The bot needs a channel to send the news to, see the [news setup](#News) for more details.

## Setup

Use the following commands to configure the bot for your Discord guild (those are examples, feel free to update the values to your liking).

### Language

Changes the language used by the bot in the current guild.

```
!lang fr
```

### Color

Changes the colors used by the bot for general-purpose embeds.
A few distinct embeds will retain their own color to indicate an error, warning or success message.

```
!color #c0ffee
```

### Almanax

Enables sending the almanax of the day automatically in the Discord channel name `#almanax`. A channel with this name must already exist on the server and the bot must have read and write access to that channel.

```
!set almanax.auto true almanax.channel #almanax
```

### News

Tells the bot to send a message in a given channel when one of the followed accounts sends a new tweet. A channel with this name must already exist on the server and the bot must have read and write access to that channel.

```
!set news.channel #news
```
