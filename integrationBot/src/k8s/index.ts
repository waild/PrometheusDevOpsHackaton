import { KubeConfig, CoreV1Api } from '@kubernetes/client-node';

export default class KubeClientFactory {
  static getClient(): CoreV1Api {
    const kc = new KubeConfig();
    if (process.env.KUBERNETES_SERVICE_HOST) {
      kc.loadFromCluster();
    } else {
      kc.loadFromDefault();
    }

    const api = kc.makeApiClient(CoreV1Api);
    return api;
  }
}
