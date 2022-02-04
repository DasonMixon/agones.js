import { V1AggregatedPlayerStatus } from './V1AggregatedPlayerStatus'

export class V1FleetStatus {
    'replicas'?: number;
    'readyReplicas'?: number;
    'reservedReplicas'?: number;
    'allocatedReplicas'?: number;
    'players'?: V1AggregatedPlayerStatus;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: {name: string, baseName: string, type: string}[] = [
      {
        name: 'replicas',
        baseName: 'replicas',
        type: 'number'
      },
      {
        name: 'readyReplicas',
        baseName: 'readyReplicas',
        type: 'number'
      },
      {
        name: 'reservedReplicas',
        baseName: 'reservedReplicas',
        type: 'number'
      },
      {
        name: 'allocatedReplicas',
        baseName: 'allocatedReplicas',
        type: 'number'
      },
      {
        name: 'players',
        baseName: 'players',
        type: 'V1AggregatedPlayerStatus'
      }
    ];

    static getAttributeTypeMap () {
      return V1FleetStatus.attributeTypeMap
    }
}
