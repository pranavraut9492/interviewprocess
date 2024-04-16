import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from '../model/candidate.model';
import { Audiolist } from '../model/audiolist.model';

const sqlUrl = 'http://localhost:8081/interview/addCandidate';
const cosmosUrl = 'http://localhost:8080/audio/upload';
const audioUrl = 'http://localhost:8080/audio';
const loginUrl = 'http://localhost:8081/login/verifyUser';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Candidate[]> {
    console.log("inside getall")
    return this.http.get<Candidate[]>(sqlUrl);
  }

  create(data: any): Observable<any> {
    return this.http.post(sqlUrl, data);
  }

  sendAudio(audioData: FormData) {
    return this.http.post(cosmosUrl, audioData);
  }

  getAudioName(id: any): Observable<Audiolist> {
    return this.http.get<Audiolist>(`${audioUrl}/downloadName/${id}`);
  }

  downloadFile(name: String): Observable<any> {
    console.log("Inside")
    const url = `${audioUrl}/downloadFile/${name}`;
    return this.http.get(url, {
      responseType: 'arraybuffer'
    });
  }

  login(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    return this.http.post<any>(loginUrl, credentials, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
