import { Injectable } from "@angular/core";

@Injectable()
export class Claims {
     Company: string = "http://rootssoftware.com/roots/data/company";
     Training: string = "http://rootssoftware.com/roots/data/training";
     Estimating: string = "http://rootssoftware.com/module/estimating";
     ProjectManagement: string = "http://rootssoftware.com/module/projectmanagement";
     Accounting: string = "http://rootssoftware.com/module/accounting";
     Contacts: string = "http://rootssoftware.com/module/contacts";
     Security: string = "http://rootssoftware.com/module/security";
     CanAccessMovies: string = "http://rootssoftware.com/development/mark/dev/canAccessMovies";
     CanAccessAnswers: string = "http://rootssoftware.com/development/mark/dev/canAccessAnswers";
}