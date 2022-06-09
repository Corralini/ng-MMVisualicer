import {Injectable} from '@angular/core';
import {NetworkService} from "./network.service";
import {Observable} from "rxjs";
import {ResponseMM} from "../model/response.model";

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private networkService: NetworkService) {
    }

    getDetail(serverName: string) {
        return this.networkService.sendRequest("6500r7NLlhI7CWZ4", "detailed", serverName)
    }

    getGeneralOverview(): Observable<ResponseMM> {
        return this.networkService.sendRequest("6500r7NLlhI7CWZ4")
    }

}
