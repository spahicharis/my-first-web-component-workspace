import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from "@angular/elements";
import {
  COMPONENT_ELEMENT_NAME,
  MyFirstWebComponentComponent,
  MyFirstWebComponentCore,
  MyFirstWebComponentFactory
} from "my-first-web-component";

(async () => {

    const windowObjectSetup = () => {
      (window as any).myFirstWebComponentLib = {}; // Ensure cashlib object exists
      (window as any).myFirstWebComponentLib.factory = function (): Promise<MyFirstWebComponentCore> {
        return MyFirstWebComponentFactory()
      };

    }

    const app = await createApplication({
      providers: [],
    });

    const element = createCustomElement(MyFirstWebComponentComponent, {
      injector: app.injector,
    });

    customElements.get(COMPONENT_ELEMENT_NAME) || customElements.define(COMPONENT_ELEMENT_NAME, element);
    windowObjectSetup();
  }
)();
