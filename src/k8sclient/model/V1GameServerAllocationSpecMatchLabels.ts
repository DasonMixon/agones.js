export class V1GameServerAllocationSpecMatchLabels {
    'agones.dev/fleet'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: {name: string, baseName: string, type: string}[] = [
        {
            "name": "agones.dev/fleet",
            "baseName": "agones.dev/fleet",
            "type": "string"
        }
    ];

    static getAttributeTypeMap() {
        return V1GameServerAllocationSpecMatchLabels.attributeTypeMap;
    }
}