import { Component, OnInit } from '@angular/core';
import { IClientList } from '../client-list-model';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})

export class ClientListComponent implements OnInit {
  clientList: IClientList[];

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.getClientList();
  }

  getClientList(): void {
    this.clientService.getClientList().subscribe(data => {
      this.clientList = data;
    });
  }

}
