export class V1GameServerPort {
    'name'?: string;
    'portPolicy'?: string;
    'container'?: string;
    'containerPort'?: number;
    'hostPort'?: number;
    'protocol'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: {name: string, baseName: string, type: string}[] = [
      {
        name: 'name',
        baseName: 'name',
        type: 'string'
      },
      {
        name: 'portPolicy',
        baseName: 'portPolicy',
        type: 'string'
      },
      {
        name: 'container',
        baseName: 'container',
        type: 'string'
      },
      {
        name: 'containerPort',
        baseName: 'containerPort',
        type: 'number'
      },
      {
        name: 'hostPort',
        baseName: 'hostPort',
        type: 'number'
      },
      {
        name: 'protocol',
        baseName: 'protocol',
        type: 'string'
      }
    ];

    static getAttributeTypeMap () {
      return V1GameServerPort.attributeTypeMap
    }
}
