import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguratorSummaryComponent } from './configurator-summary.component';

describe('ConfiguratorSummaryComponent', () => {
  let component: ConfiguratorSummaryComponent;
  let fixture: ComponentFixture<ConfiguratorSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguratorSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfiguratorSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
