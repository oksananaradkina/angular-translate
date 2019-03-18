
import { ElementRef, Renderer2 } from '@angular/core';
import { ITranslateService } from '@app/services/translate.service';
import { TTranslateLineEntity, IEntity } from '@app/types/trans';
import { ELineEvent, ISelectedLine } from './common';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, filter, switchMap } from 'rxjs/operators';


export abstract class TransContentAbstract {

  dom: HTMLElement;
  lines: Map<string, TTranslateLineEntity>;
  elements: Map<string, HTMLElement>;
  content: ElementRef;
  protected _selectedId: any;


  constructor(
    protected route: ActivatedRoute,
    protected service: ITranslateService,
    protected renderer: Renderer2
  ) { }

  ngOnInit() {

    this.clearLinkEvent(this.dom);

    Array.from(this.dom.childNodes)
      .reverse()
      .forEach((node: Node) => {
        this.renderer.appendChild(this.content.nativeElement, node);
      })
    this.elements = this.getTransElements();
    this.elements.forEach((node: HTMLElement, transId: string) => {
      node.textContent = this.lines.get(transId).content;
    })


  }

  initOriginalId() {
    this.route.paramMap
      .pipe(
        map((params: ParamMap) => params.get('originalId')),
        filter(Boolean)
      )
      .subscribe((originalId: string) => {
        this.service.completeOriginalId(originalId)
      })
  }




  clearLinkEvent(dom: HTMLElement) {
    Array.from(dom.getElementsByTagName('a')).forEach((link: HTMLElement) => {
      link.addEventListener('click', (event: MouseEvent) => {

        event.preventDefault();

      })
    })
  }

  getElement(id: string): HTMLElement {
    return this.content.nativeElement.querySelector('#' + id);
  }

  getTransElements(): Map<string, HTMLElement> {

    return Array.from(this.content.nativeElement.getElementsByTagName('trans'))
      .map((node: HTMLElement) => {
        return { id: node.id, node }
      }).
      reduce((acc: Map<string, HTMLElement>, { id, node }) => {
        acc.set(id, node);
        return acc;
      }, new Map())
  }

  debug(...args: any[]) {
    console.log(...args);
  }
}
