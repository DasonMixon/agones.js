export class V1PlayersSpec {
    'initialCapacity'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: {name: string, baseName: string, type: string}[] = [
      {
        name: 'initialCapacity',
        baseName: 'initialCapacity',
        type: 'number'
      }
    ];

    static getAttributeTypeMap () {
      return V1PlayersSpec.attributeTypeMap
    }
}
