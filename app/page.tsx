"use client";

import { useEffect, useState } from "react";
import "@scalar/api-reference-react/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faMoon,
  faSun,
  faChevronDown,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import OperationBox from "@/src/components/OperationBox";
import ScalarApiReference from "@/src/components/ScalarApiReference";
import { sendSingleSmsApiSpec } from "@/src/data/sendSingleSmsApiSpec";
import { sendBulkSmsApiSpec } from "@/src/data/sendBulkSmsApiSpec";
import { sendP2pSmsApiSpec } from "@/src/data/sendP2pSmsApiSpec";
import { sendOtpApiSpec } from "@/src/data/sendOtpApiSpec";
import { sendOtpSmsNewApiSpec } from "@/src/data/sendOtpSmsNewApiSpec";
import { otpTemplateParamsApiSpec } from "@/src/data/otpTemplateParamsApiSpec";
import { outboxStatusApiSpec } from "@/src/data/outboxStatusApiSpec";
import { latest100ApiSpec } from "@/src/data/latest100ApiSpec";
import { paginatedApiSpec } from "@/src/data/paginatedApiSpec";
import ErrorTable from "@/src/components/ErrorTable";
import { BaseUrlCard } from "@/src/components/BaseUrlCard";
import { SdkLanguages } from "@/src/components/SdkLanguages";
import PhpDescription from "@/src/components/PhpDescription";

type NavLink = { href: string; label: string; method?: string };
type NavGroup = { title: string; subtitle?: string; links: NavLink[] };

