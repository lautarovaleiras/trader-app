import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarMaterialComponent } from './toolbar-material.component';

describe('ToolbarMaterialComponent', () => {
  let component: ToolbarMaterialComponent;
  let fixture: ComponentFixture<ToolbarMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
