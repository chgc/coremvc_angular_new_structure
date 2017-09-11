import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  data$ = this.http.get('/api/values', { responseType: 'text' });

  constructor(private http: HttpClient, private title: Title) {
    this.title.setTitle('test');
  }

  ngOnInit() {}
}
