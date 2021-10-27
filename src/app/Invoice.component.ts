import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class InvoiceComponent {
  constructor(private http: HttpClient) {}

  Client: any = {
    id: '',
    logo: '',
    from: '',
    bill_to: '',
    address: '',
    date: '',
  };

  Items: any = {
    items: [],
    note: '',
  };

  OtherChanges: any = {
    discount: 0,
    tax_after_discount: 0,
    shipping: 0,
    prepaid: 0,
  };

  Total: number = 0;
  AmountPaid: number = 0;

  TotalBalanceDue: number = 0;

  ngOnInit() {
    this.loadDataClient();
    this.loadDataItems();
    this.loadDataOtherChanges();
  }

  loadDataClient() {
    this.http
      .get<any>('../assets/json/client.json')
      .subscribe((data: any) => {
        this.Client = data;
      });
  }

  loadDataItems() {
    this.http
      .get<any>('../../../assets/json/items.json')
      .subscribe((data: any) => {
        this.Items = data;
      });
  }

  loadDataOtherChanges() {
    this.http
      .get<any>('../assets/json/other_changes.json')
      .subscribe((data: any) => {
        this.OtherChanges = data;
      });
  }

  setTotal(Total: number) {
    this.Total = Total;

    this.calBalanceDue();
  }

  setAmountPaid(AmountPaid: number) {
    this.AmountPaid = AmountPaid;

    this.calBalanceDue();
  }

  calBalanceDue() {
    let val = this.Total - this.AmountPaid;

    this.TotalBalanceDue = val;
  }
}
