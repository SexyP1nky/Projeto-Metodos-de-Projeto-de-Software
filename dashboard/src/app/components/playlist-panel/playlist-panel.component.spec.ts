import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistPanelComponent } from './playlist-panel.component';

describe('PlaylistPanelComponent', () => {
  let component: PlaylistPanelComponent;
  let fixture: ComponentFixture<PlaylistPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
