import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorReactiveComponent } from './editor-reactive.component';

describe('EditorReactiveComponent', () => {
  let component: EditorReactiveComponent;
  let fixture: ComponentFixture<EditorReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorReactiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
