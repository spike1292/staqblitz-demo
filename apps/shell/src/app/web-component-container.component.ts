import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mfe-web-component-container',
  template: '<div #container></div>',
})
export class WebComponentContainerComponent implements OnInit {
  @ViewChild('container', { static: true })
  container!: ElementRef;

  constructor(private readonly route: ActivatedRoute) {}

  async ngOnInit() {
    const { loadElement, elementName } = this.route.snapshot.data;

    await loadElement();

    const element = document.createElement(elementName);
    this.container.nativeElement?.appendChild(element);
  }
}
