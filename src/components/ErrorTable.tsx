import { useEffect, useMemo, useState } from "react";
import {
  ColumnDef,
  CellContext,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  HeaderContext,
  useReactTable,
} from "@tanstack/react-table";

interface ErrorCode {
  code?: number;
  message?: string;
  description?: string;
  [key: string]: unknown;
}

const MOCK_ERROR_DATA: ErrorCode[] = [
  { code: 1, message: "خطای احراز هویت", description: "API Key نامعتبر است" },
  {
    code: 2,
    message: "خطای اعتبارسنجی",
    description: "پارامترهای ارسالی نامعتبر هستند",
  },
  {
    code: 3,
    message: "خطای محدودیت",
    description: "تعداد درخواست‌ها از حد مجاز تجاوز کرده است",
  },
  { code: 4, message: "خطای سرور", description: "خطای داخلی سرور رخ داده است" },
  { code: 5, message: "خطای شبکه", description: "اتصال به سرور برقرار نشد" },
  {
    code: 6,
    message: "خطای فرمت",
    description: "فرمت داده‌های ارسالی صحیح نیست",
  },
  {
    code: 7,
    message: "خطای مجوز",
    description: "شما مجوز دسترسی به این منبع را ندارید",
  },
  { code: 8, message: "خطای یافت نشد", description: "منبع درخواستی یافت نشد" },
];

const SkeletonTable = ({
  columns = 4,
  rows = 6,
}: {
  columns?: number;
  rows?: number;
}) => {
  const templateColumns = `repeat(${columns}, minmax(120px, 1fr))`;

  return (
    <div className="error-table-skeleton" aria-hidden="true">
      <div
        className="error-table-skeleton__header"
        style={{ gridTemplateColumns: templateColumns }}
      >
        {Array.from({ length: columns }).map((_, index) => (
          <div key={`skeleton-header-${index}`} className="skeleton-block" />
        ))}
      </div>

      <div className="error-table-skeleton__rows">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={`skeleton-row-${rowIndex}`}
            className="error-table-skeleton__row"
            style={{ gridTemplateColumns: templateColumns }}
          >
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div
                key={`skeleton-cell-${rowIndex}-${colIndex}`}
                className="skeleton-block"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ErrorTable() {
  const [data, setData] = useState<ErrorCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        setUsingMockData(false);
        const response = await fetch("/api/error-codes");

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();

        let fetchedData: ErrorCode[] = [];
        if (Array.isArray(result)) {
          fetchedData = result;
        } else if (result.data && Array.isArray(result.data)) {
          fetchedData = result.data;
        } else if (result.result && Array.isArray(result.result)) {
          fetchedData = result.result;
        } else if (result && typeof result === "object") {
          fetchedData = [result];
        }

        if (fetchedData.length === 0) {
          setData(MOCK_ERROR_DATA);
          setUsingMockData(true);
          setError("داده‌ای از API دریافت نشد. در حال نمایش داده‌های نمونه");
        } else {
          setData(fetchedData);
        }
      } catch (err) {
        setData(MOCK_ERROR_DATA);
        setUsingMockData(true);
        setError(
          err instanceof Error
            ? `خطا در دریافت داده‌ها: ${err.message}. در حال نمایش داده‌های نمونه`
            : "خطا در دریافت داده‌ها. در حال نمایش داده‌های نمونه"
        );
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const headers = useMemo(() => {
    if (data.length === 0) return [];
    const allKeys = new Set<string>();
    data.forEach((item) =>
      Object.keys(item).forEach((key) => allKeys.add(key))
    );
    const filtered = Array.from(allKeys)
      .sort()
      .filter((key) => key !== "id");

    const nameIndex = filtered.indexOf("name");
    const descriptionIndex = filtered.indexOf("description");
    if (nameIndex !== -1 && descriptionIndex !== -1) {
      [filtered[nameIndex], filtered[descriptionIndex]] = [
        filtered[descriptionIndex],
        filtered[nameIndex],
      ];
    }
    return filtered;
  }, [data]);

  const columnHelper = createColumnHelper<ErrorCode>();

  const columns = useMemo<ColumnDef<ErrorCode>[]>(() => {
    return headers.map((header) =>
      columnHelper.accessor((row: ErrorCode) => row[header], {
        id: header,
        header: () => <span style={{ fontWeight: 600 }}>{header}</span>,
        cell: (info: CellContext<ErrorCode, unknown>) => {
          const value = info.getValue();
          return value !== null && value !== undefined ? String(value) : "-";
        },
      })
    );
  }, [headers, columnHelper]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="error-table-container">
      {loading && (
        <SkeletonTable columns={Math.max(headers.length, 4)} rows={6} />
      )}

      {error && (
        <div
          className={`error-banner ${
            usingMockData ? "error-banner--warning" : "error-banner--error"
          }`}
        >
          <strong>{usingMockData ? "توجه:" : "خطا:"}</strong> {error}
        </div>
      )}

      {!loading && data.length === 0 && (
        <div className="error-table__empty">داده‌ای یافت نشد.</div>
      )}

      {!loading && data.length > 0 && (
        <>
          {isMobile ? (
            <div className="error-table__cards">
              {table.getRowModel().rows.map((row) => (
                <div key={row.id} className="error-table__card">
                  {row.getVisibleCells().map((cell) => (
                    <div key={cell.id} className="error-table__card-row">
                      <div className="error-table__card-label">
                        {cell.column.id}
                      </div>
                      <div className="error-table__card-value">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="error-table__wrapper">
              <table className="error-table__table">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="error-table__head-row">
                      {headerGroup.headers.map((header) => (
                        <th key={header.id} className="error-table__head-cell">
                          {/* {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header as HeaderContext<
                                  ErrorCode,
                                  unknown
                                >,
                                header.getContext()
                              )} */}
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="error-table__row">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="error-table__cell">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {!loading && data.length > 0 && (
        <div className="error-table__footer">
          تعداد ردیف‌ها: {data.length}
          {usingMockData && " (داده‌های نمونه)"}
        </div>
      )}
    </div>
  );
}
