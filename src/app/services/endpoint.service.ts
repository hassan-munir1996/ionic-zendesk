import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EndpointService {
    constructor() {
    }

    BASE_URL = 'https://cinnova4240.zendesk.com/api/v2/';

    getAllTickets = this.BASE_URL + 'requests.json';
    createTicket = this.BASE_URL + 'requests';
    getSingleTicket = this.BASE_URL + 'requests/';
    getTicketComments = this.BASE_URL + 'requests/';
    addComment = this.BASE_URL + 'requests/';

}
