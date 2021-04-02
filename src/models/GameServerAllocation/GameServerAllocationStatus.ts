import { GameServerAllocationPort } from "./GameServerAllocationPort";

export class GameServerAllocationStatus {
    'address'?: string;
    'nodeName'?: string;
    'state'?: string;
    'gameServerName:'?: string;
    'ports'?: GameServerAllocationPort[];
}