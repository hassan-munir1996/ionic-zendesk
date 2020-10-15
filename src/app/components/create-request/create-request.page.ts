import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';
import { ZendeskService } from 'src/app/services/zendesk.service';

@Component({
    selector: 'app-create-request',
    templateUrl: 'create-request.page.html',
    styleUrls: ['create-request.page.scss'],
})
export class CreateRequestPage implements OnInit {

    name
    email
    subject
    description
    showSpinner = false;

    constructor(public modalContoller: ModalController,
        private loadingService: LoadingService,
        private _zendeskService: ZendeskService
    ) { }

    ngOnInit() {
    }

    closeModal() {
        this.modalContoller.dismiss(false);
    }


    createTicket() {
        const reqO = {
            "request": {
                "requester": {
                    "name": this.name,
                    // "email": 'hassan.munir1996@gmail.com'
                    "email": 'cinnova@bezl.io'
                },
                "subject": this.subject,
                "comment": { "body": this.description }
            }
        }
        console.log(reqO);
        const promise = new Promise((resolve, reject) => {
            this._zendeskService.createTicket(reqO).subscribe(
                data => {
                    console.log(data);
                    resolve();
                },
                error => {
                    reject(error);
                }
            )
            setTimeout(() => {
                resolve()
            }, 4000);
        });
        return promise;

    }

    create() {
        this.loadingService.showLoader();
        this.createTicket().then((data) => {
            this.loadingService.hideLoader();
            this.modalContoller.dismiss(true);

        }
        ).catch((err) => {
            console.log(err);
        }

        )
    }

}
