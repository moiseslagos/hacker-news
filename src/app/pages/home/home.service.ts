import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Search } from '../../interfaces/search';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private _http: HttpClient) { }

  getSearch( { language, page } ){
    return this._http.get<Search>(`${environment.baseUrl}api/v1/search_by_date?query=${language}&page=${page}`)
  }
}
