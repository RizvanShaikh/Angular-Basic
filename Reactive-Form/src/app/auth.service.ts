import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private BACKEND_API = "/";

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public updateProfile(data): Observable<any> {
    let url = `${this.BACKEND_API}/profile`;
    return this.http.post(url, data);
  }

  //  currentUserSubject functions

  public saveCurrentUser(UserDetail): void {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem("currentUser", JSON.stringify(UserDetail));
    this.currentUserSubject.next(UserDetail);
    console.log("\n==> saveCurrentUser: ");
  }

  public removeCurrentUser(): void {
    // remove user from local storage and set current user to null
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }

  public currentUserValue() {
    return this.currentUserSubject.value;
  }
}
