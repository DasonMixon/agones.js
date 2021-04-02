import { V1GameServerAllocationStatusPort } from "./V1GameServerAllocationStatusPort";

export class V1GameServerAllocationStatus {
    address?: string;
    gameServerName?: string;
    nodeName?: string;
    ports?: V1GameServerAllocationStatusPort[];
    state?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: {name: string, baseName: string, type: string}[] = [
        {
            "name": "address",
            "baseName": "address",
            "type": "string"
        },
        {
            "name": "gameServerName",
            "baseName": "gameServerName",
            "type": "string"
        },
        {
            "name": "nodeName",
            "baseName": "nodeName",
            "type": "string"
        },
        {
            "name": "ports",
            "baseName": "ports",
            "type": "Array<V1GameServerAllocationStatusPort>"
        },
        {
            "name": "state",
            "baseName": "state",
            "type": "string"
        }
    ];

    static getAttributeTypeMap() {
        return V1GameServerAllocationStatusPort.attributeTypeMap;
    }
}