import { AuthService } from './../../../auth/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar-material',
  templateUrl: './toolbar-material.component.html',
  styleUrls: ['./toolbar-material.component.css']
})
export class ToolbarMaterialComponent implements OnInit {


  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

  logOut(){
    this._authService.logout();
  }


}
