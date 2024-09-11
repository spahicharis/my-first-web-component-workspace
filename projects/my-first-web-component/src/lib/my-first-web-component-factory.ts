import { MyFirstWebComponentCore } from "./my-first-web-component-core";

export async function MyFirstWebComponentFactory(options: any): Promise<MyFirstWebComponentCore> {

  const core = new MyFirstWebComponentCore(options);
  return await core.initialize()
}
