import { Listener } from 'discord-akairo';
import metrics from '@/metrics';

const heartbeatRegExp = /^\[WS => Shard 0\] Heartbeat acknowledged, latency of ([0-9]+)ms.$/;

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
    this.client.logger.debug(description);

    const heartbeat = heartbeatRegExp.exec(description);
    if (!heartbeat) return;
    const latency = parseInt(heartbeat[1], 10);
    metrics.discord.heartbeat.update(latency);
  }

}
