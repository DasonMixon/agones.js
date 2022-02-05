import { V1LocalObjectReference, V1PodSpec, V1PodTemplateSpec, V1ResourceRequirements } from '@kubernetes/client-node'
import { V1ObjectMeta } from '@kubernetes/client-node/dist/gen/model/v1ObjectMeta'
import { V1FleetSpec } from './V1FleetSpec'
import { V1FleetStatus } from './V1FleetStatus'
import { V1GameServerSpec } from './V1GameServerSpec'
import { V1GameServerTemplateSpec } from './V1GameServerTemplateSpec'

export class V1Fleet {
    'apiVersion'?: string;
    'kind'?: string;
    'metadata'?: V1ObjectMeta;
    'spec'?: V1FleetSpec;
    'status'?: V1FleetStatus;

    constructor (name: string, replicas: number, image: string, cpu: string, memory: string, namespace: string) {
      this.apiVersion = 'agones.dev/v1'
      this.kind = 'Fleet'
      this.metadata = new V1ObjectMeta()
      this.metadata.name = name
      this.metadata.namespace = namespace
      this.spec = new V1FleetSpec()
      this.spec.replicas = replicas
      this.spec.template = new V1GameServerTemplateSpec()
      this.spec.template.spec = new V1GameServerSpec()

      const resources = new V1ResourceRequirements()
      resources.requests = {
        cpu,
        memory
      }
      resources.limits = {
        cpu,
        memory
      }

      this.spec.template.spec.ports = [
        {
          name: 'default',
          containerPort: 7654,
          protocol: 'TCP'
        }
      ]
      this.spec.template.spec.template = new V1PodTemplateSpec()
      this.spec.template.spec.template.spec = new V1PodSpec()
      this.spec.template.spec.template.spec.containers = [
        {
          name,
          image,
          resources
        }
      ]

      const pullSecrets = new V1LocalObjectReference()
      pullSecrets.name = 'regcred'
      this.spec.template.spec.template.spec.imagePullSecrets = [pullSecrets]
    }

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: {name: string, baseName: string, type: string}[] = [
      {
        name: 'apiVersion',
        baseName: 'apiVersion',
        type: 'string'
      },
      {
        name: 'kind',
        baseName: 'kind',
        type: 'string'
      },
      {
        name: 'metadata',
        baseName: 'metadata',
        type: 'V1ObjectMeta'
      },
      {
        name: 'spec',
        baseName: 'spec',
        type: 'V1FleetSpec'
      },
      {
        name: 'status',
        baseName: 'status',
        type: 'V1FleetStatus'
      }
    ];

    static getAttributeTypeMap () {
      return V1Fleet.attributeTypeMap
    }
}
