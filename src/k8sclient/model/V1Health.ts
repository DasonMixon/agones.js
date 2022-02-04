export class V1Health {
    'disabled'?: boolean;
    'periodSeconds'?: number;
    'failureThreshold'?: number;
    'initialDelaySeconds'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: {name: string, baseName: string, type: string}[] = [
      {
        name: 'disabled',
        baseName: 'disabled',
        type: 'boolean'
      },
      {
        name: 'periodSeconds',
        baseName: 'periodSeconds',
        type: 'number'
      },
      {
        name: 'failureThreshold',
        baseName: 'failureThreshold',
        type: 'number'
      },
      {
        name: 'initialDelaySeconds',
        baseName: 'initialDelaySeconds',
        type: 'number'
      }
    ];

    static getAttributeTypeMap () {
      return V1Health.attributeTypeMap
    }
}
