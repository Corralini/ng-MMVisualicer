import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ResponseMM} from "../../model/response.model";
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../service/data.service";
import * as moment from "moment";
import {ChartData} from "chart.js";
import {SpService} from "../../service/sp.service";


@Component({
    selector: 'app-detail',
    templateUrl: 'detail.component.html',
    styleUrls: [
        'detail.component.css'
    ]
})
export class DetailComponent implements OnInit {

    public data: Observable<ResponseMM> | undefined
    public hostName: string = ""
    public serviceSearch: string = ""
    public processSearch: string = ""

    constructor(private route: ActivatedRoute, private dataService: DataService, private spService: SpService) {
    }

    loadData() {
        this.hostName = this.route.snapshot.params['serverName']
        this.data = this.dataService.getDetail(this.hostName)
    }

    searchServices(searchItems: any[]): any[] {
        return searchItems.filter(value => {
                console.log(this.serviceSearch)
                if (this.serviceSearch != "") {
                    return value?._display_name.toLowerCase().includes(this.serviceSearch.toLowerCase())
                } else {
                    return value
                }

            }
        )
    }

    searchProcesses(searchItems: any[]): any[] {
        return searchItems.filter(value => {

                if (this.processSearch != "") {
                    return value?._name.toLowerCase().includes(this.processSearch.toLowerCase())
                } else {
                    return value
                }

            }
        )
    }


    ngOnInit(): void {
        this.loadData()
        // interval(environment.refreshRate).subscribe(() => {
        //     console.log("RUN")
        //     this.loadData()
        // })
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

    getPercUsage(memTotal: any, memUsed: any) {
        console.log(memTotal, memUsed)
        let percMem = (memUsed * 100) / memTotal
        return {
            labels: ["% Used", "% Free"],
            datasets: [{data: [percMem, (100 - percMem)]}]
        };
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

    getDiskValues(disk: any) {
        let diskFree: number = this.getGiB(disk._free)
        let diskUsed: number = this.getGiB(disk._used)
        return {
            labels: ["GiB Used", "GiB Free"],
            datasets: [{data: [diskUsed.toFixed(3), diskFree.toFixed(3)]}]
        }
    }

    getGiB(value: any) {
        return +value * 0.000000000931323
    }

    sendActionProcess(idProcess: any) {
        this.spService.sendTransferProcess(this.hostName, idProcess).subscribe(resp => {
            console.log(resp)
        })
    }

    sendActionService(idService: any, action: string) {
        this.spService.sendTransferService(this.hostName, idService, action).subscribe(resp => {
            console.log(resp)
        })
    }

}
