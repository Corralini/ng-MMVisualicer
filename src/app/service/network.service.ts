import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {RequestMM} from "../model/request.model";
import {ResponseMM} from "../model/response.model";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class NetworkService {

    private requestMM: RequestMM

    constructor(private httpClient: HttpClient) {
        this.requestMM = {}
    }

    sendRequest(userID: string, param: string="", servername?: string, data?: any) {
        this.requestMM.userId = userID
        this.requestMM.serverName = servername
        this.requestMM.data = data
        return this.httpClient.post<ResponseMM>(`${environment.ipCore}${param}`, this.requestMM, httpOptions)
    }
}
