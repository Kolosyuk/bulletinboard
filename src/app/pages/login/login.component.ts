import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public scrHeight: number;
  public  scrWidth: number;
  
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
        console.log(this.scrHeight, this.scrWidth);
  };
  
  constructor() {
  };

  ngOnInit(): void {
    this.getScreenSize();
  };
}
