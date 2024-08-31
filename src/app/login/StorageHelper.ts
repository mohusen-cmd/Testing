import { Injectable } from '@angular/core';

@Injectable(
    {
        providedIn:'root',  
    }
)

export class StorageHelper {
  
    constructor() {
         
    }
  GetUserNameFromLocalStorage()
  {
     return localStorage.getItem("UserName");
  }
  GetUserIdFromLocalStorage()
  {
     return localStorage.getItem("Userid");
  }
  GetEmailIdFromLocalStorage()
  {
     return localStorage.getItem("Email");
  }
  
}
