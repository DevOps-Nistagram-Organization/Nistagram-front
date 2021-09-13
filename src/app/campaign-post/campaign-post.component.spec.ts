import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignPostComponent } from './campaign-post.component';

describe('CampaignPostComponent', () => {
  let component: CampaignPostComponent;
  let fixture: ComponentFixture<CampaignPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
