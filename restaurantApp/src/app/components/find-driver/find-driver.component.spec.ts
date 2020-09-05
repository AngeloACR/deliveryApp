import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { FindDriverComponent } from "./find-driver.component";

describe("FindDriverComponent", () => {
  let component: FindDriverComponent;
  let fixture: ComponentFixture<FindDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FindDriverComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FindDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
