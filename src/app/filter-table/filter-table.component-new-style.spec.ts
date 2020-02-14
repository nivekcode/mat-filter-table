import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FilterTableComponent} from './filter-table.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatTableHarness} from '@angular/material/table/testing';
import {MatTab} from '@angular/material/tabs';
import {MatInputHarness} from '@angular/material/input/testing';

describe('FilterTableComponent', () => {
  let component: FilterTableComponent;
  let fixture: ComponentFixture<FilterTableComponent>;
  let loader: HarnessLoader;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterTableComponent],
      imports: [
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTableComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should have the correct table headings', async () => {
    const expectedHeadings = ['Firstname', 'Name', 'Title', 'Alive', 'Home', 'Culture'];
    const table = await loader.getHarness<MatTableHarness>(MatTableHarness);
    const headerRows = await table.getHeaderRows();
    expect(await headerRows[0].getCellTextByIndex()).toEqual(expectedHeadings);
  });

  it('should initially display three rows in the table', async () => {
    const table = await loader.getHarness<MatTableHarness>(MatTableHarness);
    const rows = await table.getRows();
    expect(rows.length).toBe(3);
  });

  it('should filter the table when we enter startk as a filter text', async () => {
    const inputField = await loader.getHarness<MatInputHarness>(MatInputHarness);
    const table = await loader.getHarness<MatTableHarness>(MatTableHarness);
    await inputField.setValue('Stark');
    const rows = await table.getRows();
    expect(rows.length).toBe(1);
  });
});
