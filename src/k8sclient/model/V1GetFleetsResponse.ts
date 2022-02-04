import { V1ObjectMeta } from '@kubernetes/client-node/dist/gen/model/v1ObjectMeta'
import { V1Fleet } from './V1Fleet'

export class V1GetFleetsResponse {
    'kind'?: string;
    'apiVersion'?: string;
    'metadata'?: V1ObjectMeta;
    'items'?: V1Fleet[];

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: {name: string, baseName: string, type: string}[] = [
      {
        name: 'kind',
        baseName: 'kind',
        type: 'string'
      },
      {
        name: 'apiVersion',
        baseName: 'apiVersion',
        type: 'string'
      },
      {
        name: 'metadata',
        baseName: 'metadata',
        type: 'V1ObjectMeta'
      },
      {
        name: 'items',
        baseName: 'items',
        type: 'Array<V1Fleet>'
      }
    ];

    static getAttributeTypeMap () {
      return V1GetFleetsResponse.attributeTypeMap
    }
}
