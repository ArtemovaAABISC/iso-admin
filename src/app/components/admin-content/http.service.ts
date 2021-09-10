import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Content } from "./ContentItems";

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) { }
  getData() {
    return this.http.get('/api/ContentItemsApi')
  }
  postData(content: Content) {
    const body = {
      id: content.id,
      caption: content.caption,
      url: content.url,
      hint: content.hint,
      enabled: false
    };
    return this.http.post('/api/ContentItemsApi', body);
  }
  putData() { }
}