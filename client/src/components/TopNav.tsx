/**
 * TopNav - magazine-style top navigation for the sales training site.
 * Dark navy strip with mono uppercase tracked labels. Active route gets
 * a Mid Blue underline. Sticky to the top so it stays present while
 * scrolling through long curriculum pages.
 */
import { Link, useLocation } from "wouter";
import { ExternalLink } from "lucide-react";

const NAV_ITEMS = [
  { path: "/",            label: "HOME" },
  { path: "/curriculum",  label: "CURRICULUM" },
  { path: "/library",     label: "LIBRARY" },
  { path: "/reference",   label: "REFERENCE" },
  { path: "/flashcards",  label: "FLASHCARDS" },
  { path: "/quiz",        label: "QUIZ" },
];

// Cross-property tabs - link out to other kingdom apps. These render
// after the in-site tabs with a small external-link icon so the user
// knows they leave sales-training.
//
// Cache-bust query (?v=2) on the dashboard link forces Cloudflare to
// fetch a fresh SPA shell from Vercel rather than serve a stale
// cached bundle that's missing the auth-redirect returnTo logic.
const CROSS_LINKS = [
  { url: "https://catalog.kingdomcommandcenter.com",      label: "SALES CATALOG" },
  { url: "https://kingdomintelhq.com/tools/clinical-assistant?v=2", label: "CLINICAL ASSISTANT" },
];

export default function TopNav() {
  const [location] = useLocation();
  const isActive = (path: string) =>
    path === "/" ? location === "/" : location.startsWith(path);

  return (
    <header
      className="kingdom-topnav"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "#1A2060",
        color: "#FFFBF0",
        borderBottom: "1px solid #15184A",
      }}
    >
      <div
        style={{
          maxWidth: 1920,
          margin: "0 auto",
          padding: "14px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 32,
          flexWrap: "wrap",
        }}
      >
        {/* Wordmark */}
        <Link href="/">
          <a style={{ display: "inline-flex", alignItems: "baseline", gap: 4, textDecoration: "none" }}>
            <span
              style={{
                fontFamily: "var(--font-display, Fraunces), Georgia, serif",
                fontWeight: 600,
                fontSize: 22,
                color: "#FFFBF0",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              kingdom
            </span>
            <span
              style={{
                fontFamily: "var(--font-display, Fraunces), Georgia, serif",
                fontWeight: 600,
                fontSize: 22,
                color: "#5FB286",
                lineHeight: 1,
              }}
            >
              .
            </span>
            <span
              style={{
                fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,251,240,0.55)",
                marginLeft: 12,
              }}
            >
              ONBOARDING
            </span>
          </a>
        </Link>

        {/* Nav items */}
        <nav style={{ display: "flex", gap: 28, flexWrap: "wrap", alignItems: "center" }}>
          {NAV_ITEMS.map((item, idx) => {
            const active = isActive(item.path);
            return (
              <Link key={item.path} href={item.path}>
                <a
                  style={{
                    fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: active ? "#FFFBF0" : "rgba(255,251,240,0.7)",
                    textDecoration: "none",
                    paddingBottom: 6,
                    borderBottom: active ? "2px solid #5FB286" : "2px solid transparent",
                    transition: "all 150ms ease",
                    display: "inline-flex",
                    alignItems: "baseline",
                    gap: 6,
                  }}
                >
                  <span style={{ color: "#5FB286", fontWeight: 600 }}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </a>
              </Link>
            );
          })}

          {/* Divider before cross-property links */}
          <span
            aria-hidden="true"
            style={{
              width: 1,
              height: 16,
              background: "rgba(255,251,240,0.18)",
              alignSelf: "center",
            }}
          />

          {CROSS_LINKS.map((item) => (
            <a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,251,240,0.7)",
                textDecoration: "none",
                paddingBottom: 6,
                borderBottom: "2px solid transparent",
                transition: "all 150ms ease",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#FFFBF0";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,251,240,0.7)";
              }}
            >
              {item.label}
              <ExternalLink size={11} style={{ color: "#5FB286" }} />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
