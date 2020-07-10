import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';
import { Hero } from 'src/app/core/model/hero';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailComponent implements OnChanges {
  @Input() hero: Hero;
  @Output() unselect = new EventEmitter<string>();
  @Output() add = new EventEmitter<Hero>();
  @Output() update = new EventEmitter<Hero>();

  @ViewChild('name', { static: true }) nameElement: ElementRef;

  addMode = false;

  form = this.fb.group({
    id: [],
    name: ['', Validators.required],
    saying: ['']
  });

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    this.setFocus();
    if (this.hero && this.hero.id) {
      this.form.patchValue(this.hero);
      this.addMode = false;
    } else {
      this.form.reset();
      this.addMode = true;
    }
  }


  addHero(form: FormGroup) {
    const { value, valid, touched } = form;
    if (touched && valid) {
      console.log({ ...this.hero, ...value });
      this.add.emit({ ...this.hero, ...value });
    }
    this.close();
  }

  updateHero(form: FormGroup) {
    const { value, valid, touched } = form;
    if (touched && valid) {
      this.update.emit({ ...this.hero, ...value });
    }
    this.close();
  }


  close() {
    this.unselect.emit();
  }

  saveHero(form: FormGroup) {

    if (this.addMode) {
      this.addHero(form);
    } else {
      this.updateHero(form);
    }
  }

  setFocus() {
    this.nameElement.nativeElement.focus();
  }

}
