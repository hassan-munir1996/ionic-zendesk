import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';
import { ZendeskService } from 'src/app/services/zendesk.service';

@Component({
    selector: 'app-add-comment',
    templateUrl: 'add-comment.page.html',
    styleUrls: ['add-comment.page.scss'],
})
export class AddCommentPage implements OnInit {

    comment
    ticketId
    showSpinner = false;

    constructor(public modalContoller: ModalController,
        private loadingService: LoadingService,
        private _zendeskService: ZendeskService,
        navParams: NavParams,
    ) {
        this.ticketId = navParams.get('ticket');
        console.log("ticket: ", this.ticketId);
     }

    ngOnInit() {
    }

    closeModal() {
        this.modalContoller.dismiss(false);
    }


    addComment(ticketID) {
        const reqO = {
            "request": 
            {
                "comment": 
                {
                    "body": this.comment
                }
            }
        }
        console.log(reqO);
        const promise = new Promise((resolve, reject) => {
            this._zendeskService.addComment(ticketID, reqO).subscribe(
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

    add() {
        this.loadingService.showLoader();
        this.addComment(this.ticketId).then((data) => {
            this.loadingService.hideLoader();
            this.modalContoller.dismiss(true);
        }
        ).catch((err) => {
            console.log(err);
        }

        )
    }

}
