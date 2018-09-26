import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { FormGroup, FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
export interface Tag {
  name: string;
}
@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {
  public Editor = ClassicEditor
  public formTitle;
  public mainImage;
  public articleTags=[];
  private _tags: Tag[] = [];
  description;
  public body = {
    editorData: ''
  };
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor() { }

  ngOnInit() {


  }

  onSubmit(data) {
    console.log(data);

    
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    //Check for duplicated values
    for (let tag of this._tags) {
      if (tag.name == value)
        return
    }
    // Add our fruit
    if ((value || '').trim()) {
      this._tags.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      // input.value = '';
      this.articleTags.push(value.trim());

    }
  }

  remove(tag: Tag): void {
    const index = this._tags.indexOf(tag);

    if (index >= 0) {
      this._tags.splice(index, 1);
    }
  }

}
