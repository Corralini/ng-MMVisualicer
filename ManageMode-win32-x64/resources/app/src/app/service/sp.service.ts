import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ResponseMM} from "../model/response.model";
import {NetworkService} from "./network.service";

@Injectable({
    providedIn: 'root'
})
export class SpService {

    constructor(private networkService: NetworkService) {
    }

    sendTransferService(serverName: string, id: string, action: string): Observable<ResponseMM> {
        let data = {
            type: "service",
            id: id,
            action: action
        }
        console.log(serverName, data)
        return this.networkService.sendRequest("6500r7NLlhI7CWZ4", "instruction", serverName, data)
    }

    sendTransferProcess(serverName: string, id: string): Observable<ResponseMM> {
        let data = {
            type: "process",
            id: id
        }
        return this.networkService.sendRequest("6500r7NLlhI7CWZ4", "instruction", serverName, data)
    }

}
