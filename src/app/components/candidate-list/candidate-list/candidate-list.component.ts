import { Component } from '@angular/core';
import { CandidateService } from '../../../services/candidate.service';
import { FormsModule } from '@angular/forms';
import { Audiolist } from '../../../model/audiolist.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.css'
})
export class CandidateListComponent {

  audiolist: Audiolist = {
      name: [],
      candidateId: ''
  }

  submitted = false;
  showAudio = false;
  audioSrc: string | null = null;
  constructor(private candidateService:CandidateService) {}

  getAllAudioList(id: string): void {
    this.submitted = true;
    this.candidateService.getAudioName(id).subscribe({
      next: (data) => {
        this.audiolist = data;
        console.log(data);
      },
    });
  }

  playAudio(name:String) {
      console.log("Inside play audio");
      this.showAudio = true;
      this.candidateService.downloadFile(name).subscribe(blob => {
      const downloadLink = document.createElement('a');
      const blobdata = new Blob([blob], { type: 'audio/wav' });
      const url = window.URL.createObjectURL(blobdata);
      downloadLink.href = url;
      downloadLink.download = <string>name;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(downloadLink);
    });
  }

}
