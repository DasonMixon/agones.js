import { V1GameServerAllocationSpecRequired } from './V1GameServerAllocationSpecRequired'

export class V1GameServerAllocationSpec {
    'required'?: V1GameServerAllocationSpecRequired;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: {name: string, baseName: string, type: string}[] = [
        {
            "name": "required",
            "baseName": "required",
            "type": "V1GameServerAllocationSpecRequired"
        }
    ];

    static getAttributeTypeMap() {
        return V1GameServerAllocationSpec.attributeTypeMap;
    }
}