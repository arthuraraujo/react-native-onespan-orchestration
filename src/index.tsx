import { NativeModules, NativeEventEmitter } from 'react-native';

const { OnespanBridgeAndroid, OSSettingsModule, OSActivationModule } =
  NativeModules;

// const LINKING_ERROR =
//   `The package 'react-native-onespan-orchestration' doesn't seem to be linked. Make sure: \n\n` +
//   Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
//   '- You rebuilt the app after installing the package\n' +
//   '- You are not using Expo managed workflow\n';

// const OnespanOrchestration = NativeModules.OnespanOrchestration
//   ? NativeModules.OnespanOrchestration
//   : new Proxy(
//       {},
//       {
//         get() {
//           throw new Error(LINKING_ERROR);
//         },
//       }
//     );

// export function multiply(a: number, b: number): Promise<number> {
//   return OnespanOrchestration.multiply(a, b);
// }

export function setAccountIdentifier(a: string, b: string) {
  return OnespanBridgeAndroid.setAccountIdentifier(a, b);
}

export function startActivation(a: string, b: string) {
  return OnespanBridgeAndroid.startActivation(a, b);
}

export function eventEmitter() {
  return new NativeEventEmitter(OnespanBridgeAndroid);
}

// export function startActivation(a: string, b: string): void {
//   return OnespanOrchestration.startActivation(a, b);
// }

export function config(
  accountIdentifier: string,
  cloudServerUrl: string,
  saltStorage: string,
  saltDigipass: string
): Promise<string> {
  return OSSettingsModule.setSettings(
    accountIdentifier,
    cloudServerUrl,
    saltStorage,
    saltDigipass
  );
}

export function activate(
  userIdentifier: string,
  activationPassword: string
): Promise<string> {
  return OSActivationModule.activate(userIdentifier, activationPassword);
}

export function execute(command: string): Promise<string> {
  return OSActivationModule.execute(command);
}
