export class V1AggregatedPlayerStatus {
    'count'?: number;
    'capacity'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: {name: string, baseName: string, type: string}[] = [
      {
        name: 'count',
        baseName: 'count',
        type: 'number'
      },
      {
        name: 'capacity',
        baseName: 'capacity',
        type: 'number'
      }
    ];

    static getAttributeTypeMap () {
      return V1AggregatedPlayerStatus.attributeTypeMap
    }
}
