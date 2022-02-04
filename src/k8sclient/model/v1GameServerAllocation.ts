import { V1GameServerAllocationSpec } from './V1GameServerAllocationSpec';
import { V1ObjectMeta } from '@kubernetes/client-node/dist/gen/model/v1ObjectMeta';
import { V1GameServerAllocationSpecRequired } from './V1GameServerAllocationSpecRequired';
import { V1GameServerAllocationSpecMatchLabels } from './V1GameServerAllocationSpecMatchLabels';
import { V1GameServerAllocationStatus } from './V1GameServerAllocationStatus';

export class V1GameServerAllocation {
    'apiVersion'?: string;
    'kind'?: string;
    'metadata'?: V1ObjectMeta;
    'spec'?: V1GameServerAllocationSpec;

    // This should only be part of the response, not sent on the request
    status?: V1GameServerAllocationStatus;

    constructor(fleetName?: string, namespace?: string) {
        this.apiVersion = 'allocation.agones.dev/v1';
        this.kind = 'GameServerAllocation';
        this.spec = new V1GameServerAllocationSpec();
        this.spec.required = new V1GameServerAllocationSpecRequired();
        this.spec.required.matchLabels = new V1GameServerAllocationSpecMatchLabels();

        if (fleetName)
            this.spec.required.matchLabels["agones.dev/fleet"] = fleetName;

        if (namespace)
            this.metadata.namespace = namespace;
    }

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: {name: string, baseName: string, type: string}[] = [
        {
            "name": "apiVersion",
            "baseName": "apiVersion",
            "type": "string"
        },
        {
            "name": "kind",
            "baseName": "kind",
            "type": "string"
        },
        {
            "name": "metadata",
            "baseName": "metadata",
            "type": "V1ObjectMeta"
        },
        {
            "name": "spec",
            "baseName": "spec",
            "type": "V1GameServerAllocationSpec"
        },
        {
            "name": "status",
            "baseName": "status",
            "type": "V1GameServerAllocationStatus"
        }
    ];

    static getAttributeTypeMap() {
        return V1GameServerAllocation.attributeTypeMap;
    }
}
