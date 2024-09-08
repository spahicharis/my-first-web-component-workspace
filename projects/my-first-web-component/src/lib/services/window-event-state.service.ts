import {fromEvent, Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "platform"
})
export class WindowEventStateService {
  public get listenWindowEvents(): Observable<MessageEvent> {
    return fromEvent<MessageEvent>(window, 'message')
  }
}
