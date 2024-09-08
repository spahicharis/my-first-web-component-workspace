import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFirstWebComponentComponent } from './my-first-web-component.component';

describe('MyFirstWebComponentComponent', () => {
  let component: MyFirstWebComponentComponent;
  let fixture: ComponentFixture<MyFirstWebComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFirstWebComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFirstWebComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
