import { CoreV1Api } from '@kubernetes/client-node';
import { ObjectSerializer } from '@kubernetes/client-node/dist/gen/model/models';
import { HttpError } from '@kubernetes/client-node/dist/gen/api/apis';
import localVarRequest = require('request');
import http = require('http');
import { V1GameServerAllocation } from './k8sclient/model/v1GameServerAllocation';

export class CustomCoreV1Api extends CoreV1Api {

    public async createGameServerAllocationFromFleetName (fleetName: string, pretty?: string, dryRun?: string, fieldManager?: string, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: http.IncomingMessage; body: V1GameServerAllocation;  }> {
        const gameAllocation = new V1GameServerAllocation(fleetName);
        return await this.createGameServerAllocation(gameAllocation, pretty, dryRun, fieldManager, options);
    }

    /**
     * create a GameServerAllocation
     * @param body
     * @param pretty If \&#39;true\&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     */
    public async createGameServerAllocation (body: V1GameServerAllocation, pretty?: string, dryRun?: string, fieldManager?: string, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: http.IncomingMessage; body: V1GameServerAllocation;  }> {
        const localVarPath = this.basePath + '/apis/allocation.agones.dev/v1/namespaces/default/gameserverallocations';
        const localVarQueryParameters: any = {};
        const localVarHeaderParams: any = (Object as any).assign({}, this._defaultHeaders);
        const produces = ['application/json', 'application/yaml', 'application/vnd.kubernetes.protobuf'];
        // give precedence to 'application/json'
        if (produces.indexOf('application/json') >= 0) {
            localVarHeaderParams.Accept = 'application/json';
        } else {
            localVarHeaderParams.Accept = produces.join(',');
        }
        const localVarFormParams: any = {};

        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createGameServerAllocation.');
        }

        if (pretty !== undefined) {
            localVarQueryParameters.pretty = ObjectSerializer.serialize(pretty, "string");
        }

        if (dryRun !== undefined) {
            localVarQueryParameters.dryRun = ObjectSerializer.serialize(dryRun, "string");
        }

        if (fieldManager !== undefined) {
            localVarQueryParameters.fieldManager = ObjectSerializer.serialize(fieldManager, "string");
        }

        (Object as any).assign(localVarHeaderParams, options.headers);

        const localVarUseFormData = false;

        const localVarRequestOptions: localVarRequest.Options = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(body, "V1GameServerAllocation")
        };

        let authenticationPromise = Promise.resolve();
        if (this.authentications.BearerToken.apiKey) {
            authenticationPromise = authenticationPromise.then(() => this.authentications.BearerToken.applyToRequest(localVarRequestOptions));
        }
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));

        let interceptorPromise = authenticationPromise;
        for (const interceptor of this.interceptors) {
            interceptorPromise = interceptorPromise.then(() => interceptor(localVarRequestOptions));
        }

        return interceptorPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    (localVarRequestOptions as any).formData = localVarFormParams;
                } else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise<{ response: http.IncomingMessage; body: V1GameServerAllocation;  }>((resolve, reject) => {
                // tslint:disable-next-line:no-shadowed-variable
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        body = ObjectSerializer.deserialize(body, "V1GameServerAllocation");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response, body });
                        } else {
                            reject(new HttpError(response, body, response.statusCode));
                        }
                    }
                });
            });
        });
    }

}