import {Component, OnInit} from '@angular/core';
import {DataService} from "../service/data.service";
import {interval, Observable} from "rxjs";
import {ResponseMM} from "../model/response.model";
import * as moment from "moment";
import {ChartData} from 'chart.js';
import {SpService} from "../service/sp.service";
import {environment} from "../../environments/environment";

@Component({
    selector: 'app-private',
    templateUrl: './private.component.html',
    styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {

    data: Observable<ResponseMM> | undefined

    constructor(private dataService: DataService, private spService: SpService) {
    }

    loadData() {
        this.data = this.dataService.getGeneralOverview()
    }

    ngOnInit(): void {
        this.loadData()
        interval(environment.refreshRate).subscribe(() => {
            console.log("RUN")
            this.loadData()
        })
    }

    getFirstKey(obj: any) {
        return Object.keys(obj)[0]
    }

    getValue(obj: any, key: any) {
        return obj[key]
    }

    getDateParsed(dateStr: any) {
        return moment(dateStr, "DDMMYYYYHHmmss").format('DD-MM-YYYY HH:mm:ss')
    }

    getCpuUsage(cpuUsage: any) {
        let charData: ChartData<'doughnut'> = {
            labels: ["% Used", "% Free"],
            datasets: [{data: [cpuUsage, (100 - cpuUsage)]}]
        }
        return charData;
    }

    getMemoryUsage(memTotal: any, memUsed: any) {
        let percMem = (memUsed * 100) / memTotal
        let charData: ChartData<'doughnut'> = {
            labels: ["% Used", "% Free"],
            datasets: [{data: [percMem, (100 - percMem)]}]
        }
        return charData;
    }

    getDisksUsage(disks: any) {
        let diskTotal = 0
        let diskUsed = 0

        disks.forEach((value: { _total: number; _used: number; }) => {
            diskTotal += value?._total
            diskUsed += value?._used
        })

        let percUsed = (diskUsed * 100) / diskTotal

        let charData: ChartData<'doughnut'> = {
            labels: ["% Used", "% Free"],
            datasets: [{data: [percUsed, (100 - percUsed)]}]
        }
        return charData;
    }

    sendActionService(hostname: any, idService: any, action: string) {
        this.spService.sendTransferService(hostname, idService, action).subscribe(resp => {
            console.log(resp)
        })
    }
}
