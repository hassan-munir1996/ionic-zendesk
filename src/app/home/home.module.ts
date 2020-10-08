import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { CreateRequestPage } from '../components/create-request/create-request.page';
import { ZendeskService } from '../services/zendesk.service';
import { EndpointService } from '../services/endpoint.service';
import { LoadingService } from '../services/loading.service';
import { TicketDetailsPage } from '../components/ticket-details/ticket-details.page';
import { AddCommentPage } from '../components/add-comment/add-comment.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    CreateRequestPage,
    TicketDetailsPage,
    AddCommentPage
  ],
  providers: [
    ZendeskService,
    EndpointService,
    LoadingService
  ]
})
export class HomePageModule {}
