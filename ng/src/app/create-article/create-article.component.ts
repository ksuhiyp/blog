import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { TagService } from '../tag.service';
import { Observable, Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
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
  public remoteTags$: Observable<Tag[]>;
  private searchTerms = new Subject<string>();
  public articleTags = [];
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

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.remoteTags$ = this.searchTerms.pipe(debounceTime(300), distinctUntilChanged(), switchMap((term: string) => this.tagService.searchTerm(term))


    )
  }


  search(term: string) {
    console.log(term);
    
    this.searchTerms.next(term)
  }
  editorIsValid() { }

  public onBlur({ editor }: ChangeEvent) {
    const data = editor

    console.log(data);
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
      input.value = '';
      this.articleTags.push(value.trim());

    }
  }

  remove(tag: Tag): void {
    const index = this._tags.indexOf(tag);

    if (index >= 0) {
      this._tags.splice(index, 1);
      this.articleTags.splice(this.articleTags.indexOf(tag), 1);
    }
  }

}
