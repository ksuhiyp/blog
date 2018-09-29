import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { TagService } from '../tag.service';
import { Observable, Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { log } from 'util';
export interface Tag {
  _id?: string,
  title: string;
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
  private upsertTerm = new Subject<Tag>();
  public articleTags: Tag[];
  private _tags: Tag[] = [];
  description;
  duplicatedTag = false;
  upsertedTag: Tag;
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
    this.remoteTags$ = this.searchTerms.pipe(debounceTime(1000), distinctUntilChanged(), switchMap((term: string) => this.tagService.searchTerm(term)));
  }


  search(term: string) {

    this.searchTerms.next(term)
  }
  selectTag(data) {
    this.add({ input: data, value: data.value })
  }

  public onBlur({ editor }: ChangeEvent) {
    const data = editor

    console.log(data);
  }
  onSubmit(data) {
    console.log(data);


  }

  add(event: MatChipInputEvent): void {
    this.duplicatedTag = false;
    console.log('data');

    const input = event.input;
    const value = event.value;
    for (let tag of this._tags) {
      if (tag.title == value) {
        this.duplicatedTag = true;
        return
      }
      this.tagService.upsertTerm({ title: value }).subscribe((data) => {
        console.log(data);
        
        this.upsertedTag = data
        // Add our fruit
        if ((value || '').trim()) {
          this._tags.push({ title: value.trim() });
        }
          console.log('test');
          
        // Reset the input value
        if (input) {
          input.value = '';
          this.articleTags.push({ title: input.value, _id: this.upsertedTag._id });

        }
      });
      //TODO: if unothorized or error occured breake the whole process 
      //Check for duplicated values
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
