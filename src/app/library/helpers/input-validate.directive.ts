import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[onlyDecimal]'
})
export class InputValidateDirective {

  // private regex: RegExp = new RegExp('^[0-9]*$');  // for int only
  private regex: RegExp = new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g); // for decimal

  private allowSpecialkey : Array<string> = ['Backspace','ArrowLeft','ArrowRight', 'Tab'];  // for allow specail key

  constructor(private el: ElementRef) {
    console.log('input validation directives');
  }

  /** it will fetch keyboard event when we enterd value in input field */
  @HostListener("keydown", ['$event']) onKeyDown(event: KeyboardEvent) {
    console.log('keydown', event.key);

    if(this.allowSpecialkey.indexOf(event.key) !== -1){
      return true;
    } // this allowspecialkey condition is for allowing some special key events like (backslash,arrowLeft,arrowRight)

    const inputVal : string = this.el.nativeElement.value.concat(event.key);
    console.log('inputVal', inputVal);
    if(inputVal && !String(inputVal).match(this.regex)){
      event.preventDefault();
    }

    return;
  }

  /** it will fetch event when we paste clipboard data in input field */
  @HostListener("paste", ['$event']) onPaste(event) {
    const clipBoardData = (event.originalEvent || event).clipBoardData.getData('text/plain');
    console.log('clipBoardData', clipBoardData);

    if(clipBoardData){
      const regEx = new RegExp('^[0-9]*$');
      console.log('regEx', regEx.test(clipBoardData));

      if(!regEx.test(clipBoardData)){
        event.preventDefault();
      }
    }
    return;
  }


}
