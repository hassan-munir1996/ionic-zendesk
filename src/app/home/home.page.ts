import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { ModalController } from '@ionic/angular';
import { CreateRequestPage } from '../components/create-request/create-request.page';
import { TicketDetailsPage } from '../components/ticket-details/ticket-details.page';
import { LoadingService } from '../services/loading.service';
import { ZendeskService } from '../services/zendesk.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  tickets
  totalTickets
  ticketObj
  showSkeleton = false

  constructor(
    private _zendeskService: ZendeskService,
    public modalController: ModalController,
    private loadingService: LoadingService
  ) { }


  ngOnInit() {
    this.getAllTickets().catch(err => {
      console.log(err);
    })
  }

  getAllTickets() {
    const promise = new Promise((resolve, reject) => {
      this._zendeskService.getAllTickets().subscribe(
        data => {
          this.showSkeleton = true;
          this.tickets = data.requests;
          this.totalTickets = data.count;
          console.log("count: ", this.totalTickets);
          console.log("tickets: ", this.tickets);
          resolve();
        },
        error => {
          reject(error);
        }
      )
    })
    return promise;
  }

  getSingleTicket(ticketId) {
    const promise = new Promise((resolve, reject) => {
      this._zendeskService.getSingleTicket(ticketId).subscribe(
        data => {
          this.ticketObj = data.request;
          resolve(this.ticketObj);
        },
        error => {
          reject(error);
        }
      )
    })
    return promise;
  }

  doRefresh(event) {
    this.tickets = []
    this.showSkeleton = false;
    console.log('Begin async operation');
    this.getAllTickets().then(() => {
      console.log('Data Fetched');
      event.target.complete();
    })
  }

  async openRequestModal() {
    console.log("openRequestModal-method");
    const modal = await this.modalController.create({
      component: CreateRequestPage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss().then((fetch) => {
      console.log(fetch.data);
      if (fetch.data) {
        console.log("onDidDismiss-method");
        this.tickets = []
        this.showSkeleton = false;
        this.getAllTickets();
      }
    })
    return await modal.present();
  }

  getTicketDetail(ticketId) {
    this.loadingService.showLoader();
    console.log("ticket: ", ticketId);
    this.getSingleTicket(ticketId).then((data) => {
      this.loadingService.hideLoader();
      console.log("fetched_ticket: ", data);
      this.openTicketDetailModal();
    });
  }

  async openTicketDetailModal() {
    console.log("openTicketDetailModal-method");
    const modal = await this.modalController.create({
      component: TicketDetailsPage,
      cssClass: 'my-custom-class',
      componentProps: { ticket:  this.ticketObj}
    });
    return await modal.present();
  }


}
