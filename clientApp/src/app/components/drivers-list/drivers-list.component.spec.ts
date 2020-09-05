import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DriversListComponent } from './drivers-list.component';

describe('DriversListComponent', () => {
  let component: DriversListComponent;
  let fixture: ComponentFixture<DriversListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriversListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DriversListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
