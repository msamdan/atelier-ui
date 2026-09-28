import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  TuiButton,
  TuiCheckbox,
  TuiRadio,
  TuiTextfield,
  TuiInput,
  TuiDialog,
  TuiSlider,
} from "@taiga-ui/core";
import { TuiSwitch } from "@taiga-ui/kit";
import { Icon } from "../ui/icon";
export const routeMeta = { title: "Components · Atelier UI" };
@Component({
  imports: [
    FormsModule,
    TuiButton,
    TuiCheckbox,
    TuiRadio,
    TuiTextfield,
    TuiInput,
    TuiDialog,
    TuiSlider,
    TuiSwitch,
    Icon,
  ],
  template: `
    <div class="page-heading">
      <div>
        <div class="eyebrow">DESIGN SYSTEM / COMPONENTS</div>
        <h1>Small pieces. Big ideas<span class="heading-dot">.</span></h1>
        <p>
          The power of Taiga UI, with a clean and consistent design language.
        </p>
      </div>
      <span class="tech-tag"
        ><span class="live-dot"></span> Built with real Taiga UI
        components</span
      >
    </div>
    <div class="component-grid">
      <section class="panel component-panel">
        <div class="panel-header">
          <div>
            <h2>Buttons</h2>
            <p>The right emphasis for every action.</p>
          </div>
          <code>TuiButton</code>
        </div>
        <div class="component-body">
          <div class="button-row">
            <button
              tuiButton
              appearance="primary"
              size="s"
              (click)="notify('Primary button clicked')"
            >
              Primary <ui-icon name="arrow-right" /></button
            ><button
              tuiButton
              appearance="outline"
              size="s"
              (click)="notify('Secondary button clicked')"
            >
              Secondary</button
            ><button
              tuiButton
              appearance="flat"
              size="s"
              (click)="notify('Ghost button clicked')"
            >
              Ghost</button
            ><button
              tuiButton
              appearance="destructive"
              size="s"
              (click)="dialog.set(true)"
            >
              Delete
            </button>
          </div>
          <div class="button-row">
            <button
              tuiButton
              appearance="primary"
              size="m"
              (click)="notify('Saved')"
            >
              <ui-icon name="plus" /> Create new</button
            ><button tuiButton appearance="outline" size="s" disabled>
              Disabled</button
            ><button
              tuiButton
              appearance="outline"
              size="s"
              aria-label="Add to favorites"
              (click)="notify('Added to favorites')"
            >
              <ui-icon name="heart" />
            </button>
          </div>
        </div>
      </section>
      <section class="panel component-panel">
        <div class="panel-header">
          <div>
            <h2>Text fields</h2>
            <p>Clear labels. Effortless input.</p>
          </div>
          <code>TuiTextfield</code>
        </div>
        <div class="component-body stack-form">
          <label
            >Email address<tui-textfield
              ><input
                tuiInput
                placeholder="hello@example.com"
                [(ngModel)]="email"
                type="email" /></tui-textfield></label
          ><label
            >Workspace<tui-textfield
              ><input
                tuiInput
                value="Atelier Studio"
                [readonly]="true" /></tui-textfield
            ><small class="muted">This field is read-only.</small></label
          >
        </div>
      </section>
      <section class="panel component-panel">
        <div class="panel-header">
          <div>
            <h2>Selection controls</h2>
            <p>Small details. Consistent experiences.</p>
          </div>
          <code>Taiga forms</code>
        </div>
        <div class="component-body">
          <label class="control-row"
            ><span
              ><strong>Email notifications</strong
              ><small>Stay informed about important updates.</small></span
            ><input tuiSwitch type="checkbox" [(ngModel)]="notifications"
          /></label>
          <div class="separator"></div>
          <label class="check-label"
            ><input tuiCheckbox type="checkbox" [(ngModel)]="checked" /> I agree
            to the terms (demo)</label
          >
          <div class="radio-group">
            <label class="check-label"
              ><input
                tuiRadio
                type="radio"
                name="billing"
                value="monthly"
                [(ngModel)]="billing"
              />
              Monthly</label
            ><label class="check-label"
              ><input
                tuiRadio
                type="radio"
                name="billing"
                value="annual"
                [(ngModel)]="billing"
              />
              Yearly <span class="badge success">Save 20%</span></label
            >
          </div>
        </div>
      </section>
      <section class="panel component-panel">
        <div class="panel-header">
          <div>
            <h2>Badges and avatars</h2>
            <p>Communicate status at a glance.</p>
          </div>
          <code>CSS tokens</code>
        </div>
        <div class="component-body">
          <div class="button-row">
            <span class="badge success"><i></i>Active</span
            ><span class="badge warning"><i></i>Pending</span
            ><span class="badge danger">Failed</span
            ><span class="badge neutral">Draft</span
            ><span class="plan">Pro</span>
          </div>
          <div class="separator"></div>
          <div class="button-row">
            <div class="avatar-stack">
              <span class="avatar lilac">OM</span
              ><span class="avatar peach">JL</span
              ><span class="avatar mint">SD</span
              ><span class="avatar neutral">+8</span>
            </div>
            <span class="muted">Build great things together.</span>
          </div>
        </div>
      </section>
      <section class="panel component-panel">
        <div class="panel-header">
          <div>
            <h2>Dialogs and notifications</h2>
            <p>The right feedback at the right time.</p>
          </div>
          <code>TuiDialog</code>
        </div>
        <div class="component-body">
          <div class="inline-notice">
            <ui-icon name="circle-check" />
            <div>
              <strong>You are all set!</strong>
              <p>Your design system is ready for your next project.</p>
            </div>
          </div>
          <div class="button-row">
            <button
              tuiButton
              appearance="outline"
              size="s"
              (click)="dialog.set(true)"
            >
              Open dialog <ui-icon name="external-link" /></button
            ><button
              tuiButton
              appearance="outline"
              size="s"
              (click)="notify('Your changes have been saved.')"
            >
              Show notification
            </button>
          </div>
        </div>
      </section>
      <section class="panel component-panel">
        <div class="panel-header">
          <div>
            <h2>Sliders and progress</h2>
            <p>Adjust values intuitively.</p>
          </div>
          <code>TuiSlider</code>
        </div>
        <div class="component-body">
          <label class="control-row" for="capacity"
            ><strong>Storage usage</strong
            ><span>{{ capacity }} / 100 GB</span></label
          ><input
            id="capacity"
            tuiSlider
            type="range"
            [(ngModel)]="capacity"
            [min]="0"
            [max]="100"
          />
          <div class="separator"></div>
          <div class="control-row">
            <span>Project completion</span><strong>{{ capacity }}%</strong>
          </div>
          <progress [value]="capacity" max="100"></progress
          ><small class="muted">Drag the slider to adjust the value.</small>
        </div>
      </section>
    </div>
    <ng-template
      [(tuiDialog)]="dialog"
      [tuiDialogOptions]="{ label: 'Ready to simplify?', size: 's' }"
      ><p class="muted">
        This is a demo confirmation dialog. Confirm to see a notification. No
        data will be deleted.
      </p>
      <div class="form-actions">
        <button
          tuiButton
          appearance="outline"
          size="s"
          (click)="dialog.set(false)"
        >
          Cancel</button
        ><button
          tuiButton
          appearance="primary"
          size="s"
          (click)="dialog.set(false); notify('Action confirmed.')"
        >
          Confirm
        </button>
      </div></ng-template
    >
    @if (toast()) {
      <div class="toast" role="status">
        <ui-icon name="circle-check" />{{ toast() }}
      </div>
    }
  `,
})
export default class Components {
  email = "";
  notifications = true;
  checked = true;
  billing = "monthly";
  capacity = 64;
  dialog = signal(false);
  toast = signal("");
  timer?: ReturnType<typeof setTimeout>;
  notify(message: string) {
    clearTimeout(this.timer);
    this.toast.set(message);
    this.timer = setTimeout(() => this.toast.set(""), 3500);
  }
}
