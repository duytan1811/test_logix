import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { BaseSearchModel } from "src/app/shared/models/base-search.model";
import { VideoModel } from "../models/video.model";
import { DashboardService } from "../services/dashboard.service";

@Injectable({
	providedIn: 'root',
})
export class DashboardState implements OnDestroy {
	unSub = new Array<Subscription>();

	private _videos: BehaviorSubject<Array<VideoModel>> = new BehaviorSubject(Array());
	public videos: Observable<Array<VideoModel>> = this._videos.asObservable();

	private _video: BehaviorSubject<VideoModel> = new BehaviorSubject(Object());
	public video: Observable<VideoModel> = this._video.asObservable();

	private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
	public isLoading: Observable<boolean> = this._isLoading.asObservable();

	getVideos() {
		return this._videos.getValue();
	}

	getVideo() {
		return this._video.getValue();
	}

	constructor(
		private dashboardService: DashboardService) {
      this.search(new BaseSearchModel<VideoModel>);
	}

	search(data: BaseSearchModel<VideoModel>) {
		this._isLoading.next(true);
		const sub = this.dashboardService.search(data)
			.subscribe((res: any) => {
				if (res && res.data) {
					let startIndex = data.paginator.page * data.paginator.pageSize;
					res.data.forEach((video: any) => {
						video.index = ++startIndex;
					});
					this._videos.next(res.data);
				}

			});
		this._isLoading.next(false);
		this.unSub.push(sub);
	}

  update(id:string,data:any){
    this._isLoading.next(true);
		const sub = this.dashboardService.update(id,data)
			.subscribe((res: any) => {
				console.log(res);
			});
		this._isLoading.next(false);
		this.unSub.push(sub);
  }

	ngOnDestroy() {
		this.unSub.forEach((sb) => sb.unsubscribe());
	}
}