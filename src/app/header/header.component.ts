import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isShown:boolean=false;
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void { 
    console.log('this is Header page');
  }

    /**
   * 
   * @param userId ,
   * @returns 
   */
     goTo(page:string): Promise<boolean> {
      return this.router.navigate([page]);
    }

}
