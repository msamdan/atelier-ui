import { Component, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TuiButton, TuiInput, TuiTextfield } from "@taiga-ui/core";
import { TuiSwitch } from "@taiga-ui/kit";
import { radii, type Accent } from "atelier-theme";
import { ThemeService } from "../ui/theme.service";
import { Icon } from "../ui/icon";
export const routeMeta = { title: "Theme studio · Atelier UI" };
@Component({
  imports: [FormsModule, TuiButton, TuiInput, TuiTextfield, TuiSwitch, Icon],
  template: `
    <div class="page-heading">
      <div>
        <div class="eyebrow">DESIGN SYSTEM / THEME</div>
        <h1>Your brand. Your signature<span class="heading-dot">.</span></h1>
        <p>
          Design once. Bring it to every project. See changes across the app
          instantly.
        </p>
      </div>
      <button tuiButton appearance="outline" size="s" (click)="download()">
        <ui-icon name="download" /> Export theme
      </button>
    </div>
    <div class="theme-layout">
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2>Appearance</h2>
            <p>Small adjustments. A big difference.</p>
          </div>
          <ui-icon name="sliders-horizontal" />
        </div>
        <div class="component-body">
          <label class="control-row"
            ><span
              ><strong>Dark mode</strong
              ><small>Balanced contrast, easy on the eyes.</small></span
            ><input
              tuiSwitch
              type="checkbox"
              [ngModel]="theme.dark()"
              (ngModelChange)="theme.dark.set($event)"
          /></label>
          <div class="separator"></div>
          <h3>Accent color</h3>
          <p class="muted">For charts, states, and interactions.</p>
          <div class="swatches">
            @for (color of colors; track color.id) {
              <button
                [style.--swatch]="color.hex"
                [class.chosen]="theme.accent() === color.id"
                [attr.aria-label]="color.label"
                [attr.aria-pressed]="theme.accent() === color.id"
                (click)="theme.accent.set(color.id)"
              >
                @if (theme.accent() === color.id) {
                  <ui-icon name="check" />
                }
              </button>
            }
          </div>
          <div class="separator"></div>
          <h3>Corner radius</h3>
          <div class="radius-options">
            @for (r of radii; track r) {
              <button
                [class.selected]="theme.radius() === r"
                (click)="theme.radius.set(r)"
              >
                {{ r }} px
              </button>
            }
          </div>
          <div class="separator"></div>
          <button
            tuiButton
            appearance="outline"
            size="s"
            (click)="
              theme.dark.set(false);
              theme.accent.set('green');
              theme.radius.set('8')
            "
          >
            <ui-icon name="rotate-ccw" /> Reset to defaults
          </button>
        </div>
      </section>
      <div>
        <section class="panel preview-card">
          <div class="panel-header">
            <div>
              <span class="eyebrow">LIVE PREVIEW</span>
              <h2>Your next great project.</h2>
              <p>Every piece speaks the same language.</p>
            </div>
            <span class="badge success"><i></i>Ready</span>
          </div>
          <div class="component-body">
            <div class="preview-metric">
              <span>Total revenue</span
              ><strong>$284,580 <small>↗ 18.6%</small></strong>
              <div class="mini-bars">
                @for (
                  h of [35, 48, 40, 63, 51, 76, 65, 81, 72, 94, 83, 100];
                  track $index
                ) {
                  <i [style.height.%]="h"></i>
                }
              </div>
            </div>
            <label class="stack-form"
              >Project name<tui-textfield
                ><input
                  tuiInput
                  placeholder="A great idea…"
                  [(ngModel)]="project" /></tui-textfield
            ></label>
            <div class="button-row preview-actions">
              <button
                tuiButton
                appearance="primary"
                size="s"
                (click)="created.set(true)"
              >
                Create project <ui-icon name="arrow-right" /></button
              ><button
                tuiButton
                appearance="outline"
                size="s"
                (click)="project = ''; created.set(false)"
              >
                Cancel
              </button>
            </div>
            @if (created()) {
              <p class="inline-notice" role="status">
                <ui-icon name="circle-check" />
                {{ project || "New project" }} preview created.
              </p>
            }
          </div>
        </section>
        <p class="demo-note muted">
          Your theme preferences are saved in this browser. The exported JSON
          contains your selected settings.
        </p>
      </div>
    </div>
    <section class="panel token-panel">
      <div class="panel-header">
        <div>
          <h2>A shared design language</h2>
          <p>Application styles and Taiga UI share the same semantic tokens.</p>
        </div>
        <code>atelier-theme</code>
      </div>
      <div class="token-grid">
        @for (t of tokens; track t.name) {
          <div>
            <span
              class="token-color"
              [style.background]="'var(' + t.css + ')'"
            ></span
            ><strong>{{ t.name }}</strong
            ><code>{{ t.css }}</code>
          </div>
        }
      </div>
    </section>
  `,
})
export default class Theme {
  theme = inject(ThemeService);
  project = "";
  created = signal(false);
  radii = radii;
  colors: { id: Accent; hex: string; label: string }[] = [
    { id: "green", hex: "#218563", label: "Emerald" },
    { id: "blue", hex: "#4779cf", label: "Blue" },
    { id: "violet", hex: "#8b5cf6", label: "Violet" },
    { id: "orange", hex: "#da7532", label: "Orange" },
  ];
  tokens = [
    { name: "Background", css: "--bg" },
    { name: "Surface", css: "--surface" },
    { name: "Text", css: "--text" },
    { name: "Muted text", css: "--muted" },
    { name: "Border", css: "--border" },
    { name: "Accent", css: "--accent" },
  ];
  download() {
    const a = document.createElement("a");
    const url = URL.createObjectURL(
      new Blob(
        [
          JSON.stringify(
            {
              dark: this.theme.dark(),
              accent: this.theme.accent(),
              radius: this.theme.radius(),
            },
            null,
            2,
          ),
        ],
        { type: "application/json" },
      ),
    );
    a.href = url;
    a.download = "atelier-theme.json";
    a.click();
    URL.revokeObjectURL(url);
  }
}
