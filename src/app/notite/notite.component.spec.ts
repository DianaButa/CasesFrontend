import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotiteComponent } from './notite.component';

describe('NotiteComponent', () => {
  let component: NotiteComponent;
  let fixture: ComponentFixture<NotiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
