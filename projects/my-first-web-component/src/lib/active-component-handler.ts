export class ActiveComponentHandler {
  // private activeComponents = new Array<{
  //   component: HTMLElement | null
  //   mountedOnElement: string | null}>()

  private _component: HTMLElement | null = null
  get component(): HTMLElement | null {
    return this._component;
  }

  set component(value: HTMLElement | null) {
    if (this._component) {
      console.error('Active component already exists, for new component call destroy method, and create')
      return
    }

    this._component = value;
  }


  public mountedOnElement: string | null = null

  private constructor() {
  }

  public static default() {
    return new ActiveComponentHandler()
  }

  public destroy() {
    if (this._component && this.mountedOnElement) {
      const mountedOnElement = document.querySelector(this.mountedOnElement);
      mountedOnElement?.removeChild(this._component)

      this._component = null
      this.mountedOnElement = null
    } else {
      console.warn('destroy active component can not be performed!', this._component, this.mountedOnElement)
    }

  }
}
