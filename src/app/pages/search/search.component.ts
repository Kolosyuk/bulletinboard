import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, delay, takeUntil, tap } from 'rxjs';
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
  public loading: boolean = true;

  constructor(
    private _searchService: SearchService,
  ) {}

  ngOnInit(): void {
    this._searchService.searchResult.pipe(
      takeUntil(this.destroy$),
      tap(() => {
        this.searchString = this._searchService.form.search;
        this.nothingFound = false;
      }),
      delay(1500)
    ).subscribe({
      next: (adverts: Advert[]) => {
        this.loading = false
        this.adverts = adverts;        
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