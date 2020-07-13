import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Hero } from '../../core/model/hero';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../../core/modal/modal.component';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit {

  @Input() heroes: Hero[];
  @Input() selectedHero: Hero;
  @Output() selected = new EventEmitter<Hero>();
  @Output() deleted = new EventEmitter<Hero>();

  constructor(public dialog: MatDialog) {}

  byId(hero: Hero) {
    return hero.id;
  }

  ngOnInit(): void {
  }

  select(hero: Hero) {
    this.selected.emit(hero);
  }

  deleteHero(hero: Hero){

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '250px';
      dialogConfig.data = {
        title: 'Delete Hero',
        message: `Do you want to delete ${hero.name}`
      };

      const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(deleteIt => {
        console.log('The dialog was closed');
        if (deleteIt) {
          this.deleted.emit(hero);
        }
      });
    }



}
