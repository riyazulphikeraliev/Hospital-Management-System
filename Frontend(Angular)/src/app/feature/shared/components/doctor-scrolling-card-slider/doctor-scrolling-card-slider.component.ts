import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '@shared/abstracts/component-base';
import { GetListService } from '../../service/get-list.service';
import { Router } from '@angular/router';
import { IDoctor } from '../../models/doctor.model';



@Component({
  selector: 'app-doctor-scrolling-card-slider',
  templateUrl: './doctor-scrolling-card-slider.component.html',
  styleUrls: ['./doctor-scrolling-card-slider.component.scss']
})
export class DoctorScrollingCardSliderComponent extends ComponentBase {
  currentIndex = 0;
  visibleCards = 5;
  newIndex = 0;
  automaticSlideInterval: any;

  override initVariables(): void {
    this.getlistService.getDoctor().subscribe((val) => {
      this.doctors = val;
     
    });
  }
  override subscribeEvents(): void {

  }
  override load(): void {
 
  }
  override unload(): void {

  }

  constructor( private getlistService:GetListService,private router:Router) { super()}
  doctors: IDoctor[] = [];


  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  override ngOnInit() {
    this.initVariables()
    this.scrollToCurrentIndex();
    this.automaticSlideInterval = setInterval(() => {
      this.currentIndex = Math.min(this.doctors.length - this.visibleCards, this.currentIndex + this.visibleCards);
      this.scrollToCurrentIndex();
    }, 5000);
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Component is in view, add animation if not already animated
          if (!entry.target.classList.contains('animate')) {
            this.addAnimation(entry.target);
          }
        }
      });
    }, options);
    const componentElement = document.querySelector('.doctor-slider');
    if (componentElement) {
      observer.observe(componentElement);
    }
  }
  
  addAnimation(element: Element) {
    element.classList.add('animate');
    setTimeout(() => {
      element.classList.remove('animate');
    }, 20000); 
  }

  viewDetails(id:number) {
    this.router.navigate(['viewdoc',id])
  }

  prevSlide() {
    this.newIndex = Math.max(0, this.currentIndex - this.visibleCards);
    this.currentIndex = Math.max(0, this.currentIndex - this.visibleCards);
    this.scrollToCurrentIndex();
  }

  nextSlide() {
    this.newIndex = Math.min(this.doctors.length - this.visibleCards, this.currentIndex + this.visibleCards);
    this.currentIndex = Math.min(this.doctors.length - this.visibleCards, this.currentIndex + this.visibleCards);
    this.scrollToCurrentIndex();
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  override ngOnDestroy() {
    clearInterval(this.automaticSlideInterval); 
  }
  scrollToCurrentIndex() {
    const cardsContainer = document.querySelector('.cards-container');
    if (cardsContainer) {
      cardsContainer.scrollLeft = this.currentIndex * 900; 
    }
  }  


  ViewAllDoctors(){
this.router.navigate(['getdoc']);
  }



}
