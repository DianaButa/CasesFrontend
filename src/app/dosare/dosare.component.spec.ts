import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DosareComponent } from './dosare.component';

describe('DosareComponent', () => {
  let component: DosareComponent;
  let fixture: ComponentFixture<DosareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DosareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DosareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
