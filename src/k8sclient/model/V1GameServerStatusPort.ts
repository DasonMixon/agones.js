export class V1GameServerStatusPort {
    'name'?: string;
    'port'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: {name: string, baseName: string, type: string}[] = [
      {
        name: 'name',
        baseName: 'name',
        type: 'string'
      },
      {
        name: 'port',
        baseName: 'port',
        type: 'number'
      }
    ];

    static getAttributeTypeMap () {
      return V1GameServerStatusPort.attributeTypeMap
    }
}
