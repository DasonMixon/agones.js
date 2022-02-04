export class V1SdkServer {
    'logLevel'?: string;
    'grpcPort'?: number;
    'httpPort'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: {name: string, baseName: string, type: string}[] = [
      {
        name: 'logLevel',
        baseName: 'logLevel',
        type: 'string'
      },
      {
        name: 'grpcPort',
        baseName: 'grpcPort',
        type: 'number'
      },
      {
        name: 'httpPort',
        baseName: 'httpPort',
        type: 'number'
      }
    ];

    static getAttributeTypeMap () {
      return V1SdkServer.attributeTypeMap
    }
}
