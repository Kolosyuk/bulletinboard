import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { CardListComponent } from '../../components/card-list/card-list.component';
import { CatalogListComponent } from '../../components/catalog-list/catalog-list.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    CardListComponent,
    CatalogListComponent,
    ButtonModule
  ],
})
export class SearchModule { }
