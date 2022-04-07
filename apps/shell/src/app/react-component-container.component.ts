import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

@Component({
  selector: 'mfe-react-component-container',
  templateUrl: './react-component-container.component.html',
})
export class ReactContainerComponent implements OnInit {
  @ViewChild('container', { static: true })
  container!: ElementRef;

  constructor(private readonly route: ActivatedRoute) {}

  async ngOnInit() {
    const { loadElement, rootUrl } = this.route.snapshot.data;
    const element = await loadElement();

    const reactELement = React.createElement(element.default, { rootUrl });
    ReactDOM.render(reactELement, this.container.nativeElement);
  }
}
