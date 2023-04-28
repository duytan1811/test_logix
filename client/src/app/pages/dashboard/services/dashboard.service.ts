import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/shared/api/base-api.service';
import { BaseSearchModel } from 'src/app/shared/models/base-search.model';
import { BaseResponse } from 'src/app/shared/models/base-response.model';

const API_VIDEO_URL = 'videos';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiService: BaseApiService;
  constructor(apiService: BaseApiService) {
    this.apiService = apiService;
  }

  search(data: BaseSearchModel<any>): Observable<any> {
    return this.apiService.postData<any>(`${API_VIDEO_URL}/search`, data);
  }

  update(id:string,data: any): Observable<any> {
    return this.apiService.putData<any>(`${API_VIDEO_URL}/${id}`, data);
  }
}