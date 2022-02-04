import { V1GameServerStatusPort } from "./V1GameServerStatusPort";
import { V1PlayerStatus } from "./V1PlayerStatus";

export class V1GameServerStatus {
    'state'?: string;
    'ports'?: V1GameServerStatusPort[];
    'address'?: string;
    'players'?: V1PlayerStatus;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: {name: string, baseName: string, type: string}[] = [
      {
        name: 'state',
        baseName: 'state',
        type: 'string'
      },
      {
        name: 'ports',
        baseName: 'ports',
        type: 'Array<V1GameServerStatusPort>'
      },
      {
        name: 'address',
        baseName: 'address',
        type: 'string'
      },
      {
        name: 'players',
        baseName: 'players',
        type: 'V1PlayerStatus'
      }
    ];

    static getAttributeTypeMap () {
      return V1GameServerStatus.attributeTypeMap
    }
}
