import { Injectable, OnInit } from '@angular/core';
import { User } from '../model/user.interface';
import { Cards } from '../model/card.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User;

  constructor() { }

  setUser(user : User) {
    this.user = user;
  }

  getId() {
    return this.user.id;
  }

  setId(id : string) {
    this.user.id = id;
  }

  getName() {
    return this.user.name;
  }

  setName(name : string) {
    this.user.name = name;
  }

  getPhone() {
    return this.user.phone;
  }
  
  setPhone(phone : number) {
    this.user.phone = phone;
  }


  getAdress() {
    return this.user.adress;
  }

  setAdress(adress : string) {
    this.user.adress = adress;
  }

  getAdvertisments() {
    return this.user.advertisments;
  }

  setAdvertisments(advertisments : Cards) {
    this.user.advertisments = advertisments;
  }
}
