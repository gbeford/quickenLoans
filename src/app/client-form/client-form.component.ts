import { Client } from './client-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateService } from '../shared/state.service';
import { IState } from './state-model';


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
  submitted = false;

  constructor(private formBuilder: FormBuilder, private addressService: StateService) { }

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
      emp_ID: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required,
      Validators.pattern('^(\\+?\\d{0,3}[ |-]{1})((\\(?\\d{3}\\)? ?)|(\\d{3}[ |-]?))?\\d{3}[ |-]\\d{4}$')]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern('^\\d{5}(-\\d{4})?$')]],
    });
  }

  // convenience getter for easy access to form fields
  get f(): any { return this.form.controls; }

  addClient(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.client = this.addNewClient(this.form);
    this.message = true;
    console.log('New Client', JSON.stringify(this.client));
    this.resetForm();
  }

  addNewClient(form: FormGroup): Client {
    const newClient = new Client();

    newClient.emID = form.value.emp_ID;
    newClient.firstName = form.value.fName;
    newClient.lastName = form.value.lName;
    newClient.company = form.value.company;
    newClient.email = form.value.email;
    newClient.phone = form.value.phone;
    newClient.address = form.value.address + ', ' + form.value.city + ', ' + form.value.state + ', ' + form.value.zip;

    return newClient;
  }

  resetForm(): void {
    this.submitted = false;
    this.form.reset();
  }

}
