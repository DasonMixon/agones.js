import { V1ObjectMeta } from '@kubernetes/client-node/dist/gen/model/v1ObjectMeta'
import { V1GameServerSpec } from './V1GameServerSpec'
import { V1GameServerStatus } from './V1GameServerStatus'

export class V1GameServer {
    'apiVersion'?: string;
    'kind'?: string;
    'metadata'?: V1ObjectMeta;
    'spec'?: V1GameServerSpec;
    'status'?: V1GameServerStatus;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: {name: string, baseName: string, type: string}[] = [
      {
        name: 'apiVersion',
        baseName: 'apiVersion',
        type: 'string'
      },
      {
        name: 'kind',
        baseName: 'kind',
        type: 'string'
      },
      {
        name: 'metadata',
        baseName: 'metadata',
        type: 'V1ObjectMeta'
      },
      {
        name: 'spec',
        baseName: 'spec',
        type: 'V1GameServerSpec'
      },
      {
        name: 'status',
        baseName: 'status',
        type: 'V1GameServerStatus'
      }
    ];

    static getAttributeTypeMap () {
      return V1GameServer.attributeTypeMap
    }
}
