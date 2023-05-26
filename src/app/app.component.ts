import { Component, ViewChild, NgZone, AfterViewInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { products } from './products';
import { GridComponent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'my-app',
  styles: [
    `
        .pg-icon-padding {
          padding-right: 2px;
          cursor: pointer;
      }
      
      .pg-icon-padding:hover {
          color: black;
      }
        `,
  ],
  template: `
        <kendo-grid
            #grid
            [kendoGridBinding]="gridData"
            [height]="300"
            [resizable]="true"
            (dataStateChange)="onDataStateChange()">
            <kendo-grid-column  #firstColumn title="ID" >
            <ng-template kendoGridCellTemplate let-dataItem>
                <span class="k-icon k-i-edit pg-icon-padding "></span>
                <span class="k-icon k-i-edit pg-icon-padding "></span>
                <span class="k-icon k-i-edit pg-icon-padding " [hidden]="true"></span>
                <span class="k-icon k-i-edit pg-icon-padding "></span>
                <span class="k-icon k-i-edit pg-icon-padding "></span>
                </ng-template>
            </kendo-grid-column>
            <kendo-grid-column field="ProductName" title="Name" [width]="150">
            </kendo-grid-column>
            <kendo-grid-column field="Category.CategoryName" title="Category" [width]="100">
            </kendo-grid-column>
           
        </kendo-grid>
    `,
})
export class AppComponent implements AfterViewInit {
  @ViewChild(GridComponent)
  public grid: GridComponent;

  @ViewChild('firstColumn', { static: true }) public firstColumn;

  public gridData: unknown[] = products;

  constructor(private ngZone: NgZone) {}

  public ngAfterViewInit(): void {
    this.fitColumns();
  }

  public onDataStateChange(): void {
    this.fitColumns();
  }

  private fitColumns(): void {
    this.ngZone.onStable
      .asObservable()
      .pipe(take(1))
      .subscribe(() => {
        this.grid.autoFitColumn(this.firstColumn);
      });
  }
}
