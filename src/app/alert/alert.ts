export class Alert {
    type: AlertType;
    message: string;
    transIn: boolean = false;
    transOut: boolean = false;
}
 
export enum AlertType {
    Success,
    Error,
    Info,
    Warning,

}