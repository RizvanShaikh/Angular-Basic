import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  NgForm
} from "@angular/forms";
import { AuthService } from "../auth.service";
import Swal from 'sweetalert2';
@Component({
  selector: "app-reactive-form",
  templateUrl: "./reactive-form.component.html",
  styleUrls: ["./reactive-form.component.css"]
})
export class ReactiveFormComponent implements OnInit {
  title = "Reactive Form In Angular 9";

  registrationForm: FormGroup;
  isSubmitted: boolean = false;
  public currentUser: any = null;
  previewUrl: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthService
  ) {
    this._authService.currentUser.subscribe(x => (this.currentUser = x));

    this.registrationForm = this.formBuilder.group({
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
        Validators.pattern("^[a-zA-Z ]*$")
      ]),
      phoneNumber: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15)
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(12),
        Validators.pattern(
          "(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}"
        )
      ]),
      userGender: new FormControl("Male"),
      profilePicUrl: new FormControl("", [Validators.required])
      // file: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    // this.previewUrl = this.currentUser.image
    //   ? this.currentUser.image
    //   : "/assets/img/avatars/user.png";
  }
  file1mb: number = 1000000;
  fil10mb = this.file1mb * 10;

  onRegistrationFormSubmit() {
    this.isSubmitted = true;
    if (this.registrationForm.valid) {
      if (
        this.fileToUpload.type == "image/jpg" ||
        this.fileToUpload.type == "image/jpeg"
      ) {
        if (this.fileToUpload.size <= this.fil10mb) {
          this.isSubmitted = true;
          console.log(
            "User Registration Form Submit Data",
            this.registrationForm.value
          );
          // this.currentUser = this.registrationForm;
          this._authService
            .updateProfile(this.registrationForm.value)
            .subscribe(response => {
              console.log("==>  response: ", response);
              if (response.success) {
                this._authService.saveCurrentUser(response.data);
              } else {
                console.error(response);
              }
            });

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'You Sign Up Successfully!.',
              showConfirmButton: false,
              timer: 1500
            })

          
        } else {
          this.isSubmitted = false;
          Swal.fire('file size is greater than 10mb')
        }
      } else {
        this.isSubmitted = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'form can not be Sign up because files are not in jpg/jpeg formate!',
        })
      }
    
      // this.registrationForm.reset();
    }
  }

  fileToUpload: any;
  imageUrl: any;
  handleFileInput(file: FileList) {
    // debugger
    console.log("handelFileInpute 63", file);
    this.fileToUpload = file.item(0);
    if (
      this.fileToUpload.type == "image/jpg" ||
      this.fileToUpload.type == "image/jpeg"
    ) {
      //  this.onRegistrationFormSubmit()
      //Show image preview
      let reader = new FileReader();
      // console.log("reader 68")
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      };
      reader.readAsDataURL(this.fileToUpload);
    } else {
      Swal.fire('Only jpg/jpeg files are allowed!')
    }
  }
}
