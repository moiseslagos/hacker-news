import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { News } from '../../interfaces/news';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lista_language = [
    { id:0, language: 'Angular', ico: '/assets/images/ico-angular.png' },
    { id:1, language: 'React', ico: '/assets/images/ico-react.png' },
    { id:2, language: 'Vuejs', ico: '/assets/images/ico-vuejs.png' },
  ];
  public isValue:string = 'all';
  public language:string = 'angular';
  public currentPage:number = 0;
  public preload:boolean = false;

  public list_news:News[] = [];
  public temp_news:News[] = [];
  public favesLocalStorage:News[] = [];

  public favorites:News[] = [];

  constructor( private homeService:HomeService ) {

  }

  ngOnInit() {
    //set localstorage language
    localStorage.setItem('language', this.language);

    //checking if exist favorites on localstorage
    this.favorites = JSON.parse( localStorage.getItem('favorites') ) || null;

    //loading search
    this.loadNews(this.language, this.currentPage);
    
  }

  loadNews( language:string, page:number=0 ){
    this.preload = true;
    if(this.favorites){
      this.favesLocalStorage = this.favorites;
    }
    this.homeService.getSearch({language:language, page:page}).subscribe(
      (result)=>{
        this.list_news = this.list_news.concat(result.hits);

        this.list_news = this.list_news.filter( news => news.story_id !== null );        
        if(this.favorites){
          this.list_news = this.list_news.map(news => {
            const merge = this.favorites.find(fav => fav.story_id === news.story_id);
            return { ...news, ...merge };
          });
        }
        this.temp_news = this.list_news;
        console.log(this.list_news);
        this.preload = false;
      },
      (error)=>{
        //error notification
      }
    )
  }

  faves(story_id:number){
    //active favorite
    this.activeFavorite(story_id);

    //checking & save local Storage
    this.verifyIfExistLocalStorage(story_id);
  }

  activeFavorite(story_id:number){
    this.list_news.map( news => {
      if( news.story_id === story_id){
        news.favorite = !news.favorite;
      }
    });
  }

  verifyIfExistLocalStorage(story_id:number){
    //valid if key exist
    const repetNews = this.favesLocalStorage.filter( news => news.story_id === story_id )[0];
    if(!repetNews){
      //save news local temporal
      const news = this.list_news.filter( news => news.story_id === story_id )[0];
      this.favesLocalStorage.push(news);
    }else{
      //remove news of local temporal
      this.favesLocalStorage = this.favesLocalStorage.filter( news => news.story_id !== story_id );
    }
    localStorage.setItem( 'favorites', JSON.stringify(this.favesLocalStorage) );
    console.log(this.favesLocalStorage);
  }


  showNewsOption(option:string){
    this.isValue = option;
    console.log(this.isValue);
    if(option==='myFaves'){
      this.list_news = this.favesLocalStorage;
    }else{
      this.list_news = this.temp_news;
    }
  }

  changeLanguage(language:string){
    localStorage.setItem('language', language.toLocaleLowerCase());
    this.currentPage = 0;
    this.list_news = [];
    if(language !== this.language){
      this.loadNews(language.toLocaleLowerCase(), this.currentPage);
    }
  }


  onScroll(){
    console.log("scroll");
    this.currentPage = this.currentPage + 1;
    this.loadNews(this.language, this.currentPage);
  }


}
