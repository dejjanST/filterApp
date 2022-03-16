import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  categories = [
    { optionKey: '', optionLabel: 'All'},
    { optionKey: 'general', optionLabel: 'General'},
    { optionKey: 'business', optionLabel: 'Business'},
    { optionKey: 'entertainment', optionLabel: 'Entertainment'},
    { optionKey: 'health', optionLabel: 'Health'},
    { optionKey: 'science', optionLabel: 'Science'},
    { optionKey: 'technology', optionLabel: 'Technology'}
  ]
  dataSub!: Subscription;
  categoryFC = new FormControl('');
  data: any;
  filteredData: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataSub = this.categoryFC.valueChanges
      .pipe(startWith('')).subscribe(data => {
        this.dataService.getData(data).subscribe((res: any) => {
          this.data = res;
          this.filteredData = res.sources;
          console.log(this.data);
        })
    });
  }

  searchTerm(event: Event) {
    const val = (event.target as HTMLInputElement).value;

    this.filteredData = this.data?.sources?.filter((el:any) => {
      return el.name.toLowerCase().includes(val.trim().toLowerCase());
    });
  }

  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
  }
}
