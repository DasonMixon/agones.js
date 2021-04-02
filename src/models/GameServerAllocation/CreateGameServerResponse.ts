export class CreateGameServerResponse {
    success: boolean;
    failureReason: string | null;
    address: string | null;
    port: string | null;

    constructor(success: boolean, failureReason: string | null, address: string | null, port: string | null) {
        this.success = success;
        this.failureReason = failureReason;
        this.address = address;
        this.port = port;
    }

    static success = (address: string, port: string) : CreateGameServerResponse => {
        return new CreateGameServerResponse(true, null, address, port);
    }

    static failure = (failureReason: string) : CreateGameServerResponse => {
        return new CreateGameServerResponse(false, failureReason, null, null);
    }
}