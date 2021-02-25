import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trending-post',
  templateUrl: './trending-post.component.html',
  styleUrls: ['./trending-post.component.scss'],
})
export class TrendingPostComponent implements OnInit {

  @Input() post: any;

  constructor() { }

  clickedOnPost() {
    localStorage.setItem('post_id', this.post.id);
  }

  ngOnInit() {

  }

}


