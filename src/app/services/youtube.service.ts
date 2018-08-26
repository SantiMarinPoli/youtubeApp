import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private urlYouTube:string = "https://www.googleapis.com/youtube/v3";
  private apikey:string = "AIzaSyCOOEKReFfD23vURVKauPYnPs1j4NUdTnA";
  private playlist:string = "UUuaPTYj15JSkETGnEseaFFg";
  private nextPageToken:string = "";

  constructor(public http:Http) { }

  getVideos(){

	  let url = `${this.urlYouTube}/playlistItems`;
	  let params = new URLSearchParams();

	  params.set('part','snippet');
	  params.set('maxResults','10');
	  params.set('playlistId',this.playlist);
	  params.set('key',this.apikey);

	  if (this.nextPageToken) {
	  	params.set('pageToken',this.nextPageToken);
	  }

	  return this.http.get(url,{search: params})
	  			.pipe(map(res=>{
	  						// console.log(res.json());
	  						this.nextPageToken = res.json().nextPageToken;

	  						let videos:any[] = [];

	  						for(let video of res.json().items){
	  							let snippets = video.snippet;
	  							videos.push(snippets);
	  						}

	  						return videos;

	 					   }));


  }
}
