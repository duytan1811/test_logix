import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class BaseApiService {
	private readonly apiEndpoint: string;
	private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
	constructor(private http: HttpClient) {
		this.apiEndpoint = environment.apiUrl;
	}

	getHeaders(extra: any) {
		const tokenData = localStorage.getItem(this.authLocalStorageToken);
		if (tokenData) {
			const authData = JSON.parse(tokenData);
			const token = `${authData.token}`;

			return new HttpHeaders({
				Authorization: token,
				...extra,
			});
		}
	}

	getData<T>(url: string, extra?: any) {
		const httpOptions = {
			headers: this.getHeaders(extra),
		};

		const endpoint = `${this.apiEndpoint}/${url}`;
		return this.http.get<T>(endpoint, httpOptions);
	}

	putData<T>(url: string, data: any, extra?: any) {
		const httpOptions = {
			headers: this.getHeaders(extra),
		};

		const endpoint = `${this.apiEndpoint}/${url}`;
		return this.http.put<T>(endpoint, data, httpOptions);
	}

	postData<T>(url: string, data: any, extra?: any) {
		const httpOptions = {
			headers: this.getHeaders(extra),
		};

		const endpoint = `${this.apiEndpoint}/${url}`;
		return this.http.post<T>(endpoint, data, httpOptions);
	}

	deleteData<T>(url: string, extra?: any) {
		const httpOptions = {
			headers: this.getHeaders(extra),
		};

		const endpoint = `${this.apiEndpoint}/${url}`;
		return this.http.delete<T>(endpoint, httpOptions);
	}
}
