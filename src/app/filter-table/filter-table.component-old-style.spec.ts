import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FilterTableComponent} from './filter-table.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';

describe('FilterTableComponent Old', () => {
  let component: FilterTableComponent;
  let fixture: ComponentFixture<FilterTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterTableComponent],
      imports: [
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatRadioModule,
        MatIconModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have the correct table headings', async () => {
    const expectedHeadings = ['Firstname', 'Name', 'Title', 'Alive', 'Home', 'Culture'];
    const headings = fixture.debugElement.queryAll(By.css('.mat-table thead tr th'));
    const headingTexts = headings.map((headingElement: DebugElement) => headingElement.nativeElement.innerText);
    expect(headingTexts).toEqual(expectedHeadings);
  });

  it('should initially display three rows in the table', () => {
    const rows = fixture.debugElement.queryAll(By.css('.mat-table tbody tr'));
    expect(rows.length).toBe(3);
  });

  it('should filter out the alive caracters if we set filter to dead', done => {
    const deadRadio = fixture.debugElement.query(By.css('#deadFilter'));
    const clickableElement = deadRadio.query(By.css('.mat-radio-container'));
    clickableElement.nativeElement.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const rows = fixture.debugElement.queryAll(By.css('.mat-table tbody tr'));
      expect(rows.length).toBe(5);
      done();
    });
  });

  it('should filter the table when we enter "stark" as a filter text', done => {
    const inputField = fixture.debugElement.query(By.css('.mat-input-element'));
    inputField.nativeElement.value = 'Stark';
    const keyupEvent = new Event('keyup');
    inputField.nativeElement.dispatchEvent(keyupEvent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const rows = fixture.debugElement.queryAll(By.css('.mat-table tbody tr'));
      expect(rows.length).toBe(3);
      done();
    });
  });
});
