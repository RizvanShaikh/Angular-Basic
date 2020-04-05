import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  public currentUser: any = null;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser.subscribe(x => (this.currentUser = x));

    // this.authService.currentUserValue.subscribe(
    //   photoUrl => (this.photoUrl = photoUrl)
    // );
    console.log("User Data In Nav bar", this.currentUser);
  }
}
