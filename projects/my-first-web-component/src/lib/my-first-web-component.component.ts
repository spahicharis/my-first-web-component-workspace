import { AfterViewInit, Component, effect, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subscription } from "rxjs";
import { WindowEventStateService } from "./services/window-event-state.service";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { InputTextModule } from "primeng/inputtext";
import { Button } from "primeng/button";
import { DialogModule } from "primeng/dialog";

@Component({
  selector: 'lib-my-first-web-component',
  standalone: true,
  imports: [
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    Button,
    DialogModule
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

    <p-button label="Open Empty Dialog" (onClick)="showDialog()"></p-button>
    <p-dialog [(visible)]="isDialogVisible" [header]="dialogHeader" (onHide)="onHideDialog()">
      <ng-content></ng-content>
    </p-dialog>
  `,
  styles: `
  `
})
export class MyFirstWebComponentComponent implements AfterViewInit, OnDestroy {
  protected readonly subscriptions: Subscription[] = []

  @Input() dialogHeader: string = 'Default Dialog Header';
  @Input() isDialogVisible: boolean = false;
  @Output() dialogOpened = new EventEmitter<void>();
  @Output() dialogClosed = new EventEmitter<void>();

  @Output() onClick = new EventEmitter();

  constructor(
    public readonly windowEventState: WindowEventStateService,
  ) {
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
    this.subscriptions?.forEach(sub => sub.unsubscribe())
  }

  sendMessage() {
    console.log('x: sendMessage()');
    this.onClick.emit();
  }

  showDialog() {
    this.isDialogVisible = true;
    this.dialogOpened.emit();
  }

  onHideDialog() {
    this.isDialogVisible = false;
    this.dialogClosed.emit();
  }
}
