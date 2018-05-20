import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrophyRoomComponent } from './trophy-room.component.ts';

describe('TrophyRoomComponent', () => {
  let component: TrophyRoomComponent;
  let fixture: ComponentFixture<TrophyRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrophyRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrophyRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
