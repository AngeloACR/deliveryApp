import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SplitPagoComponent } from './split-pago.component';

describe('SplitPagoComponent', () => {
  let component: SplitPagoComponent;
  let fixture: ComponentFixture<SplitPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplitPagoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SplitPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
