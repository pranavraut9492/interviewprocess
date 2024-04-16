import { Component } from '@angular/core';
import { CandidateService } from '../../../services/candidate.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [[FormsModule, CommonModule],],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private candidateService:CandidateService,private router:Router) {}

  login(username: string, password: string) {
    this.candidateService.login(username, password).subscribe(
      (response: any) => {
        console.log('Login response:', response);

        if (response.userType === 'admin') {
          this.router.navigate(['/candidate']);
        } else if (response.userType === 'user') {
          this.router.navigate(['/add']);
        } else {
          this.errorMessage = 'Invalid user type.';
        }
      },
      (error: any) => {
        console.error('Login error:', error);
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    );
  }

}
