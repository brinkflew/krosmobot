import { Listener } from 'discord-akairo';
import metrics from '@/metrics';
import { Logger } from '@/structures';

const heartbeatRegExp = /^\[WS => Shard ([0-9]+)\] Heartbeat acknowledged, latency of ([0-9]+)ms.$/;

/**
 * Does something when the client emits a debugging event.
 */
export default class extends Listener {

  public constructor() {
    super('client-debug', {
      emitter: 'client',
      event: 'debug'
    });
  }

  /**
   * Executes when the event is fired.
   */
  public exec(description: string) {
    const heartbeat = heartbeatRegExp.exec(description);
    if (!heartbeat) return;

    const latency = parseInt(heartbeat[2], 10);
    this.client.logger.debug(Logger.format(
      `discord: shard ${heartbeat[1]}`,
      'heartbeat',
      { latency: `${latency}ms` }
    ));
    metrics.discord.heartbeat.update(latency);
  }

}
