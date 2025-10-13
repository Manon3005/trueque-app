import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAdPage } from './create-ad.page';

describe('CreateAdPage', () => {
  let component: CreateAdPage;
  let fixture: ComponentFixture<CreateAdPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
