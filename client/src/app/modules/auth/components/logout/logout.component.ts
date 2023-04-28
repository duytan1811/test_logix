import { Component, OnInit } from '@angular/core';
import { AuthState } from '../../states/auth.state';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(private authState: AuthState) {
    this.authState.logout();
  }

  ngOnInit(): void { }
}
