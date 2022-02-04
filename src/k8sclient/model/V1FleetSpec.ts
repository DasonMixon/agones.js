import { V1DeploymentStrategy } from '@kubernetes/client-node'
import { V1GameServerTemplateSpec } from './V1GameServerTemplateSpec'

export class V1FleetSpec {
    'replicas'?: number;
    'strategy'?: V1DeploymentStrategy;
    'scheduling'?: string;
    'template'?: V1GameServerTemplateSpec;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: {name: string, baseName: string, type: string}[] = [
      {
        name: 'replicas',
        baseName: 'replicas',
        type: 'number'
      },
      {
        name: 'strategy',
        baseName: 'strategy',
        type: 'V1DeploymentStrategy'
      },
      {
        name: 'scheduling',
        baseName: 'scheduling',
        type: 'string'
      },
      {
        name: 'template',
        baseName: 'template',
        type: 'V1GameServerTemplateSpec'
      }
    ];

    static getAttributeTypeMap () {
      return V1FleetSpec.attributeTypeMap
    }
}
