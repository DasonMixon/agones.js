import { V1GameServerAllocationSpecMatchLabels } from './V1GameServerAllocationSpecMatchLabels'

export class V1GameServerAllocationSpecRequired {
    'matchLabels'?: V1GameServerAllocationSpecMatchLabels;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: {name: string, baseName: string, type: string}[] = [
        {
            "name": "matchLabels",
            "baseName": "matchLabels",
            "type": "V1GameServerAllocationSpecMatchLabels"
        }
    ];

    static getAttributeTypeMap() {
        return V1GameServerAllocationSpecRequired.attributeTypeMap;
    }
}