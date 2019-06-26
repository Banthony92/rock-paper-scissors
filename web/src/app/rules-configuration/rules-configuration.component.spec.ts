import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesConfigurationComponent } from './rules-configuration.component';

describe('RulesConfigurationComponent', () => {
  let component: RulesConfigurationComponent;
  let fixture: ComponentFixture<RulesConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RulesConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
