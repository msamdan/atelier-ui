import { Component, signal, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TuiButton } from "@taiga-ui/core";
import { Icon } from "../ui/icon";
import { DemoData } from "../ui/data";
import { CustomerTable } from "../ui/customer-table";
export const routeMeta = { title: "Overview · Atelier UI" };
@Component({
  imports: [TuiButton, Icon, CustomerTable, RouterLink],
  template: `
    <div class="page-heading">
      <div>
        <div class="eyebrow">WELCOME TO YOUR WORKSPACE</div>
        <h1>Everything at a glance<span class="heading-dot">.</span></h1>
        <p>
          Stay on top of your business. Make your next move with confidence.
        </p>
      </div>
      <div class="heading-actions">
        <button
          tuiButton
          appearance="outline"
          size="s"
          (click)="exportReport()"
        >
          <ui-icon name="download" /> Download report</button
        ><a tuiButton appearance="primary" size="s" routerLink="/customers"
          ><ui-icon name="plus" /> Add customer</a
        >
      </div>
    </div>
    <div class="overview-toolbar">
      <div class="segmented" aria-label="Dashboard view">
        <button
          [class.selected]="tab() === 'overview'"
          (click)="tab.set('overview')"
        >
          Overview</button
        ><button
          [class.selected]="tab() === 'analytics'"
          (click)="tab.set('analytics')"
        >
          Analytics <span class="new-tag">New</span>
        </button>
      </div>
      <label class="period-control"
        ><ui-icon name="calendar-days" /><select
          aria-label="Report period"
          [value]="period()"
          (change)="period.set($any($event.target).value)"
        >
          <option value="month">Sep 1 – 30, 2026</option>
          <option value="week">Last 7 days</option></select
        ><ui-icon name="chevron-down"
      /></label>
    </div>
    <div class="stats-grid">
      @for (stat of stats; track stat.label; let i = $index) {
        <section class="stat-card">
          <div class="stat-label">
            {{ stat.label }}<ui-icon [name]="stat.icon" />
          </div>
          <div class="stat-value">
            {{ period() === "week" ? stat.week : stat.value }}
          </div>
          <div class="stat-bottom">
            <span class="trend"
              ><ui-icon name="trending-up" />{{ stat.change }}</span
            ><span
              >vs. previous {{ period() === "week" ? "week" : "month" }}</span
            ><svg class="sparkline" viewBox="0 0 90 28" aria-hidden="true">
              <path [attr.d]="sparks[i]" />
            </svg>
          </div>
        </section>
      }
    </div>
    <div class="chart-row">
      <section class="panel revenue-panel">
        <div class="panel-header">
          <div>
            <h2>
              {{
                tab() === "analytics" ? "Visitor analytics" : "Revenue overview"
              }}
            </h2>
            <p>
              {{
                tab() === "analytics"
                  ? "Daily visitor activity on your website."
                  : "Track your revenue over time."
              }}
            </p>
          </div>
          <div class="legend">
            <span class="legend-dot"></span
            >{{ tab() === "analytics" ? "Visitors" : "This period"
            }}<span class="legend-dot previous"></span>Previous period
          </div>
        </div>
        <div class="chart-total">
          {{
            tab() === "analytics"
              ? "24,892"
              : period() === "week"
                ? "$68,240"
                : "$284,580"
          }}<span class="badge success"
            ><ui-icon name="trending-up" /> 18.6%</span
          >
        </div>
        <div
          class="chart"
          role="img"
          [attr.aria-label]="
            tab() === 'analytics'
              ? 'Visitors grew to 24,892 during this period'
              : 'Revenue grew to 284,580 dollars in September'
          "
        >
          <div class="y-labels">
            <span>{{ tab() === "analytics" ? "30k" : "$80k" }}</span
            ><span>{{ tab() === "analytics" ? "20k" : "$60k" }}</span
            ><span>{{ tab() === "analytics" ? "10k" : "$40k" }}</span
            ><span>{{ tab() === "analytics" ? "5k" : "$20k" }}</span
            ><span>0</span>
          </div>
          <div class="plot">
            <svg viewBox="0 0 700 210" preserveAspectRatio="none">
              <defs>
                <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stop-color="var(--accent)"
                    stop-opacity="0.19"
                  />
                  <stop
                    offset="100%"
                    stop-color="var(--accent)"
                    stop-opacity="0.01"
                  />
                </linearGradient>
              </defs>
              <g class="grid-lines">
                <path d="M0 1H700M0 51H700M0 101H700M0 151H700M0 201H700" />
              </g>
              <path
                class="previous-line"
                d="M0 180C30 181 32 154 60 163S95 169 120 144S160 161 190 142S220 151 250 122S290 142 330 122S355 150 390 128S430 121 460 101S500 130 530 105S560 118 590 87S650 97 700 75"
              />
              <path fill="url(#fill)" [attr.d]="line() + ' L700 210 L0 210Z'" />
              <path class="revenue-line" [attr.d]="line()" />
            </svg>
            <div class="x-labels">
              @for (
                label of period() === "week"
                  ? [
                      "Sep 21",
                      "Sep 22",
                      "Sep 23",
                      "Sep 24",
                      "Sep 25",
                      "Sep 26",
                      "Sep 27",
                    ]
                  : [
                      "Sep 1",
                      "Sep 5",
                      "Sep 10",
                      "Sep 15",
                      "Sep 20",
                      "Sep 25",
                      "Sep 30",
                    ];
                track label
              ) {
                <span>{{ label }}</span>
              }
            </div>
          </div>
        </div>
        <div class="chart-caption">
          <ui-icon name="trending-up" /><span
            >Looking good! Your revenue is up
            <strong>18.6% from last period.</strong></span
          >
        </div>
      </section>
      <section class="panel sales-panel">
        <div class="panel-header">
          <div>
            <h2>Recent activity</h2>
            <p>The latest in your workspace.</p>
          </div>
          <span class="badge neutral">Live</span>
        </div>
        <div class="activity-list">
          @for (a of activities; track a.name) {
            <div class="activity">
              <span [class]="'avatar ' + a.color">{{ a.initials }}</span>
              <div class="activity-info">
                <strong>{{ a.name }}</strong
                ><span>{{ a.action }}</span>
              </div>
              <div class="activity-value">
                <strong>{{ a.amount }}</strong
                ><small>{{ a.time }}</small>
              </div>
            </div>
          }
        </div>
        <a class="panel-link" routerLink="/customers"
          >View all customers <ui-icon name="arrow-right"
        /></a>
      </section>
    </div>
    <section class="panel customers-panel">
      <div class="panel-header">
        <div>
          <h2>
            Customers
            <span class="count-badge">{{ data.customers().length }}</span>
          </h2>
          <p>The people growing alongside your business.</p>
        </div>
        <a tuiButton appearance="outline" size="s" routerLink="/customers"
          >View all <ui-icon name="arrow-up-right"
        /></a>
      </div>
      <customer-table />
    </section>
    <div class="design-banner">
      <div class="banner-icon"><ui-icon name="blocks" /></div>
      <div>
        <h3>Powerful foundations. A look of your own.</h3>
        <p>
          Taiga UI components, styled with Atelier. Ready for your next project.
        </p>
      </div>
      <a routerLink="/components"
        >Explore components <ui-icon name="arrow-right"
      /></a>
    </div>
  `,
})
export default class Dashboard {
  data = inject(DemoData);
  tab = signal("overview");
  period = signal("month");
  stats = [
    {
      label: "Total revenue",
      value: "$284,580",
      week: "$68,240",
      change: "18.6%",
      icon: "wallet",
    },
    {
      label: "Active subscriptions",
      value: "2,350",
      week: "548",
      change: "12.8%",
      icon: "credit-card",
    },
    {
      label: "New customers",
      value: "+148",
      week: "+37",
      change: "8.2%",
      icon: "users",
    },
    {
      label: "Conversion rate",
      value: "4.82%",
      week: "5.12%",
      change: "2.4%",
      icon: "mouse-pointer-2",
    },
  ];
  sparks = [
    "M0 23L9 20L17 23L25 15L34 18L42 12L52 14L61 5L70 9L80 2L90 5",
    "M0 24L10 22L18 13L26 18L34 15L45 18L53 8L63 10L71 3L81 6L90 2",
    "M0 25L10 19L20 22L30 12L40 17L50 14L60 17L70 6L80 10L90 3",
    "M0 24L10 21L20 13L30 16L40 8L50 11L60 4L70 8L80 2L90 5",
  ];
  activities = [
    {
      name: "Olivia Martin",
      initials: "OM",
      color: "lilac",
      action: "Upgraded to Pro",
      amount: "+$2,400",
      time: "2 min ago",
    },
    {
      name: "Jackson Lee",
      initials: "JL",
      color: "peach",
      action: "Renewed subscription",
      amount: "+$8,900",
      time: "18 min ago",
    },
    {
      name: "Sofia Davis",
      initials: "SD",
      color: "mint",
      action: "Upgraded to Pro",
      amount: "+$2,400",
      time: "42 min ago",
    },
    {
      name: "Noah Williams",
      initials: "NW",
      color: "blue",
      action: "Joined the workspace",
      amount: "+$890",
      time: "1 hour ago",
    },
    {
      name: "Emma Wilson",
      initials: "EW",
      color: "rose",
      action: "Renewed subscription",
      amount: "+$2,400",
      time: "2 hours ago",
    },
  ];
  line() {
    return this.period() === "week"
      ? "M0 165C50 160 80 190 120 130S180 160 240 95S300 145 360 70S430 95 490 50S570 85 630 20S670 40 700 10"
      : "M0 170C18 170 24 145 46 151S65 170 88 153S110 144 130 153S154 154 176 131S200 148 220 110S246 119 266 104S282 137 310 121S336 140 357 103S374 125 397 100S409 70 436 76S457 104 478 85S502 94 525 51S549 77 571 60S603 66 625 30S653 48 673 21S688 39 700 15";
  }
  exportReport() {
    const csv =
      "Metric;Value;Change\n" +
      this.stats
        .map((s) =>
          [s.label, this.period() === "week" ? s.week : s.value, s.change].join(
            ";",
          ),
        )
        .join("\n");
    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "atelier-report.csv";
    a.click();
    URL.revokeObjectURL(url);
  }
}
