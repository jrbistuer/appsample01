import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewVacancaPage } from './new-vacanca.page';

describe('NewVacancaPage', () => {
  let component: NewVacancaPage;
  let fixture: ComponentFixture<NewVacancaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewVacancaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
