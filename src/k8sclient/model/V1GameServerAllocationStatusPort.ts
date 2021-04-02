export class V1GameServerAllocationStatusPort {
    name?: string;
    port?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: {name: string, baseName: string, type: string}[] = [
        {
            "name": "name",
            "baseName": "name",
            "type": "string"
        },
        {
            "name": "port",
            "baseName": "port",
            "type": "string"
        }
    ];

    static getAttributeTypeMap() {
        return V1GameServerAllocationStatusPort.attributeTypeMap;
    }
}