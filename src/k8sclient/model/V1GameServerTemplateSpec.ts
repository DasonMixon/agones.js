import { V1ObjectMeta } from '@kubernetes/client-node/dist/gen/model/v1ObjectMeta'
import { V1GameServerSpec } from './V1GameServerSpec'

export class V1GameServerTemplateSpec {
    'metadata'?: V1ObjectMeta;
    'spec'?: V1GameServerSpec;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: {name: string, baseName: string, type: string}[] = [
      {
        name: 'metadata',
        baseName: 'metadata',
        type: 'V1ObjectMeta'
      },
      {
        name: 'spec',
        baseName: 'spec',
        type: 'V1GameServerSpec'
      }
    ];

    static getAttributeTypeMap () {
      return V1GameServerTemplateSpec.attributeTypeMap
    }
}
