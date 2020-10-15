import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { ZendeskAuthInterceptor } from './zendesk-auth-interceptor'

export const zendeskInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: ZendeskAuthInterceptor, multi: true}
]