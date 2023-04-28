import { Observable } from 'rxjs';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { VideoModel } from './models/video.model';
import { DashboardState } from './state/dashboard.state';
import { BaseSearchModel } from 'src/app/shared/models/base-search.model';
import { Paginator } from 'src/app/shared/models/paginator.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  paginator = new Paginator();
  videos$: Observable<Array<VideoModel>>;
  videos: Array<VideoModel> = [];
  constructor(private dashboardState: DashboardState) { }

  ngOnInit(): void {
    this.videos$ = this.dashboardState.videos;
    this.dashboardState.videos.subscribe((vds: any) => {
      if (vds) {
        this.videos = vds;
      }
    })
  }

  onLike(id: string) {
    this.dashboardState.update(id, { like: true });
  }

  onDislike(id: string) {
    this.dashboardState.update(id, { dislike: true });
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if (this.bottomReached()) {
      const dataSearch = new BaseSearchModel<VideoModel>();
      this.paginator.page++;
      this.paginator.pageSize = 1;
      dataSearch.paginator = this.paginator;
      this.dashboardState.search(dataSearch);
      this.dashboardState.videos.subscribe((vds: any) => {
        if (vds) {
          vds.forEach((vd: any) => {
            this.videos.push(vd);
          });
        }
      })
    }
  }

  bottomReached(): boolean {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
  }
}
