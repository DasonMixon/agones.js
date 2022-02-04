import { Client } from "./k8sclient/Client";
import { V1Fleet } from "./k8sclient/model/V1Fleet";
import { V1GameServer } from "./k8sclient/model/V1GameServer";
import { V1PatchFleet } from "./k8sclient/model/V1PatchFleet";
import { CreateGameServerResponse } from "./models/GameServerAllocation/CreateGameServerResponse";

class AgonesManager {
    private _client: Client;

    get client() {
        return this._client;
    }

    public startClient = () => {
        this._client = new Client();
    }

    public getFleets = async (namespace?: string): Promise<V1Fleet[]> => {
        try {
            const { body: result } = await this.client.getApi().getFleets(namespace);
            return result.items || [];
        } catch (error) {
            throw Error(`An unexpected error occurred fetching fleets: ${error}`);
        }
    }

    public createFleet = async (name: string, replicas: number, image: string, cpu: string, memory: string, namespace: string): Promise<V1Fleet> => {
        try {
            const fleet = new V1Fleet(name, replicas, image, cpu, memory, namespace);
            const { body: result } = await this.client.getApi().createFleet(fleet);
            return result;
        } catch (error) {
            throw Error(`An unexpected error occurred creating fleet: ${error}`);
        }
    }

    public updateFleet = async (fleetName: string, namespace: string, replicas?: number, image?: string, cpu?: string, memory?: string): Promise<V1Fleet> => {
        try {
            const patches: V1PatchFleet[] = [];
            if (replicas !== undefined)
                patches.push(new V1PatchFleet('replace', '/spec/replicas', replicas));
            if (image)
                patches.push(new V1PatchFleet('replace', '/spec/template/spec/template/spec/containers/0/image', image));
            if (cpu) {
                patches.push(new V1PatchFleet('replace', '/spec/template/spec/template/spec/containers/0/resources/requests/cpu', cpu));
                patches.push(new V1PatchFleet('replace', '/spec/template/spec/template/spec/containers/0/resources/limits/cpu', cpu));
            }
            if (memory) {
                patches.push(new V1PatchFleet('replace', '/spec/template/spec/template/spec/containers/0/resources/requests/memory', memory));
                patches.push(new V1PatchFleet('replace', '/spec/template/spec/template/spec/containers/0/resources/limits/memory', memory));
            }

            if (patches.length === 0)
                throw Error('No fleet changes supplied');

            const { body: result } = await this.client.getApi().patchFleet(patches, fleetName, namespace);
            return result;
        } catch (error) {
            throw Error(`An unexpected error occurred updating fleet: ${error}`);
        }
    }

    public deleteFleet = async (fleetName: string, namespace: string): Promise<V1Fleet> => {
        try {
            const { body: result } = await this.client.getApi().deleteFleet(fleetName, namespace);
            return result;
        } catch (error) {
            throw Error(`An unexpected error occurred deleting fleet: ${error}`);
        }
    }

    public getGameServers = async (namespace?: string): Promise<V1GameServer[]> => {
        try {
            const { body: result } = await this.client.getApi().getGameServers(namespace);
            return result;
        } catch (error) {
            throw Error(`An unexpected error occurred fetching game servers: ${error}`);
        }
    }

    public requestGameServerFromFleet = async (fleetName: string, namespace: string): Promise<CreateGameServerResponse> => {
        try {
            const { body: result } = await this.client.getApi().createGameServerAllocation(fleetName, namespace);
            switch(result.status.state) {
                case 'Allocated':
                    const address = result.status.address;
                    const port = result.status.ports[0].port;

                    return CreateGameServerResponse.success(address, port);
                case 'Unallocated':
                    return CreateGameServerResponse.failure('Unable to allocate game server');
                default:
                    return CreateGameServerResponse.failure('Unknown allocation state');
            }
        } catch (error) {
            throw Error(`An unexpected error occurred allocating game server: ${error}`);
        }
    }
}

export default AgonesManager