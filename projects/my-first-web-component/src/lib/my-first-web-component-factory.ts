import { MyFirstWebComponentCore } from "./my-first-web-component-core";

export async function MyFirstWebComponentFactory(): Promise<MyFirstWebComponentCore> {

  const core = new MyFirstWebComponentCore();
  return await core.initialize()
}
