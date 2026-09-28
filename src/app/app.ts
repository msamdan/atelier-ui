import { Component, inject, signal } from "@angular/core";
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";
import { TuiRoot } from "@taiga-ui/core";
import { Icon } from "./ui/icon";
import { DemoData } from "./ui/data";
import { ThemeService } from "./ui/theme.service";
@Component({
  selector: "app-root",
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TuiRoot, Icon],
  template: ` <tui-root
    ><div class="app-shell">
      @if (mobile()) {
        <button
          class="sidebar-backdrop"
          aria-label="Close menu"
          (click)="mobile.set(false)"
        ></button>
      }
      <aside class="sidebar" [class.mobile-open]="mobile()">
        <a class="brand" routerLink="/"
          ><span class="brand-mark">a<span>✳</span></span
          ><span>atelier<span class="brand-dot">.</span></span
          ><span class="version">UI</span></a
        >
        <button class="workspace" (click)="workspaceOpen.set(!workspaceOpen())">
          <span class="workspace-icon"><ui-icon name="layers" /></span
          ><span
            ><strong>Atelier Studio</strong><small>Pro workspace</small></span
          ><ui-icon name="chevrons-up-down" />
        </button>
        @if (workspaceOpen()) {
          <div class="workspace-menu">
            <strong
              >Atelier Studio <span class="badge success">Active</span></strong
            >
            <p>This demo includes one workspace.</p>
          </div>
        }
        <div class="nav-label">WORKSPACE</div>
        <nav aria-label="Main navigation">
          @for (item of nav; track item.path) {
            <a
              [routerLink]="item.path"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: true }"
              (click)="mobile.set(false)"
              ><ui-icon [name]="item.icon" /><span>{{ item.label }}</span>
              @if (item.count) {
                <span class="nav-count">{{ data.customers().length }}</span>
              }
            </a>
          }
        </nav>
        <div class="nav-label second">DESIGN SYSTEM</div>
        <nav aria-label="Design system">
          <a
            routerLink="/components"
            routerLinkActive="active"
            (click)="mobile.set(false)"
            ><ui-icon name="blocks" /><span>Components</span
            ><span class="nav-dot"></span></a
          ><a
            routerLink="/theme"
            routerLinkActive="active"
            (click)="mobile.set(false)"
            ><ui-icon name="palette" /><span>Theme studio</span></a
          >
        </nav>
        <div class="sidebar-bottom">
          <div class="starter-note">
            <span class="tiny-title"
              ><ui-icon name="sparkles" /> Your next great project.</span
            >
            <p>One theme. Endless possibilities.</p>
            <a routerLink="/theme"
              >Customize theme <ui-icon name="arrow-up-right"
            /></a>
          </div>
          <a class="profile" routerLink="/settings"
            ><span class="avatar profile-avatar">AM</span
            ><span
              ><strong>Alex Morgan</strong><small>Personal account</small></span
            ><ui-icon name="chevrons-up-down"
          /></a>
        </div>
      </aside>
      <div class="main-shell">
        <header class="topbar">
          <div class="breadcrumb">
            <button
              class="icon-button mobile-menu"
              aria-label="Open menu"
              (click)="mobile.set(true)"
            >
              <ui-icon name="menu" /></button
            ><ui-icon name="panel-left" /><span class="crumb-divider">/</span
            ><span>Workspace</span><ui-icon name="chevron-right" /><strong
              >Atelier Studio</strong
            >
          </div>
          <div class="top-actions">
            <span class="live-dot"></span
            ><span class="top-demo">Demo environment</span
            ><span class="top-divider"></span
            ><button
              class="icon-button"
              [attr.aria-label]="
                theme.dark() ? 'Switch to light mode' : 'Switch to dark mode'
              "
              (click)="theme.toggle()"
            >
              <ui-icon [name]="theme.dark() ? 'sun' : 'moon'" /></button
            ><button
              class="icon-button notification-button"
              aria-label="Notifications"
              (click)="notifications.set(!notifications())"
            >
              <ui-icon name="bell" /><i></i></button
            ><a
              routerLink="/settings"
              class="avatar top-avatar"
              aria-label="Account settings"
              >AM</a
            >
          </div>
          @if (notifications()) {
            <div class="notifications">
              <strong>Notifications</strong>
              <p>
                <span class="live-dot"></span> Theme studio is ready to explore.
              </p>
              <small>Demo notification · Just now</small>
            </div>
          }
        </header>
        <main><router-outlet /></main>
        <footer class="app-footer">
          <span
            >Atelier UI <span>·</span> Thoughtfully designed. Built to be
            reused.</span
          ><span
            >Angular <i></i> Analog <i></i> Taiga UI
            <span class="footer-version">v0.1.0</span></span
          >
        </footer>
      </div>
    </div></tui-root
  >`,
})
export class App {
  data = inject(DemoData);
  theme = inject(ThemeService);
  mobile = signal(false);
  notifications = signal(false);
  workspaceOpen = signal(false);
  nav = [
    { path: "/", label: "Overview", icon: "layout-dashboard", count: "" },
    { path: "/customers", label: "Customers", icon: "users", count: "5" },
    { path: "/settings", label: "Settings", icon: "settings-2", count: "" },
  ];
}
