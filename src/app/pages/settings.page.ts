import { Component, signal, afterNextRender } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TuiButton, TuiInput, TuiTextfield } from "@taiga-ui/core";
import { TuiSwitch } from "@taiga-ui/kit";
import { Icon } from "../ui/icon";
export const routeMeta = { title: "Settings · Atelier UI" };
@Component({
  imports: [FormsModule, TuiButton, TuiInput, TuiTextfield, TuiSwitch, Icon],
  template: `<div class="page-heading">
      <div>
        <div class="eyebrow">WORKSPACE / SETTINGS</div>
        <h1>
          Small changes. A personal touch<span class="heading-dot">.</span>
        </h1>
        <p>Manage your profile and preferences.</p>
      </div>
    </div>
    <form class="settings-layout" (ngSubmit)="save()">
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2>Profile details</h2>
            <p>Make yourself at home.</p>
          </div>
          <span class="avatar profile-avatar">AM</span>
        </div>
        <div class="component-body stack-form">
          <label
            >Full name<tui-textfield
              ><input
                tuiInput
                name="name"
                [(ngModel)]="name"
                required /></tui-textfield></label
          ><label
            >Email<tui-textfield
              ><input
                tuiInput
                name="email"
                [(ngModel)]="email"
                type="email"
                required /></tui-textfield></label
          ><label
            >Role<tui-textfield
              ><input tuiInput name="role" [(ngModel)]="role" /></tui-textfield
          ></label>
          <div class="form-actions">
            <button tuiButton appearance="primary" size="s" type="submit">
              Save changes
            </button>
          </div>
        </div>
      </section>
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2>Notification preferences</h2>
            <p>Choose what matters to you.</p>
          </div>
        </div>
        <div class="component-body">
          <label class="control-row"
            ><span
              ><strong>Product updates</strong
              ><small>Be the first to discover new features.</small></span
            ><input
              tuiSwitch
              type="checkbox"
              name="updates"
              [(ngModel)]="updates"
          /></label>
          <div class="separator"></div>
          <label class="control-row"
            ><span
              ><strong>Weekly digest</strong
              ><small>A weekly summary of your workspace.</small></span
            ><input
              tuiSwitch
              type="checkbox"
              name="digest"
              [(ngModel)]="digest"
          /></label>
          <div class="separator"></div>
          <p class="muted">
            Demo preferences are saved in this browser only. No emails are sent.
          </p>
        </div>
      </section>
    </form>
    @if (saved()) {
      <div class="toast" role="status">
        <ui-icon name="circle-check" /> Your preferences have been saved.
      </div>
    }`,
})
export default class Settings {
  name = "Alex Morgan";
  email = "alex@example.com";
  role = "Product designer";
  updates = true;
  digest = false;
  saved = signal(false);
  constructor() {
    afterNextRender(() => {
      try {
        const s = JSON.parse(
          localStorage.getItem("atelier-demo-profile-v1") || "null",
        );
        if (s) {
          this.name = s.name;
          this.email = s.email;
          this.role = s.role;
          this.updates = s.updates;
          this.digest = s.digest;
        }
      } catch {}
    });
  }
  save() {
    localStorage.setItem(
      "atelier-demo-profile-v1",
      JSON.stringify({
        name: this.name,
        email: this.email,
        role: this.role,
        updates: this.updates,
        digest: this.digest,
      }),
    );
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 3500);
  }
}
