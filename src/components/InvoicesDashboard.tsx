import { useState, useMemo, useEffect } from "react";
import { Invoice, WalletConfig } from "../types";
import {
  DollarSign,
  CheckCircle2,
  Search,
  SlidersHorizontal,
  X,
  Calendar,
  Wallet,
} from "lucide-react";
import PaymentModal from "./PaymentModal";

interface InvoicesDashboardProps {
  invoices: Invoice[];
  onPayInvoice: (invoiceId: string) => void;
  walletConfig: WalletConfig;
}

export default function InvoicesDashboard({
  invoices,
  onPayInvoice,
  walletConfig,
}: InvoicesDashboardProps) {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  // Amount slider range (bounds from data)
  const amountBounds = useMemo(() => {
    if (!invoices.length) return { min: 0, max: 0 };
    const rawMin = Math.min(...invoices.map((i) => i.amount));
    const rawMax = Math.max(...invoices.map((i) => i.amount));
    if (rawMin === rawMax) {
      const pad = Math.max(50, Math.ceil(rawMax * 0.2));
      return { min: Math.max(0, rawMin - pad), max: rawMax + pad };
    }
    return { min: rawMin, max: rawMax };
  }, [invoices]);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [minPrice, setMinPrice] = useState<number>(0);
  useEffect(() => {
    setMaxPrice(amountBounds.max);
    setMinPrice(amountBounds.min);
  }, [amountBounds.min, amountBounds.max]);

  // Date presets
  type DatePreset =
    | "all"
    | "today"
    | "7d"
    | "30d"
    | "this_month"
    | "last_month"
    | "custom";
  const [datePreset, setDatePreset] = useState<DatePreset>("all");
  const [customStart, setCustomStart] = useState<string>("");
  const [customEnd, setCustomEnd] = useState<string>("");

  // Text search (vendor or invoice id)
  const [searchQuery, setSearchQuery] = useState<string>("");
  const normalizedSearch = searchQuery.trim().toLowerCase();

  // Compact filters: collapsible
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);

  // Only unpaid invoices in this component
  const filteredInvoices = useMemo(() => {
    // Resolve date window from preset
    let start: Date | undefined;
    let end: Date | undefined;
    const today = new Date();
    if (datePreset === "today") {
      start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      end = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59,
        999
      );
    } else if (datePreset === "7d") {
      end = new Date();
      start = new Date();
      start.setDate(end.getDate() - 6);
      start.setHours(0, 0, 0, 0);
    } else if (datePreset === "30d") {
      end = new Date();
      start = new Date();
      start.setDate(end.getDate() - 29);
      start.setHours(0, 0, 0, 0);
    } else if (datePreset === "this_month") {
      start = new Date(today.getFullYear(), today.getMonth(), 1);
      end = new Date();
    } else if (datePreset === "last_month") {
      start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      end = new Date(today.getFullYear(), today.getMonth(), 0, 23, 59, 59, 999);
    } else if (datePreset === "custom" && (customStart || customEnd)) {
      start = customStart ? new Date(customStart) : undefined;
      end = customEnd ? new Date(customEnd) : undefined;
      if (end && customEnd) {
        end = new Date(
          end.getFullYear(),
          end.getMonth(),
          end.getDate(),
          23,
          59,
          59,
          999
        );
      }
    }

    return invoices.filter((inv) => {
      if (inv.status !== "unpaid") return false;

      // Amount filter (min/max range)
      if (inv.amount < minPrice || inv.amount > maxPrice) return false;

      // Date filter (Issue Date)
      if (start || end) {
        // Parse DD/MM/YYYY format
        const dateParts = inv.dueDate.split("/");
        if (dateParts.length === 3) {
          const day = parseInt(dateParts[0], 10);
          const month = parseInt(dateParts[1], 10) - 1; // JavaScript months are 0-indexed
          const year = parseInt(dateParts[2], 10);
          const issue = new Date(year, month, day);

          if (start && issue < start) return false;
          if (end && issue > end) return false;
        }
      }

      // Text search filter: matches vendor or invoice id
      if (normalizedSearch) {
        const vendor = inv.vendor?.toLowerCase() ?? "";
        const id = inv.id?.toLowerCase() ?? "";
        if (
          !vendor.includes(normalizedSearch) &&
          !id.includes(normalizedSearch)
        )
          return false;
      }

      return true;
    });
  }, [
    invoices,
    minPrice,
    maxPrice,
    datePreset,
    customStart,
    customEnd,
    normalizedSearch,
  ]);

  // Summary metrics
  const { totalAmountAll } = useMemo(() => {
    const totalAmountAllCalc = invoices.reduce(
      (sum, inv) => sum + inv.amount,
      0
    );
    return { totalAmountAll: totalAmountAllCalc };
  }, [invoices]);
  const unpaidCount = filteredInvoices.length;

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 p-6 lg:p-8 animate-fade-in overflow-auto">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-6 lg:p-8 animate-scale-in border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 lg:mb-6 gap-3 lg:gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    Unpaid Invoices
                  </h1>
                  <p className="text-gray-500 text-xs lg:text-sm mt-0.5">
                    Manage and track your unpaid invoice payments
                  </p>
                </div>
              </div>
            </div>
            {/* Top-right: compact search + filter toggle */}
            <div className="grid grid-cols-2 gap-3 w-full lg:w-auto">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200 shadow-sm hover:shadow-md transition-all duration-200">
                <p className="text-[10px] lg:text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
                  Total Amount
                </p>
                <p className="text-xl lg:text-2xl font-bold text-blue-900">
                  ${totalAmountAll.toLocaleString()}
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200 shadow-sm hover:shadow-md transition-all duration-200">
                <p className="text-[10px] lg:text-xs font-semibold text-orange-600 uppercase tracking-wide mb-1">
                  Total Unpaid
                </p>
                <p className="text-xl lg:text-2xl font-bold text-orange-900">
                  {unpaidCount}
                </p>
              </div>
            </div>
          </div>

          {/* Compact toolbar: search + filter toggle button */}
          <div className="mb-3 lg:mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by vendor or invoice ID"
                className="w-[300px] pl-9 pr-9 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Clear search"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border-2 text-sm transition-all ${
                filtersOpen
                  ? "border-blue-500 text-blue-700 bg-blue-50"
                  : "border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
              title="Toggle filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Filters Panel (collapsible) */}
          {filtersOpen && (
            <div className="mb-4 p-4 bg-white border-2 border-gray-200 rounded-xl shadow-sm animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Date Filter - Compact */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <label className="text-sm font-semibold text-gray-700">
                      Date Range
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: "all", label: "All" },
                      { id: "today", label: "Today" },
                      { id: "7d", label: "7d" },
                      { id: "30d", label: "30d" },
                      { id: "custom", label: "Custom" },
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setDatePreset(p.id as DatePreset)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                          datePreset === (p.id as DatePreset)
                            ? "bg-purple-600 text-white shadow-sm"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                  {datePreset === "custom" && (
                    <div className="mt-2 flex gap-2 animate-fade-in">
                      <input
                        type="date"
                        value={customStart}
                        onChange={(e) => setCustomStart(e.target.value)}
                        className="flex-1 px-2 py-1.5 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        aria-label="From date"
                        placeholder="From"
                      />
                      <input
                        type="date"
                        value={customEnd}
                        onChange={(e) => setCustomEnd(e.target.value)}
                        className="flex-1 px-2 py-1.5 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        aria-label="To date"
                        placeholder="To"
                      />
                    </div>
                  )}
                </div>

                {/* Amount Range Filter - Compact with Working Dual Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-green-600" />
                      <label className="text-sm font-semibold text-gray-700">
                        Amount Range
                      </label>
                    </div>
                    <div className="text-xs font-semibold text-gray-600">
                      ${minPrice.toLocaleString()} - $
                      {maxPrice.toLocaleString()}
                    </div>
                  </div>

                  {/* Dual Range Slider */}
                  <div className="relative h-8 flex items-center">
                    {/* Track */}
                    <div className="absolute w-full h-1.5 bg-gray-200 rounded-full">
                      {/* Active range */}
                      <div
                        className="absolute h-1.5 bg-green-500 rounded-full"
                        style={{
                          left: `${
                            ((minPrice - amountBounds.min) /
                              (amountBounds.max - amountBounds.min)) *
                            100
                          }%`,
                          right: `${
                            100 -
                            ((maxPrice - amountBounds.min) /
                              (amountBounds.max - amountBounds.min)) *
                              100
                          }%`,
                        }}
                      />
                    </div>

                    {/* Min slider */}
                    <input
                      type="range"
                      min={amountBounds.min}
                      max={amountBounds.max}
                      step={10}
                      value={minPrice}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        setMinPrice(Math.min(v, maxPrice - 10));
                      }}
                      className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-green-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-green-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md"
                      aria-label="Minimum amount slider"
                    />

                    {/* Max slider */}
                    <input
                      type="range"
                      min={amountBounds.min}
                      max={amountBounds.max}
                      step={10}
                      value={maxPrice}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        setMaxPrice(Math.max(v, minPrice + 10));
                      }}
                      className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-green-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-green-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md"
                      aria-label="Maximum amount slider"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results count */}
          <div className="mt-3 mb-2 flex items-center gap-2 justify-between ">
            <div className="mb-3 text-sm text-gray-600">
              Showing
              <span
                className={`font-semibold ${
                  filteredInvoices.length === 0
                    ? "text-orange-600"
                    : "text-gray-900"
                }`}
              >
                {filteredInvoices.length}
              </span>{" "}
              {filteredInvoices.length === 1 ? "invoice" : "invoices"}
            </div>
            {(datePreset !== "all" ||
              minPrice !== amountBounds.min ||
              maxPrice !== amountBounds.max ||
              !!normalizedSearch) && (
              <div className="mb-3 flex flex-wrap items-center gap-2 animate-fade-in">
                <span className="text-xs font-semibold text-gray-500">
                  Active Filters:
                </span>
                {normalizedSearch && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    <Search className="w-3 h-3" />"{searchQuery}"
                    <button
                      onClick={() => setSearchQuery("")}
                      className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                      title="Clear search"
                      aria-label="Clear search filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {datePreset !== "all" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    <Calendar className="w-3 h-3" />
                    {datePreset === "custom"
                      ? "Custom Date"
                      : datePreset === "today"
                      ? "Today"
                      : datePreset === "7d"
                      ? "Last 7 days"
                      : datePreset === "30d"
                      ? "Last 30 days"
                      : datePreset === "this_month"
                      ? "This Month"
                      : "Last Month"}
                    <button
                      onClick={() => {
                        setDatePreset("all");
                        setCustomStart("");
                        setCustomEnd("");
                      }}
                      className="hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                      title="Clear date filter"
                      aria-label="Clear date filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {(minPrice !== amountBounds.min ||
                  maxPrice !== amountBounds.max) && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    <Wallet className="w-3 h-3" />${minPrice.toLocaleString()} -
                    ${maxPrice.toLocaleString()}
                    <button
                      onClick={() => {
                        setMinPrice(amountBounds.min);
                        setMaxPrice(amountBounds.max);
                      }}
                      className="hover:bg-green-200 rounded-full p-0.5 transition-colors"
                      title="Clear amount filter"
                      aria-label="Clear amount filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setMinPrice(amountBounds.min);
                    setMaxPrice(amountBounds.max);
                    setDatePreset("all");
                    setCustomStart("");
                    setCustomEnd("");
                    setSearchQuery("");
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-full transition-colors"
                >
                  <X className="w-3 h-3" />
                  Clear All
                </button>
              </div>
            )}
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full min-w-[760px]">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200">
                  <th className="text-left py-3 lg:py-4 px-3 lg:px-4 text-[10px] lg:text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th className="text-left py-3 lg:py-4 px-3 lg:px-4 text-[10px] lg:text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Vendor
                  </th>
                  <th className="text-left py-3 lg:py-4 px-3 lg:px-4 text-[10px] lg:text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-left py-3 lg:py-4 px-3 lg:px-4 text-[10px] lg:text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Issue Date
                  </th>
                  <th className="text-left py-3 lg:py-4 px-3 lg:px-4 text-[10px] lg:text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="text-left py-3 lg:py-4 px-3 lg:px-4 text-[10px] lg:text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                          <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-700 mb-1">
                            No invoices found
                          </p>
                          <p className="text-sm text-gray-500">
                            Try adjusting your filters to see more results
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredInvoices.map((invoice, index) => (
                    <tr
                      key={`${invoice.id}-${index}`}
                      className="border-b border-gray-100 hover:bg-blue-50/60 transition-all duration-200 group animate-fade-in"
                      style={{ animationDelay: `${index * 40}ms` }}
                    >
                      <td className="py-3 lg:py-4 px-3 lg:px-4">
                        <div className="flex items-center gap-2.5 lg:gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                              invoice.status === "paid"
                                ? "bg-gradient-to-br from-green-400 to-green-600"
                                : "bg-gradient-to-br from-blue-500 to-blue-700"
                            }`}
                          >
                            {invoice.status === "paid" ? (
                              <CheckCircle2 className="w-5 h-5 text-white" />
                            ) : (
                              <DollarSign className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <span className="font-semibold text-gray-900">
                            {invoice.id}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 lg:py-4 px-3 lg:px-4">
                        <span className="text-gray-700 font-medium">
                          {invoice.vendor}
                        </span>
                      </td>
                      <td className="py-3 lg:py-4 px-3 lg:px-4">
                        <span className="text-gray-900 font-bold">
                          ${invoice.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 lg:py-4 px-3 lg:px-4 text-gray-600">
                        {invoice.issueDate}
                      </td>
                      <td className="py-2 lg:py-2 px-3 lg:px-4 text-gray-600">
                        <div className="flex items-center gap-2">
                          <span>{invoice.dueDate}</span>
                          {(() => {
                            const dateParts = invoice.dueDate.split("/");
                            if (dateParts.length === 3) {
                              const day = parseInt(dateParts[0], 10);
                              const month = parseInt(dateParts[1], 10) - 1;
                              const year = parseInt(dateParts[2], 10);
                              const dueDate = new Date(year, month, day);
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              dueDate.setHours(0, 0, 0, 0);

                              const diffTime =
                                dueDate.getTime() - today.getTime();
                              const diffDays = Math.ceil(
                                diffTime / (1000 * 60 * 60 * 24)
                              );

                              let chipText = "";
                              let chipColor = "";

                              if (diffDays < 0) {
                                chipText = `Overdue by ${Math.abs(
                                  diffDays
                                )} day${Math.abs(diffDays) !== 1 ? "s" : ""}`;
                                chipColor =
                                  "bg-red-100 text-red-700 border-red-200";
                              } else if (diffDays === 0) {
                                chipText = "Due today";
                                chipColor =
                                  "bg-orange-100 text-orange-700 border-orange-200";
                              } else if (diffDays === 1) {
                                chipText = "Due tomorrow";
                                chipColor =
                                  "bg-yellow-100 text-yellow-700 border-yellow-200";
                              } else if (diffDays <= 7) {
                                chipText = `Due in ${diffDays} days`;
                                chipColor =
                                  "bg-blue-100 text-blue-700 border-blue-200";
                              } else {
                                return null;
                              }

                              return (
                                <span
                                  className={`px-2 py-0.5 rounded-full text-xs font-medium border ${chipColor}`}
                                >
                                  {chipText}
                                </span>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      </td>
                      <td className="py-3 lg:py-4 px-3 lg:px-4">
                        <button
                          onClick={() =>
                            invoice.status === "unpaid" &&
                            setSelectedInvoice(invoice)
                          }
                          className={`px-2 lg:px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                            invoice.status === "paid"
                              ? "bg-gradient-to-r from-green-500 to-green-600 text-white cursor-default shadow-md"
                              : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md group-hover:shadow-lg group-hover:scale-[1.02] active:scale-95"
                          }`}
                          disabled={invoice.status === "paid"}
                        >
                          {invoice.status === "paid" ? "✓ Paid" : "Pay Now"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Bottom summary removed for unpaid-only view */}
        </div>
      </div>

      {selectedInvoice && (
        <PaymentModal
          invoice={selectedInvoice}
          walletConfig={walletConfig}
          onClose={() => setSelectedInvoice(null)}
          onConfirm={(invoiceId) => {
            onPayInvoice(invoiceId);
            setSelectedInvoice(null);
          }}
        />
      )}
    </div>
  );
}
