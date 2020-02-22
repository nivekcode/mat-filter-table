import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

export interface GOTCharacter {
  firstname: string;
  name: string;
  title: string;
  alive: boolean;
  origin: string;
  culture: string;
}

const ELEMENT_DATA: GOTCharacter[] = [
  {firstname: 'Eddard', name: 'Stark', title: 'Lord of Winterfell', alive: false, origin: 'Winterfell', culture: 'Northmen'},
  {
    firstname: 'Cersei',
    name: 'Lannister',
    title: 'Queen of the andals and first man',
    alive: false,
    origin: 'Casterly rock',
    culture: 'Andal'
  },
  {firstname: 'Samwell', name: 'Tarly', title: 'Grand Maester', alive: true, origin: 'Horn Hill', culture: 'Andal'},
  {firstname: 'Rob', name: 'Stark', title: 'King of the north', alive: false, origin: 'Winterfell', culture: 'Northmen'},
  {firstname: 'Arya', name: 'Stark', title: 'Princess', alive: true, origin: 'Winterfell', culture: 'Northmen'},
  {firstname: 'Tyrion', name: 'Lannister', title: 'The Imp', alive: true, origin: 'Casterly rock', culture: 'Andal'},
  {firstname: 'Rhaegar', name: 'Targaryen', title: 'The last dragon', alive: false, origin: 'Dragonstone', culture: 'Valyrian'},
  {firstname: 'Daenerys', name: 'Targaryen', title: 'Mother of Dragons', alive: false, origin: 'Dragonstone', culture: 'Valyrian'}
];

@Component({
  selector: 'filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.css']
})
export class FilterTableComponent implements OnInit {

  displayedColumns: string[] = ['firstname', 'name', 'title', 'alive', 'origin', 'culture'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  ngOnInit(): void {
  }

  filterDeadOrAlive(alive: boolean) {
    this.dataSource.filter = alive ? 'true' : 'false';
  }

  resetDeadOrAliveFilter() {
    this.dataSource.filter = '';
  }

  applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
