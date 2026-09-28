import { Injectable, signal } from "@angular/core";
export interface Customer {
  name: string;
  email: string;
  initials: string;
  color: string;
  plan: string;
  status: string;
  amount: string;
}
@Injectable({ providedIn: "root" })
export class DemoData {
  customers = signal<Customer[]>([
    {
      name: "Olivia Martin",
      email: "olivia@example.com",
      initials: "OM",
      color: "lilac",
      plan: "Pro",
      status: "Active",
      amount: "$2,400.00",
    },
    {
      name: "Jackson Lee",
      email: "jackson@example.com",
      initials: "JL",
      color: "peach",
      plan: "Enterprise",
      status: "Active",
      amount: "$8,900.00",
    },
    {
      name: "Sofia Davis",
      email: "sofia@example.com",
      initials: "SD",
      color: "mint",
      plan: "Pro",
      status: "Active",
      amount: "$2,400.00",
    },
    {
      name: "Noah Williams",
      email: "noah@example.com",
      initials: "NW",
      color: "blue",
      plan: "Starter",
      status: "Pending",
      amount: "$890.00",
    },
    {
      name: "Emma Wilson",
      email: "emma@example.com",
      initials: "EW",
      color: "rose",
      plan: "Pro",
      status: "Active",
      amount: "$2,400.00",
    },
  ]);
}
