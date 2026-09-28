import { Component, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TuiButton, TuiDialog, TuiTextfield, TuiInput } from "@taiga-ui/core";
import { Icon } from "../ui/icon";
import { CustomerTable } from "../ui/customer-table";
import { DemoData } from "../ui/data";
export const routeMeta = { title: "Customers · Atelier UI" };
@Component({
  imports: [
    FormsModule,
    TuiButton,
    TuiDialog,
    TuiTextfield,
    TuiInput,
    Icon,
    CustomerTable,
  ],
  template: `
    <div class="page-heading">
      <div>
        <div class="eyebrow">WORKSPACE</div>
        <h1>Customers<span class="heading-dot">.</span></h1>
        <p>Build relationships. Grow together.</p>
      </div>
      <button tuiButton appearance="primary" size="s" (click)="open.set(true)">
        <ui-icon name="plus" /> Add customer
      </button>
    </div>
    <section class="panel">
      <div class="panel-header customer-filters">
        <div class="search-field">
          <ui-icon name="search" /><input
            placeholder="Search by name or email…"
            aria-label="Search customers"
            [(ngModel)]="query"
          /><kbd>⌕</kbd>
        </div>
        <label class="filter-select"
          >Status
          <select aria-label="Customer status" [(ngModel)]="status">
            <option>All</option>
            <option>Active</option>
            <option>Pending</option>
          </select></label
        >
      </div>
      <customer-table [query]="query" [status]="status" />
    </section>
    <p class="muted demo-note">
      Demo records live in memory and reset when you refresh the page.
    </p>
    <ng-template
      [(tuiDialog)]="open"
      [tuiDialogOptions]="{ label: 'New customer', size: 'm' }"
      ><form class="stack-form" (ngSubmit)="add()">
        <p class="muted">Add a new customer to your workspace.</p>
        <label
          >Full name<tui-textfield
            ><input
              tuiInput
              name="name"
              [(ngModel)]="name"
              placeholder="e.g. Alex Morgan"
              required /></tui-textfield></label
        ><label
          >Email<tui-textfield
            ><input
              tuiInput
              name="email"
              [(ngModel)]="email"
              type="email"
              placeholder="alex@example.com"
              required /></tui-textfield></label
        ><label
          >Plan<select name="plan" [(ngModel)]="plan">
            <option>Starter</option>
            <option>Pro</option>
            <option>Enterprise</option>
          </select></label
        >
        @if (error()) {
          <p class="error-text" role="alert">{{ error() }}</p>
        }
        <div class="form-actions">
          <button
            tuiButton
            appearance="outline"
            size="s"
            type="button"
            (click)="open.set(false)"
          >
            Cancel</button
          ><button tuiButton appearance="primary" size="s" type="submit">
            Add customer
          </button>
        </div>
      </form></ng-template
    >
    @if (saved()) {
      <div class="toast" role="status">
        <ui-icon name="circle-check" /> Customer added successfully.
      </div>
    }
  `,
})
export default class Customers {
  data = inject(DemoData);
  query = "";
  status = "All";
  open = signal(false);
  name = "";
  email = "";
  plan = "Pro";
  error = signal("");
  saved = signal(false);
  add() {
    if (!this.name.trim() || !/^\S+@\S+\.\S+$/.test(this.email)) {
      this.error.set("Enter a valid name and email address.");
      return;
    }
    if (
      this.data
        .customers()
        .some((c) => c.email.toLowerCase() === this.email.trim().toLowerCase())
    ) {
      this.error.set("This email address is already registered.");
      return;
    }
    this.data.customers.update((c) => [
      ...c,
      {
        name: this.name.trim(),
        email: this.email.trim(),
        initials: this.name
          .trim()
          .split(/\s+/)
          .map((p) => p[0])
          .slice(0, 2)
          .join("")
          .toLocaleUpperCase("en"),
        color: "mint",
        plan: this.plan,
        status: "Active",
        amount:
          this.plan === "Pro"
            ? "$2,400.00"
            : this.plan === "Enterprise"
              ? "$8,900.00"
              : "$890.00",
      },
    ]);
    this.open.set(false);
    this.name = "";
    this.email = "";
    this.error.set("");
    this.query = "";
    this.status = "All";
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 3500);
  }
}
