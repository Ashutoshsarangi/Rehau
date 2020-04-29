import { Injectable } from '@angular/core';
import { globalHeader } from '../appConfig';


@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  manageHeader(url) {
    for (const value of globalHeader) {
      if (value.url === url) {
        return (value.headerObject);
      }
    }
  }

}
