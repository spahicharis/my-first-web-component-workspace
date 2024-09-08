import { ActiveComponentHandler } from "./active-component-handler";

export const COMPONENT_ELEMENT_NAME = 'my-first-web-component'

function returnValueAndDeleteProperty<T>(target: any, key: string): T | null {
  const tmp = target[key];
  delete target[key]
  return tmp
}

export class MyFirstWebComponentCore {
  protected activeComponent: ActiveComponentHandler = ActiveComponentHandler.default()

  constructor() {
  }

  /*
  * Public methods
  */
  public async initialize(): Promise<this> {
    return this;
  }

  public create({config}: {
    config: any
  }): MyFirstWebComponentCore {
    this.createAndStoreHtmlElement(config)
    return this
  }

  protected createAndStoreHtmlElement(config: any): HTMLElement | null {

    const component = document.createElement(COMPONENT_ELEMENT_NAME)
    type ChangeListener = (state: any) => void;

    const onClickFn = returnValueAndDeleteProperty(config, "onClick") as ChangeListener;
    console.log('test::Embedded-fieldsCardCore:onClickFn:', onClickFn)
    if (onClickFn) {
      component.addEventListener('onClick', (event: any) => {
        onClickFn((event as CustomEvent)?.detail)
      });
    }

    const onErrorFn = returnValueAndDeleteProperty(config, "onError") as ChangeListener
    console.log('test::Embedded-fieldsCardCore:onErrorFn:', onErrorFn)
    if (onErrorFn) {
      component.addEventListener('onError', (event: any) => {
        console.log("test core onError:", event);
        onErrorFn((event as CustomEvent)?.detail)
      });
    }

    this.activeComponent.component = component
    return this.activeComponent.component
  }

  public mount(cssQuery: string) {
    const mountOnElement = document.querySelector(cssQuery);
    if (!mountOnElement) {
      console.error('Can not find element with selector:', cssQuery)
      return
    }

    if (this.activeComponent && this.activeComponent.component) {
      mountOnElement.appendChild(this.activeComponent.component)
      this.activeComponent.mountedOnElement = cssQuery
    } else {
      console.error('Before mount you have to create web component')
    }
  }

  public unmountActiveComponent() {
    this.activeComponent.destroy()
  }

  public componentData(): object {
    console.log('Core componentState:', (this.activeComponent.component as any), (this.activeComponent.component as any)?.componentData());
    return (this.activeComponent.component as any)?.componentData()
  }
}
