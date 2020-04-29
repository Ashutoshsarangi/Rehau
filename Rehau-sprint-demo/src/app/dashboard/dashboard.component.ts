import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  inputText = 'Please Select Some thing';
  dropdownList = [
    {
      titleUp: 'RAUTOOL A-one',
    },
    {
      titleUp: 'RAUTOOL A-light 2 Kombi'
    },
    {
      titleUp: 'RAUTOOL A-light2'
    },
    {
      titleUp: 'RAUTOOL Xpand QC'
    },
    {
      titleUp: 'RAUTOOL G2'
    },
    {
      titleUp: 'RAUTOOL K-Tools'
    },
    {
      titleUp: 'RAUTOOL M1'
    },
    {
      titleUp: 'RAUTOOL H/G1'
    }

  ];

  testChange(event) {
    console.log(event);
    alert('Hey I Got It');
  }

  ngOnInit() {
  }

}
