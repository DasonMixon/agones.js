import { CoreV1Api, PatchUtils } from '@kubernetes/client-node';
import { ObjectSerializer } from '@kubernetes/client-node/dist/gen/model/models';
import { HttpError } from '@kubernetes/client-node/dist/gen/api/apis';
import localVarRequest = require('request');
import http = require('http');
import { V1GameServerAllocation } from './k8sclient/model/V1GameServerAllocation';
import { V1GetFleetsResponse } from './k8sclient/model/V1GetFleetsResponse';
import { V1Fleet } from './k8sclient/model/V1Fleet';
import { V1PatchFleet } from './k8sclient/model/V1PatchFleet';
import { V1GameServer } from './k8sclient/model/V1GameServer';

export class CustomCoreV1Api extends CoreV1Api {

    public async getFleets (namespace?: string): Promise<{ response: http.IncomingMessage; body: V1GetFleetsResponse; }> {
        const url = namespace ? `/apis/agones.dev/v1/namespaces/${namespace}/fleets` : '/apis/agones.dev/v1/fleets'
        const request = this.buildRequest(url, null, 'Object', 'GET')
        return this.executeRequest(request, 'V1GetFleetsResponse')
    }

    public async createFleet (body: V1Fleet): Promise<{ response: http.IncomingMessage; body: V1Fleet; }> {
        const request = this.buildRequest(`/apis/agones.dev/v1/namespaces/${body.metadata!.namespace}/fleets`, body, 'V1Fleet', 'POST')
        return this.executeRequest(request, 'V1Fleet')
    }
    
    public async patchFleet (patches: V1PatchFleet[], fleetName: string, namespace: string): Promise<{ response: http.IncomingMessage; body: V1Fleet; }> {
        const request = this.buildRequest(`/apis/agones.dev/v1/namespaces/${namespace}/fleets/` + fleetName, patches, 'Array<V1PatchFleet>', 'PATCH')
        return this.executeRequest(request, 'V1Fleet')
    }
    
    public async deleteFleet (fleetName: string, namespace: string): Promise<{ response: http.IncomingMessage; body: V1Fleet; }> {
        const request = this.buildRequest(`/apis/agones.dev/v1/namespaces/${namespace}/fleets/` + fleetName, {}, 'Object', 'DELETE')
        return this.executeRequest(request, 'V1Fleet')
    }

    public async getGameServers (namespace?: string): Promise<{ response: http.IncomingMessage; body: V1GameServer[]; }> {
        const url = namespace ? `/apis/agones.dev/v1/namespaces/${namespace}/gameservers` : '/apis/agones.dev/v1/gameservers'
        const request = this.buildRequest(url, null, 'Object', 'GET')
        return this.executeRequest(request, 'Array<V1GameServer>')
    }

    // TODO: getFleetAutoscalers / getGameServerAllocations ?

    public async createGameServerAllocation (fleetName: string, namespace: string) : Promise<{ response: http.IncomingMessage; body: V1GameServerAllocation; }> {
        const gameAllocation = new V1GameServerAllocation(fleetName, namespace);
        const request = this.buildRequest(`/apis/allocation.agones.dev/v1/namespaces/${namespace}/gameserverallocations`, gameAllocation, 'V1GameServerAllocation', 'POST')
        return this.executeRequest(request, 'V1GameServerAllocation')
    }
    
    private executeRequest<ResponseType> (request: localVarRequest.Options, responseDeserializedType: string): Promise<{ response: http.IncomingMessage; body: ResponseType; }> {
        let authenticationPromise = Promise.resolve()
        if (this.authentications.BearerToken.apiKey) {
            authenticationPromise = authenticationPromise.then(() => this.authentications.BearerToken.applyToRequest(request))
        }
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(request))
    
        let interceptorPromise = authenticationPromise
        for (const interceptor of this.interceptors) {
            interceptorPromise = interceptorPromise.then(() => interceptor(request))
        }
    
        return interceptorPromise.then(() => {
            return new Promise<{ response: http.IncomingMessage; body: ResponseType; }>((resolve, reject) => {
                // tslint:disable-next-line:no-shadowed-variable
                localVarRequest(request, (error, response, body) => {
                    if (error) {
                        reject(error)
                    } else {
                        body = ObjectSerializer.deserialize(body, responseDeserializedType)
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response, body })
                        } else {
                            reject(new HttpError(response, body, response.statusCode))
                        }
                    }
                })
            })
        })
    }
    
    private buildRequest (path: string, body: any, bodySerializedType: string, method: string): localVarRequest.Options {
        const localVarPath = this.basePath + path
        const localVarQueryParameters: any = {}
        const localVarHeaderParams: any = (Object as any).assign({}, this._defaultHeaders)
        const produces = ['application/json', 'application/yaml', 'application/vnd.kubernetes.protobuf']
        // give precedence to 'application/json'
        if (produces.indexOf('application/json') >= 0) {
            localVarHeaderParams.Accept = 'application/json'
        } else {
            localVarHeaderParams.Accept = produces.join(',')
        }
        if (method.toUpperCase() === 'PATCH') {
            localVarHeaderParams['Content-type'] = PatchUtils.PATCH_FORMAT_JSON_PATCH
        }
    
        // verify required parameter 'body' is not null or undefined for non-GET types
        if (method.toUpperCase() !== 'GET' && (body === null || body === undefined)) {
            throw new Error('Required parameter body was null or undefined when calling buildRequest for non-GET request.')
        }
    
        const localVarRequestOptions: localVarRequest.Options = {
            method: method.toUpperCase(),
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(body, bodySerializedType)
        }
    
        return localVarRequestOptions
    }
}