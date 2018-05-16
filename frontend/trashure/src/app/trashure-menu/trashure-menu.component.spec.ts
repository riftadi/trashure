import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashureMenuComponent } from './trashure-menu.component';

describe('TrashureMenuComponent', () => {
  let component: TrashureMenuComponent;
  let fixture: ComponentFixture<TrashureMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrashureMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashureMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
