import { Component, inject, input, computed, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TuiCheckbox } from "@taiga-ui/core";
import { DemoData } from "./data";
import { Icon } from "./icon";
@Component({
  selector: "customer-table",
  imports: [FormsModule, TuiCheckbox, Icon],
  template: ` <div class="table-scroll">
      <table>
        <thead>
          <tr>
            <th class="check-cell">
              <input
                tuiCheckbox
                type="checkbox"
                aria-label="Select all customers"
                [ngModel]="allSelected()"
                (ngModelChange)="toggleAll($event)"
              />
            </th>
            <th>
              <button
                class="plain sort-button"
                (click)="ascending.set(!ascending())"
              >
                Customer <ui-icon name="arrow-down-up" />
              </button>
            </th>
            <th>Status</th>
            <th>Plan</th>
            <th class="align-right">Monthly revenue</th>
          </tr>
        </thead>
        <tbody>
          @for (c of rows(); track c.email) {
            <tr>
              <td class="check-cell">
                <input
                  tuiCheckbox
                  type="checkbox"
                  [attr.aria-label]="c.name + ' selected'"
                  [ngModel]="selected().includes(c.email)"
                  (ngModelChange)="toggle(c.email, $event)"
                />
              </td>
              <td>
                <div class="person">
                  <span [class]="'avatar ' + c.color">{{ c.initials }}</span>
                  <div>
                    <strong>{{ c.name }}</strong
                    ><small>{{ c.email }}</small>
                  </div>
                </div>
              </td>
              <td>
                <span
                  [class]="
                    'badge ' + (c.status === 'Active' ? 'success' : 'warning')
                  "
                  ><i></i>{{ c.status }}</span
                >
              </td>
              <td>
                <span class="plan">{{ c.plan }}</span>
              </td>
              <td class="align-right money">{{ c.amount }}</td>
            </tr>
          } @empty {
            <tr>
              <td colspan="5" class="empty">No customers match your search.</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
    <div class="table-footer">
      <span>{{
        selected().length
          ? selected().length + " customers selected"
          : rows().length + " customers shown"
      }}</span
      ><span>Sample data · September 2026</span>
    </div>`,
})
export class CustomerTable {
  data = inject(DemoData);
  query = input("");
  status = input("All");
  selected = signal<string[]>([]);
  ascending = signal(true);
  rows = computed(() =>
    this.data
      .customers()
      .filter(
        (c) =>
          (c.name + " " + c.email)
            .toLocaleLowerCase("en")
            .includes(this.query().toLocaleLowerCase("en")) &&
          (this.status() === "All" || c.status === this.status()),
      )
      .sort((a, b) =>
        this.ascending()
          ? a.name.localeCompare(b.name, "en")
          : b.name.localeCompare(a.name, "en"),
      ),
  );
  allSelected = computed(
    () =>
      this.rows().length > 0 &&
      this.rows().every((c) => this.selected().includes(c.email)),
  );
  toggle(email: string, on: boolean) {
    this.selected.update((v) =>
      on ? [...new Set([...v, email])] : v.filter((e) => e !== email),
    );
  }
  toggleAll(on: boolean) {
    this.selected.set(on ? this.rows().map((c) => c.email) : []);
  }
}
