import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from "@angular/elements";
import {
  COMPONENT_ELEMENT_NAME,
  MyFirstWebComponentComponent,
  MyFirstWebComponentCore,
  MyFirstWebComponentFactory
} from "my-first-web-component";
import { MyFirstWebComponentService } from "my-first-web-component";
import { NgZone } from "@angular/core";
import { provideHttpClient } from "@angular/common/http";

(async () => {

    const windowObjectSetup = () => {
      (window as any).myFirstWebComponentLib = {}; // Ensure cashlib object exists
      (window as any).myFirstWebComponentLib.factory = function (): Promise<MyFirstWebComponentCore> {
        return MyFirstWebComponentFactory({})
      };

    }

    const app = await createApplication({
      providers: [
        provideHttpClient(),
        // (globalThis as any).ngZone ? { provide: NgZone, useValue: (globalThis as any).ngZone } : [],
        MyFirstWebComponentService
      ],
    });

    const element = createCustomElement(MyFirstWebComponentComponent, {
      injector: app.injector,
    });

    customElements.get(COMPONENT_ELEMENT_NAME) || customElements.define(COMPONENT_ELEMENT_NAME, element);
    windowObjectSetup();
  }
)();
