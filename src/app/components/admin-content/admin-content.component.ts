import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//интерфес
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
  styleUrls: ['./admin-content.component.css']
})

export class AdminContentComponent implements OnInit {
  checkBox_remove: boolean = false;//Кнопка checkbox "Форма создания"
  checkBox_delete: boolean = false;//Кнопка checkbox "Список" 
  display = false;//Отображение chechbox удалить

  idcontent = ''//поле id
  captioncontent = ''//поле cap
  urlcontent = ''//поле url
  hintcontent = ''//поле hint
  form_h1 = 'Создать'//поле передачи названия
  responses: Content[] = []; //для отображения

  constructor(private http: HttpClient) { }

  //метод отображения данных на странице
  ngOnInit() {
    this.http.get<Content[]>('/api/ContentItemsApi')
      .subscribe((response) => {
        this.responses = response;
        console.log(this.responses);
      })
  }

  //Вызов метода кнопки "Создать"
  add() {
    this.disable(false)
    this.clear()
    this.but_click(0);
  }
  //метод для добавления данных
  addContent() {
    if (!this.idcontent.trim() && !this.captioncontent.trim()) {
      return
    }
    const newContent: Content = {
      id: this.idcontent,
      caption: this.captioncontent,
      url: this.urlcontent,
      hint: this.hintcontent,
      enabled: true
    }
    this.http.post<Content>('/api/ContentItemsApi', newContent)
      .subscribe(content => {
        this.responses.push(content)
        this.clear()
        this.disable(true)
      })
  }
  //метод полного удаления
  // deleteContent(id: string) {
  //   this.http.delete(`/api/ContentItemsApi/${id}`)
  //     .subscribe(() => {
  //       this.responses = this.responses.filter(con => con.id !== id)
  //     })
  // }
  index = 0;
  //метод обновления
  updateContent(id: string) {
    const newContent: Content = {
      id: this.idcontent,
      caption: this.captioncontent,
      url: this.urlcontent,
      hint: this.hintcontent,
      enabled: !this.checkBox_remove
    }
    for (this.i = 0; this.i < this.responses.length; this.i++) {
      if (this.responses[this.i].id == id) {
        this.index = this.i
      }
    }
    this.http.put<Content>(`/api/ContentItemsApi/${id}`, newContent)
      .subscribe(() => {
        this.responses[this.index] = newContent
        this.clear()
        this.disable(true)
      })
  }
  i = 0;//переменная для массива
  num_content = 0//переменная для кнопки
  disabled: boolean[] = [true, true, true, true, true, true, true]//массив для отображения элементов
  //метод для передачи данных на форму создать
  UCDContent(id: string, num: number) {
    this.http.get<Content>("/api/ContentItemsApi/" + id)
      .subscribe((content) => {
        this.disable(false)
        this.idcontent = content.id;
        this.captioncontent = content.caption;
        this.urlcontent = content.url;
        this.hintcontent = content.hint;
        this.checkBox_remove = !content.enabled
        //Обновить
        if (num == 0) {
          this.form_h1 = 'Обновить'
          this.disabled[0] = true;
          this.num_content = 1;
          this.display = true;
        }
        //Клонировать
        else if (num == 1) {
          this.form_h1 = 'Клонировать'
          this.idcontent = '';
          this.num_content = 0;
          this.display = false;
          this.checkBox_remove = false;
        }
        //Удалить
        else if (num == 2) {
          this.form_h1 = 'Удалить'
          this.display = true;
          this.disable(true)
          this.num_content = 1;
          this.disabled[4] = false;
          this.disabled[5] = false;
          this.disabled[6] = false;
        }
      })
  }
  //метод для передачи метода в кнопку
  but_click(num: number) {
    //вызов метода "Добавить"
    if (num == 0) {
      this.addContent();
    }
    //вызов метода "Обновить"
    else if (num == 1) {
      this.updateContent(this.idcontent)
    }
  }

  //метод очистки полей
  clear() {
    this.form_h1 = 'Создать'
    this.idcontent = '';
    this.captioncontent = '';
    this.urlcontent = '';
    this.hintcontent = '';
    this.checkBox_remove = false;
    this.display = false;
  }
  //метод вызова кнопки "Отмена"
  but_none() {
    this.clear()
    this.disable(true)
  }
  //метод скрытия элементов
  disable(disableb: boolean) {
    for (this.i = 0; this.i < this.disabled.length; this.i++) {
      this.disabled[this.i] = disableb;
    }
  }
}
