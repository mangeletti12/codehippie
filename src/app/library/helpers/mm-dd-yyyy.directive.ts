import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: '[mkaDateMask]'
})
export class DateMaskDirective {
  public inputElement: HTMLInputElement;

  constructor(private readonly elementRef: ElementRef<HTMLInputElement>) {
    this.inputElement = elementRef.nativeElement;
  }

  /** it will fetch keyboard event when we enterd value in input field */
  @HostListener('input', ['$event'])
  @HostListener('blur', ['$event'])
  private onInputChange(event: any): void {

    let pos = this.inputElement.selectionStart;
    const initialInput = this.inputElement.value;
    // console.log('initialInput', initialInput);
    let filteredInput = DateMaskDirective.filter(initialInput);
    // console.log('filteredInput', filteredInput);

    // paste bug
    // 13/33/2033

    if (typeof initialInput !== 'string') {
      return;
    }

    if (initialInput === filteredInput) {
      return;
    }

    // adjust cursor position
    pos += filteredInput.length - initialInput.length;
    pos = (pos >= 0) ? pos : 0;
    console.log('pos', pos);

    this.inputElement.value = filteredInput;
    this.elementRef.nativeElement.setSelectionRange(pos, pos, 'none');

    return;
  }


  private static filter(input: string): string {
    if (!input) {
      return input;
    }

    // remove anything that isn't a number or a slash
    let filteredInput= input.replace(/[^\d\/]/g, '');

    // remove any slash preceded by a slash
    filteredInput = filteredInput.replace(/(\/)(\/)/g, '$1');

    // remove any leading slash
    filteredInput = filteredInput.replace(/^\//, '');

    // restrict to only 2 slashes
    filteredInput = filteredInput.replace(/(\/\d*\/\d*)(\/)/g, '$1');


    // prevent 00 month input and prevent slash on 0
    filteredInput = filteredInput.replace(/(^0)(0|\/)/, '$1');

    // auto insert / inbetween month and day
    filteredInput = filteredInput.replace(/^(1[0-2]|0?[2-9]|1(?=[3-9])|01)(\d)/, '$1/$2');

    // prevent 00 day input and prevent slash on 0
    filteredInput = filteredInput.replace(/(^\d*\/0)(0|\/)/, '$1');

    // auto insert / inbetween day and year
    filteredInput = filteredInput.replace(/(^\d*\/)(3[0-1]|[0-2]\d|[4-9]|3(?=[2-9]))(\d)/, '$1$2/$3');

    // prevent more then 4 numbers for year
    filteredInput = filteredInput.replace(/(^\d*\/\d*\/\d{4})(\d)/, '$1');

    return filteredInput;
  }

  @HostListener('keydown.delete', ['$event'])
  @HostListener('keydown.backspace', ['$event'])
  private onKeyDown(event: KeyboardEvent): void {
    let pos: number = this.inputElement.selectionStart;
    const inputValue: string = this.inputElement.value;
    const overflowCheck: boolean = 0 <= pos && inputValue.length > pos;
    const isDelete: boolean = event.key === 'Delete';
    console.log('onKeyDown', isDelete, overflowCheck);

    if (overflowCheck && inputValue[pos + (isDelete ? 0 : -1)] === '/') {
      pos += (isDelete) ? 1 : -1;
      this.elementRef.nativeElement.setSelectionRange(pos, pos, 'none');
      event.preventDefault();
    }

  }


}
