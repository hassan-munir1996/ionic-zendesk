import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';


@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    constructor(
        public loadingController: LoadingController
    ) {
    }

    async showLoader() {
        const loading = await this.loadingController.create({
            cssClass: 'custom-loader-class',
            message: 'Please wait...',
            showBackdrop: false,
            translucent: true,
            animated: true
        });
        await loading.present();

    }

    hideLoader() {
        this.loadingController.dismiss();
    }

}
