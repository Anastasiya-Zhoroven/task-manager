import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appContentEditable]'
})
export class ContentEditableDirective {

  constructor(private elementRef: ElementRef) { }

  @HostListener('click') onClick() {
    this.elementRef.nativeElement.setAttribute('contenteditable', 'true');
    this.elementRef.nativeElement.focus();
  }

  // @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
  //   // Allow editing when the element is focused
  //   debugger
  //   if (this.elementRef.nativeElement.isContentEditable) {
  //     // Allow Enter key to create a new line
  //     if (event.key === 'Enter') {
  //       event.preventDefault();
  //       document.execCommand('insertHTML', false, '<br><br>');
  //     }
  //   } else {
  //     event.preventDefault();
  //   }
  // }
}
