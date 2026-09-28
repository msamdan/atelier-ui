import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
@Component({
  imports: [RouterLink],
  template: `<div class="empty">
    <h1>Page not found.</h1>
    <p>The page you are looking for may have moved.</p>
    <a routerLink="/">Back to overview →</a>
  </div>`,
})
export default class NotFound {}
