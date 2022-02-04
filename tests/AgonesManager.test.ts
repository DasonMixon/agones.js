import { CustomCoreV1Api } from '../src/CustomCoreV1Api';
import { V1GameServerAllocation } from '../src/k8sclient/model/V1GameServerAllocation';
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
        spyOn(api, 'createGameServerAllocation' as any)
            .and.returnValue(Promise.resolve({ body: allocation }));

        const result = await systemUnderTest.requestGameServerFromFleet('test', 'ns');
        expect(result.success).toBeTrue();
        expect(result.failureReason).toBeNull();
        expect(result.address).toBe('1.2.3.4');
        expect(result.port).toBe('1337');
    });

    it('Should resolve with failure reason when server is unallocated', async function () {
        allocation.status.state = 'Unallocated';
        spyOn(api, 'createGameServerAllocation' as any)
            .and.returnValue(Promise.resolve({ body: allocation }));

        const result = await systemUnderTest.requestGameServerFromFleet('test', 'ns');
        expect(result.success).toBeFalse();
        expect(result.failureReason).toBe('Unable to allocate game server');
        expect(result.address).toBeNull();
        expect(result.port).toBeNull();
    });

    it('Should resolve with failure reason when server state is unknown', async function () {
        allocation.status.state = 'something unexpected';
        spyOn(api, 'createGameServerAllocation' as any)
            .and.returnValue(Promise.resolve({ body: allocation }));

        const result = await systemUnderTest.requestGameServerFromFleet('test', 'ns');
        expect(result.success).toBeFalse();
        expect(result.failureReason).toBe('Unknown allocation state');
        expect(result.address).toBeNull();
        expect(result.port).toBeNull();
    });
});