import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subscription } from "rxjs";
import { WindowEventStateService } from "./services/window-event-state.service";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { InputTextModule } from "primeng/inputtext";
import { Button } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { MyFirstWebComponentConfig } from "./models";
import { MyFirstWebComponentService } from "./my-first-web-component.service";
import { NgIf, NgOptimizedImage } from "@angular/common";
import {
  SerializedMyFirstWebComponentFactoryOptions,
  voucherOptionsSerialization
} from "./my-first-web-component-core-options";

@Component({
  selector: 'lib-my-first-web-component',
  standalone: true,
  imports: [
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    Button,
    DialogModule,
    NgIf,
    NgOptimizedImage,

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

    <div>
      <img alt="Pokemon front" *ngIf="imageUrl" [ngSrc]="imageUrl" height="300"
           width="300">
    </div>
  `,
  styles: `
  `,
  providers: [
    MyFirstWebComponentService
  ]
})
export class MyFirstWebComponentComponent implements AfterViewInit, OnDestroy {

  protected readonly subscriptions: Subscription[] = []

  private _config: MyFirstWebComponentConfig | undefined;

  @Input() set config(value: MyFirstWebComponentConfig | string) {
    console.log('x: config:', value);

    let tempData: MyFirstWebComponentConfig | undefined;

    if (typeof value === 'string') {

      console.log('Voucher as string:', value)
      const serializedData = JSON.parse(value) //reverse operation of btoa from core

      console.log('Voucher as serializedData:', serializedData)
      tempData = voucherOptionsSerialization(serializedData as SerializedMyFirstWebComponentFactoryOptions)

    } else {
      tempData = value;
    }

    if (!tempData) {
      setTimeout(() => {//cannot perform input & output at the same time
        console.log('Config data empty!')
      })
    }

    this._config = tempData;
  }

  @Input() dialogHeader: string = 'Default Dialog Header';
  @Input() isDialogVisible: boolean = false;
  @Output() dialogOpened = new EventEmitter<void>();
  @Output() dialogClosed = new EventEmitter<void>();

  @Output() onClick = new EventEmitter();

  imageUrl = "";

  constructor(
    public readonly windowEventState: WindowEventStateService,
    private myFirstWebComponentService: MyFirstWebComponentService
  ) {
    // (globalThis as any).ngZone = inject(NgZone);
  }

  get config(): MyFirstWebComponentConfig | undefined {
    return this._config;
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.windowEventState.listenWindowEvents.subscribe((event) => {
        const windowEventType = event.data?.eventType;
        console.log('x: windowEventType:', windowEventType)
      })
    )

    this.subscriptions.push(
      this.myFirstWebComponentService.getPikachu(this.config?.baseUrl!)
        .subscribe((response: any) => {
          this.imageUrl = response.sprites.front_default;
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
