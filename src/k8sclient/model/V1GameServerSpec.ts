import { V1PodTemplateSpec } from '@kubernetes/client-node'
import { V1GameServerPort } from './V1GameServerPort'
import { V1Health } from './V1Health'
import { V1PlayersSpec } from './V1PlayersSpec'
import { V1SdkServer } from './V1SdkServer'

export class V1GameServerSpec {
    'container'?: string;
    'ports'?: V1GameServerPort[];
    'health'?: V1Health;
    'scheduling'?: string;
    'sdkServer'?: V1SdkServer;
    'template'?: V1PodTemplateSpec;
    'players'?: V1PlayersSpec;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: {name: string, baseName: string, type: string}[] = [
      {
        name: 'container',
        baseName: 'container',
        type: 'string'
      },
      {
        name: 'ports',
        baseName: 'ports',
        type: 'Array<V1GameServerPort>'
      },
      {
        name: 'health',
        baseName: 'health',
        type: 'V1Health'
      },
      {
        name: 'scheduling',
        baseName: 'scheduling',
        type: 'string'
      },
      {
        name: 'sdkServer',
        baseName: 'sdkServer',
        type: 'V1SdkServer'
      },
      {
        name: 'template',
        baseName: 'template',
        type: 'V1PodTemplateSpec'
      },
      {
        name: 'players',
        baseName: 'players',
        type: 'V1PlayersSpec'
      }
    ];

    static getAttributeTypeMap () {
      return V1GameServerSpec.attributeTypeMap
    }
}
