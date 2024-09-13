import { MyFirstWebComponentCoreOptions } from "./models";

export interface SerializedMyFirstWebComponentFactoryOptions {
  environment: string;
  baseUrl: string;
}

export function voucherOptionsSerialization(componentCoreOptions: MyFirstWebComponentCoreOptions): SerializedMyFirstWebComponentFactoryOptions {
  console.log('voucherOptionsSerialization:', componentCoreOptions);
  console.log('voucherOptionsSerialization: env', componentCoreOptions.baseUrl);
  return {
    environment: componentCoreOptions.environment,
    baseUrl: componentCoreOptions.baseUrl
  }
}
