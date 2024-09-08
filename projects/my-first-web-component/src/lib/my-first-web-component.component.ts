import { AfterViewInit, Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subscription } from "rxjs";
import { WindowEventStateService } from "./services/window-event-state.service";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { InputTextModule } from "primeng/inputtext";
import { Button } from "primeng/button";

@Component({
  selector: 'lib-my-first-web-component',
  standalone: true,
  imports: [
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    Button
  ],
  template: `
    <p>
      my-first-web-component works!
    </p>

    <p-iconField iconPosition="left">
      <p-inputIcon styleClass="pi pi-search"/>
      <input type="text" pInputText placeholder="Search"/>
    </p-iconField>

    <p-button label="Click" (onClick)="sendMessage()"/>
  `,
  styles: `
  `
})
export class MyFirstWebComponentComponent implements AfterViewInit, OnDestroy {
  protected readonly subscriptions: Subscription[] = []

  @Output() onClick = new EventEmitter();

  constructor(
    public readonly windowEventState: WindowEventStateService,
  ) {
    console.log('x: Hello from MyFirstWebComponentComponent constructor');
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.windowEventState.listenWindowEvents.subscribe((event) => {
        const windowEventType = event.data?.eventType;
        console.log('x: windowEventType:', windowEventType)
      })
    )
  }

  ngOnDestroy(): void {
    // console.log('Card component ngOnDestroy')
    this.subscriptions?.forEach(sub => sub.unsubscribe())
  }

  sendMessage() {
    console.log('x: sendMessage()');
    this.onClick.emit();
  }
}
