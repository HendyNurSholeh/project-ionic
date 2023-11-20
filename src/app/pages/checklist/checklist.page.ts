import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
})
export class ChecklistPage implements OnInit {
  checklists = ['run', 'walk', 'sleep', 'eat'];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData();
  }

  addChecklist() {
    console.log('checklist di klik');
  }

  renameChecklist() {
    console.log('rename checklist di klik');
  }

  removeChecklist() {
    console.log('remove checklist di klik');
  }

  fetchData() {
    this.http
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .subscribe((data) => {
        console.log(data);
      });
  }
}
