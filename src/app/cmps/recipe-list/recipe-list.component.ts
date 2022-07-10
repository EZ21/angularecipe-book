import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('Hamburger', 'The Big-Fat burger.', 'https://www.thespruceeats.com/thmb/0GBQylFVXB8zizcHIHVrXlBdS2k=/5089x2863/smart/filters:no_upscale()/slow-cooker-hamburgers-recipe-for-kids-2098104-hero-01-3dd9bf2b2ca748358047f2ff4e73b64c.jpg'),
    new Recipe('Schnitzel', 'A tasty schnitzel.', 'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG'),
  ];

  constructor() { };

  ngOnInit(): void {
  };
};