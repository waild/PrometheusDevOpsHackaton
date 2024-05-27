import { KubeConfig, CoreV1Api } from '@kubernetes/client-node';

export default class KubeClientFactory {
  static getClient(): CoreV1Api {
    const kc = new KubeConfig();
    kc.loadFromDefault();

    const api = kc.makeApiClient(CoreV1Api);
    return api;
  }
}
