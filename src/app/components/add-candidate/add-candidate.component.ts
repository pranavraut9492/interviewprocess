import { Component } from '@angular/core';
import { Candidate } from '../../model/candidate.model';
import { CandidateService } from '../../services/candidate.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-candidate',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-candidate.component.html',
  styleUrl: './add-candidate.component.css'
})
export class AddCandidateComponent {

  recorder!: MediaRecorder;
  audioChunks: Blob[] = [];
  audioUrl?: String;
  constructor(private candidateService:CandidateService) {}

  candidate: Candidate = {
    id:'',
    firstName:'',
    lastName:'',
    email:'',
    course:'',
  }
  submitted = false;
  isThankYou = false;

  saveTutorial(): void {
    const data = {
      id:this.candidate.id,
      firstName:this.candidate.firstName,
      lastName:this.candidate.lastName,
      email:this.candidate.email,
      course:this.candidate.course,
    };

    this.candidateService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  startRecording() {
    console.log("Inside Stop Recording")
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        this.recorder = new MediaRecorder(stream);
        this.recorder.ondataavailable = (event) => {
          this.audioChunks.push(event.data);
        };
        this.recorder.start();
      })
      .catch((err) => console.error('Error: ', err));
  }

  stopRecording(recNo:String) {
    console.log("Inside Stop Recording")
    if (this.recorder) {
      this.recorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        this.audioUrl = audioUrl;
        this.audioChunks = [];
        this.sendAudioToServer(audioBlob,recNo);
      };
      this.recorder.stop();
    }
  }

  sendAudioToServer(audioBlob: Blob, recNo: String) {
    console.log("Inside Send audio...."+audioBlob.size)
    const formData = new FormData();
    var fileName = 'recording'+recNo+'.wav';
    formData.append('audio', audioBlob, fileName);

    // Calling service to send data to Java API
     this.candidateService.sendAudio(formData).subscribe(response => {
       console.log('Response from server:', response);
     });
  }

  openThankYou(){
    console.log("Inside Thank You");
    this.submitted = false;
    this.isThankYou = true;
  }


}
