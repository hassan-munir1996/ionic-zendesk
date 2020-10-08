import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ZendeskService } from 'src/app/services/zendesk.service';
import { AddCommentPage } from '../add-comment/add-comment.page';


@Component({
    selector: 'app-ticket-deatail',
    templateUrl: 'ticket-details.page.html',
    styleUrls: ['ticket-details.page.scss'],
})
export class TicketDetailsPage implements OnInit {

    ticket
    ticket_comments = []
    comment_authors = []

    constructor(public modalContoller: ModalController,
        navParams: NavParams,
        private _zendeskService: ZendeskService
    ) {
        this.ticket = navParams.get('ticket');
        console.log("ticket: ", this.ticket);
    }

    ngOnInit() {
        this.getTicketComments(this.ticket.id).then((data) => {
            this.ticket_comments = data.comments;
            this.comment_authors = data.users;
            for (var i = 0; i < this.ticket_comments.length; i++) {
                for (var j = 0; j < this.comment_authors.length; j++) {
                    // console.log(this.ticket_comments[i])
                    if (this.ticket_comments[i].author_id == this.comment_authors[j].id) {
                        this.ticket_comments[i]["author_details"] = this.comment_authors[j]
                    }
                }
            }
            console.log("ticket_comments: ", this.ticket_comments);
            console.log("comment_authors: ", this.comment_authors);
        })
    }

    closeModal() {
        this.modalContoller.dismiss(false);
    }

    async openAddCommentModal() {
        const modal = await this.modalContoller.create({
            component: AddCommentPage,
            cssClass: 'my-custom-class',
            componentProps: { ticket: this.ticket.id }
        });
        modal.onDidDismiss().then((fetch) => {
            console.log(fetch.data);
            if (fetch.data) {
                console.log("onDidDismiss-method");
                this.ticket_comments = []
                // this.showSkeleton = false;
                this.getTicketComments(this.ticket.id).then((data) => {
                    this.ticket_comments = data.comments;
                    this.comment_authors = data.users;
                    for (var i = 0; i < this.ticket_comments.length; i++) {
                        for (var j = 0; j < this.comment_authors.length; j++) {
                            // console.log(this.ticket_comments[i])
                            if (this.ticket_comments[i].author_id == this.comment_authors[j].id) {
                                this.ticket_comments[i]["author_details"] = this.comment_authors[j]
                            }
                        }
                    }
                    console.log("ticket_comments: ", this.ticket_comments);
                    console.log("comment_authors: ", this.comment_authors);
                })
            }
        })
        return await modal.present();
    }

    getTicketComments(ticketId): any {
        const promise = new Promise((resolve, reject) => {
            this._zendeskService.getTicketComments(ticketId).subscribe(
                data => {
                    resolve(data);
                },
                error => {
                    reject(error);
                }
            )
        })
        return promise;
    }
}
