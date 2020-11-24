declare module 'discord-akairo' {
  interface AkairoClient {
    commands: CommandHandler,
    events: ListenerHandler,
    settings: {
      guilds: MongooseProvider
    }
  }
}
