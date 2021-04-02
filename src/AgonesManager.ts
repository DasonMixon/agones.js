import { Client } from "./k8sclient/Client";
import { CreateGameServerResponse } from "./models/GameServerAllocation/CreateGameServerResponse";

class AgonesManager {
    public client: Client;

    constructor() {
        this.client = new Client();
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
                            reject(CreateGameServerResponse.failure('Unable to allocate game server'));
                        default:
                            reject(CreateGameServerResponse.failure('Unknown allocation state'));
                    }
                },
                (err) => {
                    reject(CreateGameServerResponse.failure(`An unexpected error occurred allocating game server: ${err}`));
                }
            );
        });
    }
}

export default AgonesManager