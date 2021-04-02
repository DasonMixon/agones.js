import { CustomCoreV1Api } from '../src/CustomCoreV1Api';
import { V1GameServerAllocation } from '../src/k8sclient/model/v1GameServerAllocation';
import { V1GameServerAllocationStatus } from '../src/k8sclient/model/V1GameServerAllocationStatus';
import AgonesManager from './../src/AgonesManager';

describe('requestGameServer', function () {

    const clientMock = {
        getApi: function () { }
    };

    let api: CustomCoreV1Api;
    let allocation: V1GameServerAllocation;
    let systemUnderTest: AgonesManager;

    beforeEach(function () {
        api = new CustomCoreV1Api();
        allocation = new V1GameServerAllocation();
        allocation.status = new V1GameServerAllocationStatus();
        systemUnderTest = new AgonesManager();

        spyOn(systemUnderTest, 'startClient').and.callThrough();
        spyOnProperty(systemUnderTest, 'client', 'get').and.returnValue(clientMock);
        spyOn<any>(clientMock, 'getApi' as any).and.returnValue(api);
    });

    it('Should resolve with address and port when server is allocated', async function () {
        allocation.status.state = 'Allocated';
        allocation.status.address = '1.2.3.4';
        allocation.status.ports = [ { port: '1337' } ];
        spyOn(api, 'createGameServerAllocationFromFleetName' as any)
            .and.returnValue(Promise.resolve({ body: allocation }));

        const result = await systemUnderTest.requestGameServer('test');
        expect(result.success).toBeTrue();
        expect(result.failureReason).toBeNull();
        expect(result.address).toBe('1.2.3.4');
        expect(result.port).toBe('1337');
    });

    it('Should resolve with failure reason when server is unallocated', async function () {
        allocation.status.state = 'Unallocated';
        spyOn(api, 'createGameServerAllocationFromFleetName' as any)
            .and.returnValue(Promise.resolve({ body: allocation }));

        const result = await systemUnderTest.requestGameServer('test');
        expect(result.success).toBeFalse();
        expect(result.failureReason).toBe('Unable to allocate game server');
        expect(result.address).toBeNull();
        expect(result.port).toBeNull();
    });

    it('Should resolve with failure reason when server state is unknown', async function () {
        allocation.status.state = 'something unexpected';
        spyOn(api, 'createGameServerAllocationFromFleetName' as any)
            .and.returnValue(Promise.resolve({ body: allocation }));

        const result = await systemUnderTest.requestGameServer('test');
        expect(result.success).toBeFalse();
        expect(result.failureReason).toBe('Unknown allocation state');
        expect(result.address).toBeNull();
        expect(result.port).toBeNull();
    });

    it('Should reject when allocation is also rejected', async function () {
        spyOn(api, 'createGameServerAllocationFromFleetName' as any)
            .and.rejectWith('unexpected error');

        let promiseRejected = false;
        try {
            await systemUnderTest.requestGameServer('test');
        } catch (err) {
            promiseRejected = true;
            expect(err).toBe('An unexpected error occurred allocating game server: unexpected error');
        }

        expect(promiseRejected).toBeTrue();
    });

    it('Should bubble up unexpected error', async function () {
        const error = new Error('unexpected error');
        spyOn(api, 'createGameServerAllocationFromFleetName' as any)
            .and.throwError(error);

        let promiseRejected = false;
        try {
            await systemUnderTest.requestGameServer('test');
        } catch (err) {
            promiseRejected = true;
            expect(err).toBe(error);
        }

        expect(promiseRejected).toBeTrue();
    });
});