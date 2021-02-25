import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  searchInput(event) {
    console.log("Pesquisar e setar valores");
    console.log(event.target.value);
  }

}