function App() {
  const navGroups: NavGroup[] = [
    {
      title: "نمای کلی مستندات",
      // subtitle: "نمای کلی مستندات API",
      links: [
        { href: "#docs-overview", label: "نمای کلی مستندات" },
        { href: "#docs-authorization", label: "احراز هویت" },
        { href: "#errors", label: "جدول خطاها" },
      ],
    },
    {
      title: "کتابخانه ها و sdkها",
      // subtitle: "سرویس ارسال پیامک",
      links: [
        { href: "#php", label: "php", method: "POST" },
        { href: "#c#", label: "c#", method: "POST" },
        { href: "#python", label: "python", method: "POST" },
        { href: "#go", label: "go", method: "POST" },
        { href: "#node.js", label: "node.js", method: "POST" },
      ],
    },
    {
      title: "راهنمای وب سرویس REST",
      // subtitle: "سرویس ارسال پیامک",
      links: [
        { href: "#send-single", label: "ارسال تکی", method: "POST" },
        { href: "#send-bulk", label: "ارسال گروهی", method: "POST" },
        { href: "#send-p2p", label: "ارسال نظیر به نظیر", method: "POST" },
        { href: "#otp-resend", label: "ارسال پیامک OTP جدید", method: "POST" },
        // {
        //   href: "#otp-send",
        //   label: "ارسال پیامک اعتبار سنجی (OTP)",
        //   method: "POST",
        // },
        {
          href: "#otp-template",
          label: "دریافت پارامترهای قالب OTP",
          method: "GET",
        },
        {
          href: "#status-report",
          label: "وضعیت پیام های ارسالی",
          method: "GET",
        },
        // { href: "#inbox-latest", label: "100 پیام آخر", method: "GET" },
        { href: "#inbox-paged", label: "پیام های دریافتی", method: "GET" },
      ],
    },
    {
      title: "ماژول ها و افزونه ها",
      // subtitle: "سرویس ارسال پیامک",
      links: [
        { href: "#wordpress", label: "wordpress", method: "POST" },
        { href: "#digits", label: "digits", method: "POST" },
      ],
    },
  ];

  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [search, setSearch] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("send-single");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      navGroups.map((group, idx) => [group.title || `group-${idx}`, true])
    )
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsNavOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredGroups = navGroups
    .map((group) => ({
      ...group,
      links: group.links.filter((link) =>
        link.label.toLowerCase().includes(search.trim().toLowerCase())
      ),
    }))
    .filter((group) => group.links.length > 0);

  const hasSearchResults = filteredGroups.some(
    (group) => group.links.length > 0
  );

  const toggleGroup = (key: string) => {
    setOpenGroups((prev) => ({ ...prev, [key]: !(prev[key] ?? true) }));
  };

  useEffect(() => {
    const sectionIds = navGroups.flatMap((group) =>
      group.links.map((link) => link.href.replace("#", ""))
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navGroups]);

  return (
    <>
      <header className="fixed-header">
        <div className="fixed-header__group">
          <button
            className="hamburger"
            onClick={() => setIsNavOpen((v) => !v)}
            aria-label="باز کردن منو"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div className="fixed-header__brand">
            <span className="fixed-header__logo">
              <img
                src="/image/logo.png"
                alt="Ghasedak"
                className="fixed-header__logo-img"
              />
            </span>
            <span className="fixed-header__title">سامانه پیام کوتاه قاصدک</span>
          </div>
        </div>

        <div className="theme-toggle theme-toggle--header">
          <span className="theme-toggle__icon" aria-hidden>
            <FontAwesomeIcon icon={theme === "dark" ? faMoon : faSun} />
          </span>
          <label className="switch">
            <input
              type="checkbox"
              aria-label="تغییر حالت روشن/تاریک"
              checked={theme === "light"}
              onChange={toggleTheme}
            />
            <span className="switch__slider" />
          </label>
        </div>
      </header>

      {isNavOpen && (
        <div className="sidebar-backdrop" onClick={() => setIsNavOpen(false)} />
      )}

      <div className="layout">
        <aside
          className={`sidebar sidebar--compact ${
            isNavOpen ? "sidebar--open" : ""
          }`}
        >
          {/* <div className="sidebar__brand">
            <div className="sidebar__dot" />
            <div>
              <div className="sidebar__title">Ghasedak Docs</div>
              <div className="sidebar__version">ارسال پیامک</div>
            </div>
          </div> */}

          <div className="sidebar__search">
            <input
              type="text"
              placeholder="جستجو..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <nav className="sidebar__nav sidebar__nav--compact">
            {filteredGroups.map((group, idx) => {
              const groupKey = group.title || `group-${idx}`;
              const isOpen = openGroups[groupKey] ?? true;
              return (
                <div className="sidebar__group" key={groupKey}>
                  {group.subtitle && (
                    <div
                      className="sidebar__group-subtitle"
                      // style={{
                      //   display: "flex",
                      //   alignItems: "center",
                      //   color: "gray",
                      //   fontSize: "14px",
                      // }}
                    >
                      <span style={{ marginRight: "10px" }}>
                        {group.subtitle}
                      </span>{" "}
                      <div
                        style={{
                          flexGrow: 1,
                          borderBottom: "1px solid gray",
                          marginRight: "5px",
                        }}
                      />{" "}
                    </div>
                  )}
                  {group.title && (
                    <div
                      className="sidebar__group-title sidebar__group-title--collapsible"
                      role="button"
                      tabIndex={0}
                      aria-expanded={isOpen}
                      onClick={() => toggleGroup(groupKey)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggleGroup(groupKey);
                        }
                      }}
                    >
                      <span className="sidebar__group-title-text">
                        {group.title}
                      </span>
                      <FontAwesomeIcon
                        className="sidebar__group-icon"
                        icon={isOpen ? faChevronDown : faChevronLeft}
                      />
                    </div>
                  )}
                  {(search.trim() || isOpen) && (
                    <div className="sidebar__links">
                      {group.links.map((link) => (
                        <a
                          key={link.href}
                          className={`sidebar__link sidebar__link--compact ${
                            activeSection === link.href.replace("#", "")
                              ? "sidebar__link--active"
                              : ""
                          }`}
                          href={link.href}
                          onClick={() => setIsNavOpen(false)}
                        >
                          <span className="sidebar__link-text">
                            {link.label}
                          </span>
                          {link.method && (
                            <span
                              className={`sidebar__link-method ${
                                link.method.toLowerCase() === "post"
                                  ? "post"
                                  : "get"
                              }`}
                            >
                              {link.method}
                            </span>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            {!hasSearchResults && (
              <div className="sidebar__empty">موردی یافت نشد</div>
            )}
          </nav>
        </aside>

        <main className="content">
          <section id="docs-overview" className="content-section">
            <div className="home-page">
              <section className="home-hero">
                <h2>نمای کلی مستندات</h2>
                <p>
                  به مستندات وب‌سرویس پیام کوتاه قاصدک خوش آمدید. این مستندات
                  شامل راهنمای کامل استفاده از API های مختلف برای ارسال پیامک،
                  مدیریت OTP، دریافت گزارش‌ها و سایر قابلیت‌های سرویس پیام کوتاه
                  قاصدک می‌باشد.
                </p>
              </section>

              <section className="home-section home-base-sdk">
                <div className="home-base-url-grid">
                  <div className="home-base-url-text">
                    <div className="home-section-header">
                      <h2>آدرس پایه‌ی API</h2>
                      <p>
                        برای ارسال هر درخواست باید آن را بر اساس آدرس پایه‌ی
                        اصلی سرویس بسازید. تمام متدهای REST موجود در این مستندات
                        از این آدرس آغاز می‌شوند و سپس ادامه‌ی مسیر مربوط به متد
                        مورد نظر اضافه می‌شود.
                      </p>
                    </div>
                  </div>
                  <div className="home-base-url-card">
                    {/* <OperationBox
                      method="Base"
                      endpoint="https://gateway.ghasedak.me/"
                    /> */}
                    <BaseUrlCard url="https://gateway.ghasedak.me/" />
                  </div>
                </div>

                <div className="home-base-sdk__divider" aria-hidden="true" />

                <div className="home-sdk-content">
                  <div className="home-section-header">
                    <h2>کتابخانه‌ها و SDK</h2>
                    <p>
                      برای راحتی و سرعت بیشتر در توسعه، کتابخانه‌های آماده برای
                      زبان‌های برنامه‌نویسی مختلف فراهم کرده‌ایم.
                    </p>
                  </div>

                  <SdkLanguages />

                  <ul className="home-list">
                    <li>نصب آسان از طریق Package Manager های استاندارد</li>
                    <li>مستندات کامل و نمونه کدهای کاربردی</li>
                    <li>پشتیبانی از تمام متدهای API</li>
                    <li>مدیریت خودکار خطاها و استثناها</li>
                  </ul>
                </div>
              </section>

              <section className="home-section">
                <div className="home-section-header">
                  <h2>بخش‌های اصلی</h2>
                  <p>
                    مسیرهای اصلی سرویس به پنج دسته تقسیم می‌شود. هر کارت زیر
                    شامل توضیح کوتاه و لینک دسترسی مستقیم به مستندات مربوطه است.
                  </p>
                </div>

                <div className="home-section-grid">
                  <article className="home-section-card">
                    <h3>🧰 کتابخانه‌ها و SDK</h3>
                    <p>راهنمای نصب و استفاده از پکیج‌ها در زبان‌های مختلف:</p>
                    <ul>
                      <li>
                        {/* <strong>
                          <a href="/guides/sdk">راهنمای کامل SDK</a>
                        </strong> */}
                        راهنمای کامل : نصب و راه‌اندازی برای زبان‌های محبوب
                      </li>
                      <li>نمونه کدها : دسترسی سریع به دستورها و مثال‌ها</li>
                    </ul>
                  </article>

                  <article className="home-section-card">
                    <h3>📤 وب سرویس ارسال</h3>
                    <p>این بخش شامل متدهای مختلف برای ارسال پیامک است:</p>
                    <ul>
                      <li>
                        {/* <strong>
                          <a href="/guides/send-single">ارسال تکی</a>
                        </strong> */}
                        ارسال تکی : برای ارسال پیامک به یک شماره گیرنده
                      </li>
                      <li>
                        {/* <strong>
                          <a href="/guides/send-bulk">ارسال گروهی</a>
                        </strong> */}
                        ارسال گروهی : برای ارسال یک پیام به چندین گیرنده مختلف
                      </li>
                      <li>
                        {/* <strong>
                          <a href="/guides/send-bulk-peer-to-peer">
                            ارسال گروهی نظیر به نظیر
                          </a>
                        </strong> */}
                        ارسال گروهی نظیر به نظیر : برای ارسال پیامک‌های مختلف به
                        گیرندگان مختلف
                      </li>
                    </ul>
                  </article>

                  <article className="home-section-card">
                    <h3>🔐 سرویس اعتبار سنجی</h3>
                    <p>مدیریت کامل پیامک‌های OTP و قالب‌های اعتبارسنجی:</p>
                    <ul>
                      <li>
                        {/* <strong>
                          <a href="/guides/sendOtpSms">
                            ارسال پیامک اعتبار سنجی (OTP)
                          </a>
                        </strong> */}
                        ارسال پیامک اعتبار سنجی(OTP) : ارسال پیامک OTP با
                        استفاده از قالب‌های از پیش تعریف شده
                      </li>
                      <li>
                        {/* <strong>
                          <a href="/guides/send-otp-new">
                            ارسال پیامک OTP جدید
                          </a>
                        </strong> */}
                        ارسال پیامک OTP جدید : ارسال OTP با قابلیت‌های
                        پیشرفته‌تر
                      </li>
                      <li>
                        {/* <strong>
                          <a href="/guides/otp-template-params">
                            دریافت پارامترهای قالب OTP
                          </a>
                        </strong> */}
                        دریافت پارامترهای قالب OTP : دریافت اطلاعات و پارامترهای
                        قالب‌های OTP
                      </li>
                    </ul>
                  </article>

                  <article className="home-section-card">
                    <h3>📊 گزارش وضعیت</h3>
                    <p>مشاهده وضعیت و جزئیات پیام‌های ارسال شده:</p>
                    <ul>
                      <li>
                        {/* <strong>
                          <a href="/reports/outbox-status">
                            وضعیت پیام های ارسالی
                          </a>
                        </strong> */}
                        وضعیت پیام های ارسالی : بررسی وضعیت ارسال پیامک‌ها
                      </li>
                    </ul>
                  </article>

                  <article className="home-section-card">
                    <h3>📥 پیام های دریافتی</h3>
                    <p>گزارش پیام‌های ورودی خطوط شما:</p>
                    <ul>
                      <li>
                        {/* <strong>
                          <a href="/inbox/latest-100">100 پیام آخر</a>
                        </strong> */}
                        100 پیام آخر : مشاهده آخرین پیام‌های دریافتی
                      </li>
                      <li>
                        {/* <strong>
                          <a href="/inbox/paginated">صفحه بندی</a>
                        </strong> */}
                        صفحه بندی : دریافت پیام‌های دریافتی به صورت صفحه‌بندی
                        شده
                      </li>
                    </ul>
                  </article>
                </div>
              </section>

              <section className="home-section">
                <div className="home-section-header">
                  <h2>شروع کار</h2>
                  <p>
                    با دنبال کردن مراحل زیر در چند دقیقه می‌توانید اولین درخواست
                    خود را ارسال کنید:
                  </p>
                </div>
                <ul className="home-steps">
                  <li>
                    <strong>دریافت API Key:</strong> ابتدا باید کلید API خود را
                    از پنل مدیریت قاصدک دریافت کنید.
                  </li>
                  <li>
                    <strong>انتخاب متد مناسب:</strong> بر اساس نیاز خود، یکی از
                    متدهای ارسال را انتخاب کنید.
                  </li>
                  <li>
                    <strong>مطالعه مستندات:</strong> هر متد شامل جزئیات کامل
                    پارامترها و نمونه کدهای مختلف است.
                  </li>
                  <li>
                    <strong>تست درخواست:</strong> می‌توانید از بخش تست درخواست
                    در هر صفحه برای آزمایش API استفاده کنید.
                  </li>
                </ul>
              </section>

              <section className="home-section">
                <div className="home-section-header">
                  <h2>نکات مهم</h2>
                </div>
                <ul className="home-list home-list--compact">
                  <li>تمام درخواست‌ها باید از طریق HTTPS ارسال شوند.</li>
                  <li>
                    برای احراز هویت، API Key خود را در هدر درخواست قرار دهید.
                  </li>
                  <li>
                    در صورت بروز خطا، می‌توانید از{" "}
                    <a href="/error-table">جدول خطاها</a> برای بررسی کدهای خطا
                    استفاده کنید.
                  </li>
                  <li>
                    نمونه کدهای مختلف برای زبان‌های برنامه‌نویسی مختلف در هر
                    صفحه موجود است.
                  </li>
                </ul>
              </section>

              <section className="home-section">
                <div className="home-section-header">
                  <h2>پشتیبانی</h2>
                </div>
                <p className="home-support-text">
                  در صورت بروز مشکل یا نیاز به راهنمایی بیشتر، می‌توانید با تیم
                  پشتیبانی قاصدک تماس بگیرید.
                </p>
                <ul className="home-list home-list--compact home-support-list">
                  <li className="home-support-item">
                    <span className="home-support-icon" aria-hidden="true">
                      ✉️
                    </span>
                    <span>ایمیل پشتیبانی:</span>
                    <span className="home-support-value">
                      support@ghasedak-ict.com
                    </span>
                  </li>
                  <li className="home-support-item">
                    <span className="home-support-icon" aria-hidden="true">
                      ☎️
                    </span>
                    <span>تلفن:</span>
                    <span className="home-support-value">021-74417700 </span>
                  </li>
                  <li className="home-support-item">
                    <span className="home-support-icon" aria-hidden="true">
                      🌐
                    </span>
                    <span>وب‌سایت:</span>
                    <span className="home-support-value">
                      <a
                        href="https://ghasedak.me"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        ghasedak.me
                      </a>
                    </span>
                  </li>
                </ul>
              </section>
            </div>
          </section>
          <section id="docs-authorization" className="content-section">
            <h1>احراز هویت</h1>

            <div className="operation-hero">
              <div className="operation-hero__text">
                <p>
                  برای استفاده از API، باید از روش احراز هویت Bearer Token
                  استفاده کنید. در این روش، شما باید API Key خود را به عنوان
                  توکن در هدر درخواست قرار دهید.
                </p>
              </div>
            </div>
          </section>
          <section id="errors" className="error-table content-section">
            <div className="error-text">
              <h2>جدول خطاها</h2>
              <h6>
                چنانچه درخواست‌های ارسالی شما با خطای خاصی مواجه شد، برای آگاهی
                از دلایل آن می‌توانید از جدول خطاها کمک بگیرید.
              </h6>
            </div>

            <ErrorTable />
          </section>
          <section id="php" className="content-section">
            <h1>php</h1>
            {/* <div className="operation-hero">
              <div className="operation-hero__text"> */}
            <PhpDescription />
            {/* </div>
            </div> */}
          </section>
          <section id="c#" className="content-section">
            <h1>c#</h1>

            <div className="operation-hero">
              <div className="operation-hero__text">
                <p>توضیحات c#.</p>
              </div>

              <OperationBox
                method="POST"
                endpoint="https://gateway.ghasedak.me/rest/api/v1/WebService/SendSingleSms"
              />
            </div>
          </section>
          <section id="python" className="content-section">
            <h1>python</h1>

            <div className="operation-hero">
              <div className="operation-hero__text">
                <p>توضیحات python.</p>
              </div>

              <OperationBox
                method="POST"
                endpoint="https://gateway.ghasedak.me/rest/api/v1/WebService/SendSingleSms"
              />
            </div>
          </section>
          <section id="go" className="content-section">
            <h1>go</h1>

            <div className="operation-hero">
              <div className="operation-hero__text">
                <p>توضیحات go.</p>
              </div>

              <OperationBox
                method="POST"
                endpoint="https://gateway.ghasedak.me/rest/api/v1/WebService/SendSingleSms"
              />
            </div>
          </section>
          <section id="node.js" className="content-section">
            <h1>node.js</h1>

            <div className="operation-hero">
              <div className="operation-hero__text">
                <p>توضیحات node.js.</p>
              </div>

              <OperationBox
                method="POST"
                endpoint="https://gateway.ghasedak.me/rest/api/v1/WebService/SendSingleSms"
              />
            </div>
          </section>

          <section id="send-single" className="content-section">
            <ScalarApiReference
              instanceKey="scalar-send-single"
              spec={sendSingleSmsApiSpec}
              theme={theme}
            />
          </section>

          <section id="send-bulk" className="content-section">
            <ScalarApiReference
              instanceKey="scalar-send-bulk"
              spec={sendBulkSmsApiSpec}
              theme={theme}
            />
          </section>

          <section id="send-p2p" className="content-section">
            <ScalarApiReference
              instanceKey="scalar-send-p2p"
              spec={sendP2pSmsApiSpec}
              theme={theme}
            />
          </section>
          <section id="otp-resend" className="content-section">
            <ScalarApiReference
              instanceKey="scalar-otp-resend"
              spec={sendOtpSmsNewApiSpec}
              theme={theme}
            />
            <ScalarApiReference
              instanceKey="scalar-otp-send"
              spec={sendOtpApiSpec}
              theme={theme}
            />
          </section>
          {/* <section id="otp-send" className="content-section">
            <ScalarApiReference
              instanceKey="scalar-otp-send"
              spec={sendOtpApiSpec}
              theme={theme}
            />
          </section> */}

          <section id="otp-template" className="content-section">
            <ScalarApiReference
              instanceKey="scalar-otp-template"
              spec={otpTemplateParamsApiSpec}
              theme={theme}
            />
          </section>
          <section id="status-report" className="content-section">
            <ScalarApiReference
              instanceKey="scalar-status-report"
              spec={outboxStatusApiSpec}
              theme={theme}
            />
          </section>
          {/* <section id="inbox-latest" className="content-section">
            <ScalarApiReference
              instanceKey="scalar-inbox-latest"
              spec={latest100ApiSpec}
              theme={theme}
            />
          </section> */}

          <section id="inbox-paged" className="content-section">
            <ScalarApiReference
              instanceKey="scalar-inbox-paged"
              spec={paginatedApiSpec}
              theme={theme}
            />
            <ScalarApiReference
              instanceKey="scalar-inbox-latest"
              spec={latest100ApiSpec}
              theme={theme}
            />
          </section>
          <section id="wordpress" className="content-section">
            <h1>wordpress</h1>
            <div className="operation-hero">
              <div className="operation-hero__text">
                <p>توضیحات wordpress.</p>
              </div>
              <OperationBox
                method="POST"
                endpoint="https://gateway.ghasedak.me/rest/api/v1/WebService/SendSingleSms"
              />
            </div>
          </section>
          <section id="digits" className="content-section"></section>
        </main>
      </div>

      <footer className="app-footer">
        <div className="app-footer__content">
          <div className="app-footer__brand">
            <img
              src="/image/logo.png"
              alt="Ghasedak"
              className="app-footer__logo"
            />
            <span>مستندات وب‌سرویس پیام کوتاه قاصدک</span>
          </div>
          <div className="app-footer__links">
            <a href="https://ghasedak.me" target="_blank" rel="noreferrer">
              وب‌سایت قاصدک
            </a>
            <a href="mailto:support@ghasedak-ict.com">
              پشتیبانی: support@ghasedak-ict.com
            </a>
            <a href="tel:02174417700">021-74417700</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
