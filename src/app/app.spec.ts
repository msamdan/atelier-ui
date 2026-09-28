import { TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { provideLocationMocks } from "@angular/common/testing";

import { provideTaiga } from "@taiga-ui/core";
import { provideUniversal } from "@ng-web-apis/universal";
import { App } from "./app";

describe("App", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        provideLocationMocks(),
        provideTaiga(),
        provideUniversal(),
      ],
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
