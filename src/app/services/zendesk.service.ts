import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tick } from '@angular/core/testing';
import { EndpointService } from './endpoint.service';

@Injectable({
    providedIn: 'root'
})
export class ZendeskService {
    constructor(
        private _endpointService: EndpointService,
        private http: HttpClient
    ) {
    }

    getAllTickets(): any {
        // const headerDict = {
        //     'Content-Type': 'application/json',
        //     'Access-Control-Allow-Origin': '*',
        //     'Authorization': 'Basic Y2lubm92YUBiZXpsLmlvL3Rva2VuOnZ4clVBUVZiZ2FPVjFBcHUxdlpoSXFNMlFXcmtPdFdKcEU4SFpjY2Q='
        // }
        // const requestOptions = {
        //     headers: new HttpHeaders(headerDict)
        // };
        let url = this._endpointService.getAllTickets;
        console.log("getAllTickets req:", url);
        return this.http.get(url);
    }

    createTicket(ticket): any {
        const headerDict = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Basic Y2lubm92YUBiZXpsLmlvL3Rva2VuOnZ4clVBUVZiZ2FPVjFBcHUxdlpoSXFNMlFXcmtPdFdKcEU4SFpjY2Q='
        }
        const requestOptions = {
            headers: new HttpHeaders(headerDict)
        };
        let url = this._endpointService.createTicket;
        return this.http.post(url, ticket, requestOptions);
    }

    getSingleTicket(ticketId): any {
        const headerDict = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Basic Y2lubm92YUBiZXpsLmlvL3Rva2VuOnZ4clVBUVZiZ2FPVjFBcHUxdlpoSXFNMlFXcmtPdFdKcEU4SFpjY2Q='
        }
        const requestOptions = {
            headers: new HttpHeaders(headerDict)
        };
        let url = this._endpointService.getSingleTicket;
        return this.http.get(url + ticketId, requestOptions);

    }

    getTicketComments(ticketId): any {
        const headerDict = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Basic Y2lubm92YUBiZXpsLmlvL3Rva2VuOnZ4clVBUVZiZ2FPVjFBcHUxdlpoSXFNMlFXcmtPdFdKcEU4SFpjY2Q='
        }
        const requestOptions = {
            headers: new HttpHeaders(headerDict)
        };
        let url = this._endpointService.getTicketComments;
        return this.http.get(url + ticketId + '/comments.json', requestOptions);
    }

    addComment(ticket, reqO): any {
        const headerDict = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Basic Y2lubm92YUBiZXpsLmlvL3Rva2VuOnZ4clVBUVZiZ2FPVjFBcHUxdlpoSXFNMlFXcmtPdFdKcEU4SFpjY2Q='
        }
        const requestOptions = {
            headers: new HttpHeaders(headerDict)
        };
        let url = this._endpointService.addComment;
        console.log(url);
        console.log(reqO);
        return this.http.put(url + ticket, reqO, requestOptions);
    }


}
