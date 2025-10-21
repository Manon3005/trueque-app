import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAdPage } from './edit-ad.page';

describe('EditAdPage', () => {
  let component: EditAdPage;
  let fixture: ComponentFixture<EditAdPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
