import { TestBed } from "@angular/core/testing";
import { CustomerTable } from "./customer-table";

describe("Customer table", () => {
  it("matches names without case sensitivity and combines the status filter", () => {
    const fixture = TestBed.createComponent(CustomerTable);
    fixture.componentRef.setInput("query", "MARTIN");
    expect(fixture.componentInstance.rows().map((c) => c.name)).toEqual([
      "Olivia Martin",
    ]);
    fixture.componentRef.setInput("status", "Pending");
    expect(fixture.componentInstance.rows()).toHaveLength(0);
  });
  it("selects only visible customers when selecting all", () => {
    const fixture = TestBed.createComponent(CustomerTable);
    fixture.componentRef.setInput("status", "Pending");
    fixture.componentInstance.toggleAll(true);
    expect(fixture.componentInstance.selected()).toEqual(["noah@example.com"]);
    fixture.componentInstance.toggleAll(false);
    expect(fixture.componentInstance.selected()).toEqual([]);
  });
});
