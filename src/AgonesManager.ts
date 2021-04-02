import { Client } from "./k8sclient/Client";
import { CreateGameServerResponse } from "./models/GameServerAllocation/CreateGameServerResponse";

class AgonesManager {
    _client: Client;

    get client() {
        return this._client;
    }

    public startClient = () => {
        this._client = new Client();
    }

    public requestGameServer = async (fleetName: string): Promise<CreateGameServerResponse> => {
        return new Promise((resolve, reject) => {
            this.client.getApi().createGameServerAllocationFromFleetName(fleetName).then(
                (response) => {
                    switch(response.body.status.state) {
                        case 'Allocated':
                            const address = response.body.status.address;
                            const port = response.body.status.ports[0].port;

                            resolve(CreateGameServerResponse.success(address, port));
                        case 'Unallocated':
                            resolve(CreateGameServerResponse.failure('Unable to allocate game server'));
                        default:
                            resolve(CreateGameServerResponse.failure('Unknown allocation state'));
                    }
                },
                (err) => {
                    reject(`An unexpected error occurred allocating game server: ${err}`);
                }
            );
        });
    }
}

export default AgonesManager