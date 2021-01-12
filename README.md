# Krosmobot

A stupid Discord bot for a stupid Dofus guild.

## Commands

A fex commands are made available to the users of the Discord guild. By default, those commands can be run in any text channel the bot has read-access to.

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

## Configuration

Use the following commands to configure the bot for your Discord guild (those are examples, feel free to update the values to your liking).

Change the language to French:

```
!lang fr
```

Change the color of embeds sent by the bot:

```
!color #c0ffee
```

Enable sending the almanax of the day automatically in the Discord channel name `#almanax`:

```
!set almanax.auto true almanax.channel #almanax
```
