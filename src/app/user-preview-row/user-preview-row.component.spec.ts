import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPreviewRowComponent } from './user-preview-row.component';

describe('UserPreviewRowComponent', () => {
  let component: UserPreviewRowComponent;
  let fixture: ComponentFixture<UserPreviewRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPreviewRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPreviewRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
