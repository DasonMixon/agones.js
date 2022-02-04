export class V1PlayerStatus {
    'count'?: number;
    'capacity'?: number;
    'ids'?: string[];

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
      },
      {
        name: 'ids',
        baseName: 'ids',
        type: 'Array<string>'
      }
    ];

    static getAttributeTypeMap () {
      return V1PlayerStatus.attributeTypeMap
    }
}
