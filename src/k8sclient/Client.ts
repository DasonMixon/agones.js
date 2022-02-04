import { KubeConfig } from '@kubernetes/client-node';
import { CustomCoreV1Api } from './../CustomCoreV1Api'

export class Client {
    private config?: KubeConfig = null;
    private api?: CustomCoreV1Api = null;

    constructor() {
        this.internalResetConfig();
        this.internalResetApi();
    }

    public getConfig(reset? : boolean) : KubeConfig {
        if (reset || this.config == null) {
            this.internalResetConfig();
        }

        return this.config;
    }

    public getApi(reset? : boolean) : CustomCoreV1Api {
        if (reset || this.api == null) {
            this.internalResetApi();
        }

        return this.api;
    }

    private internalResetConfig() {
        this.config = new KubeConfig();
        this.config.loadFromDefault();
    }

    private internalResetApi() {
        this.api = this.config.makeApiClient(CustomCoreV1Api);
    }
}
