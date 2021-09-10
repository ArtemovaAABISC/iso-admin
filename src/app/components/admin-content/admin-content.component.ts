import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
// import { Content } from './ContentItems';

// export interface Todo {
//   completed: boolean
//   title: string
//   id?: number
// }
export interface Content {
  id: string
  caption: string
  url: string
  hint: string
  enabled: boolean
}

@Component({
  selector: 'app-admin-content',
  templateUrl: './admin-content.component.html',
  styleUrls: ['./admin-content.component.css'],
  providers: [HttpService]
})

export class AdminContentComponent implements OnInit {

  // content: Content = new Content("", "", "", "", false);
  // replase: any
  // constructor(private httpService: HttpService) { }
  // ngOnInit(): void {
  //   this.httpService.getData()
  //     .subscribe((data: any) => {
  //       this.replase = data
  //       console.log(this.replase)
  //     })
  // }

  // addContent(content: Content) {
  //   this.httpService.postData(content)
  //     .subscribe((data: any) => {
  //       this.replase = data;

  //     })
  // }

  idcontent = ''
  captioncontent = ''
  urlcontent = ''
  hintcontent = ''

  responses: any;
  constructor(private http: HttpClient) {
    this.http.get('/api/ContentItemsApi').subscribe((response) => {
      this.responses = response;
      console.log(this.responses);
    })
  }
  addContent() {
    if (!this.idcontent.trim() && !this.captioncontent.trim()) {
      return
    }
    const newContent: Content = {
      id: this.idcontent,
      caption: this.captioncontent,
      url: this.urlcontent,
      hint: this.hintcontent,
      enabled: false
    }
    this.http.post('/api/ContentItemsApi', newContent)
      .subscribe(content => {
        this.responses.push(content),
          this.idcontent = ''
        this.captioncontent = ''
        this.urlcontent = ''
        this.hintcontent = ''
      })
  }
  ngOnInit(): void {
  }

}
