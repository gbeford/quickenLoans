import { Client } from './../client-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../address.service';
import { IState } from '../state-model';


@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  public form: FormGroup;
  stateList: IState[];
  client: Client;
  message = false;
  constructor(private formBuilder: FormBuilder, private addressService: AddressService) { }

  ngOnInit(): void {
    this.createForm();
    this.getStates();
  }

  getStates(): void {
    this.addressService.getStates().subscribe(data => {
      this.stateList = data;
    });
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      company: ['', [Validators.required as any]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required as any]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', [Validators.required as any]],
      zip: ['', [Validators.required as any]],
    });
  }

  add(): void {
    if (this.form.valid) {
      this.client = {
        firstName: this.form.value.fName,
        lastName: this.form.value.lName,
        company: this.form.value.company,
        email: this.form.value.email,
        phone: this.form.value.phone,
        address: this.form.value.address + ', ' + this.form.value.city + ', ' + this.form.value.state + ', ' + this.form.value.zip
      };
this.message = true;
      console.log('New Client', JSON.stringify(this.client));
      this.form.reset();
    }
  }



}
