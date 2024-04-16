import { Routes } from '@angular/router';
import { AddCandidateComponent } from './components/add-candidate/add-candidate.component';
import { CandidateListComponent } from './components/candidate-list/candidate-list/candidate-list.component';
import { LoginComponent } from './components/login/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent},
    { path: 'add', component: AddCandidateComponent},
    { path: 'candidate', component: CandidateListComponent},
];
