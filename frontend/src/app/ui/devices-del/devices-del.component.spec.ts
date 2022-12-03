import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesDelComponent } from './devices-del.component';

describe('DevicesDelComponent', () => {
  let component: DevicesDelComponent;
  let fixture: ComponentFixture<DevicesDelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevicesDelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevicesDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
