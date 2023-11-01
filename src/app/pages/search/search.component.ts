import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Advert } from 'src/app/model/advert.interface';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  public adverts: Advert[];
  public nothingFound: boolean;
  public searchString: string;
  private destroy$: Subject<unknown> = new Subject();

  constructor(
    private _searchService: SearchService,
  ) {}

  ngOnInit(): void {
    this._searchService.searchResult.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (adverts: Advert[]) => {
        this.nothingFound = false;
        this.adverts = adverts;
        this.searchString = this._searchService.form.search;
        if(!adverts.length) {
          this.nothingFound = true;
        }
      },
      error: () => console.log('Error at search service')
    })
  };

  ngOnDestroy () {
    this.destroy$.next('stop');
    this.destroy$.complete();
  };
};