import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription, delay, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-select-country',
  templateUrl: './select-country.component.html',
  styleUrls: ['./select-country.component.css'],
})
export class SelectCountryComponent {
  sub!: Subscription;

  @ViewChild('input')
  input!: ElementRef;

  paysListe: Array<any> = [
    { code: 'NC', libelle: 'New Caledonia' },
    { code: 'NZ', libelle: 'New Zealand' },
    { code: 'AU', libelle: 'Australia' },
    { code: 'FR', libelle: 'France' },
    { code: 'EN', libelle: 'English' },
    { code: 'ES', libelle: 'Spain' },
    { code: 'JP', libelle: 'Japan' },
  ];

  paysListeView: Array<any> = [];

  constructor() {}

  ngAfterViewInit() {
    this.sub = fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        delay(100),
        map(() => this.input.nativeElement.value)
      )
      .subscribe((inputValue) => {
        if (inputValue.length == 0) {
          this.paysListeView = [];
        } else {
          this.paysListeView = this.paysListe.filter((pays) =>
            pays.libelle.toLowerCase().startsWith(inputValue.toLowerCase())
          );
        }
        if (
          this.paysListeView.length == 1 &&
          this.paysListeView[0].libelle.toLowerCase() ===
            this.input.nativeElement.value.toLowerCase()
        ) {
          this.paysListeView = [];
        }
      });
  }

  getPays(event: any) {
    this.input.nativeElement.value = event.target.innerText;
    this.paysListeView = [];
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
