import { Component, Injector } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  COMPONENT_ELEMENT_NAME,
  MyFirstWebComponentComponent,
  MyFirstWebComponentCore,
  MyFirstWebComponentFactory
} from "@my-first-web-component";
import { MyFirstWebComponentConfig } from "../../projects/my-first-web-component/src/lib/my-first-web-component-config";
import { createCustomElement } from "@angular/elements";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-first-web-component-workspace';

  private myFirstWebComponentCore?: MyFirstWebComponentCore;

  constructor(
    private readonly injector: Injector
  ) {
    this.windowObjectSetup();
    this.defineCustomWebComponent()

    // prefetchData((sessionId?: string) => {
    // console.log('PrefetchData:', sessionId)
    this.initMyFirstWebComponent(/*sessionId ??*/ 'not defined')
      .then(console.log)
    // })
  }

  private windowObjectSetup() {
    (window as any).myFirstWebComponentLib = {}; // Ensure cashlib object exists
    (window as any).myFirstWebComponentLib.factory = function (): Promise<MyFirstWebComponentCore> {
      return MyFirstWebComponentFactory()
    };

  }

  private async initMyFirstWebComponent(sessionId: string) {
    let myFirstWebComponentCoreOptions = {};
    this.myFirstWebComponentCore = await (window as any).myFirstWebComponentLib.factory(myFirstWebComponentCoreOptions);
    const options: MyFirstWebComponentConfig = {
      onClick: (state: any) => {
        console.log('onClick:', state)
      },
      onError: (state: any) => {
        console.log('onError:', state)
      }
    };

    this.myFirstWebComponentCore?.create({config: options})
      .mount("#my-first-web-component");

    console.log('MyFirstWebComponentCore:', this.myFirstWebComponentCore)
  }

  readonly defineCustomWebComponent = () => {
    const el = createCustomElement(MyFirstWebComponentComponent, {injector: this.injector});
    customElements.define(COMPONENT_ELEMENT_NAME, el);
  }
}
