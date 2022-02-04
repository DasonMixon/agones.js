export class V1PatchFleet {
    'op'?: string;
    'path'?: string;
    'value'?: any;

    constructor (op: string, path: string, value: any) {
      this.op = op
      this.path = path
      this.value = value
    }

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: {name: string, baseName: string, type: string}[] = [
      {
        name: 'op',
        baseName: 'op',
        type: 'string'
      },
      {
        name: 'path',
        baseName: 'path',
        type: 'string'
      },
      {
        name: 'value',
        baseName: 'value',
        type: 'any'
      }
    ];

    static getAttributeTypeMap () {
      return V1PatchFleet.attributeTypeMap
    }
}
