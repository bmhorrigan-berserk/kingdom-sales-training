/**
 * ReferenceGuide - individual binder guide detail page.
 * Magazine spread: title block + sibling-guide rail + inline PDF preview
 * iframe + download/open-in-new-tab CTA. Editorial cream background.
 */
import { Link, useRoute } from "wouter";
import TopNav from "@/components/TopNav";
import { Eyebrow, PageNumber, Em } from "@/components/Furniture";
import { REFERENCE_GUIDES } from "@/lib/referenceData";
import { ArrowLeft, ArrowRight, ExternalLink, Download } from "lucide-react";

const NAVY = "#1A2060";
const BLUE = "#3B5BDB";
const CREAM = "#FFFBF0";
const PALE = "#F0F7FE";
const HAIRLINE = "#E8DEC6";
const INK = "#2D2A24";
const INK_MUTED = "#6B6357";

export default function ReferenceGuide() {
  const [, params] = useRoute<{ slug: string }>("/reference/:slug");
  const slug = params?.slug;

  const guide = REFERENCE_GUIDES.find((g) => g.slug === slug);
  if (!guide) {
    return (
      <div style={{ background: CREAM, minHeight: "100vh", color: INK }}>
        <TopNav />
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "120px 32px" }}>
          <Eyebrow>§ NOT FOUND</Eyebrow>
          <h1
            style={{
              fontFamily: "var(--font-display, Fraunces), Georgia, serif",
              fontWeight: 400,
              fontSize: 56,
              color: NAVY,
              marginTop: 16,
            }}
          >
            Guide not in the binder.
          </h1>
          <Link href="/reference">
            <a style={{ color: BLUE, fontWeight: 600, textDecoration: "none" }}>
              ← Back to the binder
            </a>
          </Link>
        </div>
      </div>
    );
  }

  const idx = REFERENCE_GUIDES.findIndex((g) => g.slug === guide.slug);
  const prev = idx > 0 ? REFERENCE_GUIDES[idx - 1] : null;
  const next =
    idx >= 0 && idx < REFERENCE_GUIDES.length - 1
      ? REFERENCE_GUIDES[idx + 1]
      : null;

  const sameCategory = REFERENCE_GUIDES.filter(
    (g) => g.category === guide.category && g.slug !== guide.slug,
  );

  return (
    <div style={{ background: CREAM, minHeight: "100vh", color: INK }}>
      <TopNav />

      {/* BACK STRIP */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "20px 32px 0",
        }}
      >
        <Link href="/reference">
          <a
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: NAVY,
              textDecoration: "none",
              fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            <ArrowLeft size={14} style={{ color: BLUE }} />
            Binder Index
          </a>
        </Link>
      </div>

      {/* TITLE BLOCK */}
      <header
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "32px 32px 40px",
          borderBottom: `1px solid ${HAIRLINE}`,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: 32,
            alignItems: "start",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display, Fraunces), Georgia, serif",
              fontWeight: 600,
              fontSize: 96,
              color: BLUE,
              letterSpacing: "-0.03em",
              lineHeight: 0.85,
            }}
          >
            {guide.number}
          </span>
          <div>
            <Eyebrow style={{ color: BLUE, marginBottom: 12 }}>
              § {guide.category.toUpperCase()}
            </Eyebrow>
            <h1
              style={{
                fontFamily: "var(--font-display, Fraunces), Georgia, serif",
                fontWeight: 400,
                fontSize: "clamp(36px, 5vw, 56px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: NAVY,
                margin: 0,
                maxWidth: "22ch",
              }}
            >
              {guide.title}.
            </h1>
            <p
              style={{
                marginTop: 16,
                fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                fontSize: 16,
                lineHeight: 1.55,
                color: INK_MUTED,
                maxWidth: "60ch",
              }}
            >
              {guide.description}
            </p>

            <div
              style={{
                marginTop: 28,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <a
                href={guide.pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 18px",
                  background: NAVY,
                  color: CREAM,
                  fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  borderRadius: 4,
                }}
              >
                <ExternalLink size={12} style={{ color: BLUE }} />
                Open in new tab
              </a>
              <a
                href={guide.pdfPath}
                download
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 18px",
                  background: "transparent",
                  color: NAVY,
                  fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  border: `1px solid ${HAIRLINE}`,
                  borderRadius: 4,
                }}
              >
                <Download size={12} style={{ color: BLUE }} />
                Save a copy
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN GRID: PDF + sidebar */}
      <main
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "40px 32px 64px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 3fr) minmax(260px, 1fr)",
          gap: 40,
        }}
      >
        {/* PDF preview */}
        <div>
          <Eyebrow style={{ marginBottom: 16 }}>§ INLINE PREVIEW</Eyebrow>
          <div
            style={{
              border: `1px solid ${HAIRLINE}`,
              borderRadius: 6,
              overflow: "hidden",
              background: "#fff",
              boxShadow: "0 1px 0 rgba(26,32,96,0.04)",
            }}
          >
            <iframe
              src={guide.pdfPath}
              title={guide.title}
              style={{
                width: "100%",
                height: "82vh",
                border: 0,
                display: "block",
                background: "#fff",
              }}
            />
          </div>
          <p
            style={{
              marginTop: 12,
              fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
              fontSize: 12,
              color: INK_MUTED,
            }}
          >
            If the preview does not load, use Open in new tab.
          </p>
        </div>

        {/* Sidebar: same-category siblings */}
        <aside style={{ position: "sticky", top: 100, alignSelf: "start" }}>
          <Eyebrow style={{ color: BLUE, marginBottom: 16 }}>
            § ALSO IN {guide.category.toUpperCase()}
          </Eyebrow>
          {sameCategory.length === 0 ? (
            <p
              style={{
                fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                fontSize: 13,
                color: INK_MUTED,
              }}
            >
              No sibling guides.
            </p>
          ) : (
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {sameCategory.map((g) => (
                <li key={g.slug}>
                  <Link href={`/reference/${g.slug}`}>
                    <a
                      className="kingdom-sib-row"
                      style={{
                        display: "block",
                        padding: "16px 12px",
                        borderTop: `1px solid ${HAIRLINE}`,
                        color: INK,
                        textDecoration: "none",
                        transition: "background 150ms ease",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: 10,
                          alignItems: "baseline",
                        }}
                      >
                        <span
                          style={{
                            fontFamily:
                              "var(--font-display, Fraunces), Georgia, serif",
                            fontWeight: 600,
                            fontSize: 14,
                            color: BLUE,
                            letterSpacing: "0.04em",
                          }}
                        >
                          {g.number}
                        </span>
                        <span
                          style={{
                            fontFamily:
                              "var(--font-body, Inter), system-ui, sans-serif",
                            fontSize: 14,
                            fontWeight: 500,
                            color: NAVY,
                            lineHeight: 1.3,
                          }}
                        >
                          {g.title}
                        </span>
                      </div>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div
            style={{
              marginTop: 32,
              padding: 20,
              background: PALE,
              border: `1px solid ${HAIRLINE}`,
              borderRadius: 6,
            }}
          >
            <Eyebrow style={{ color: BLUE, marginBottom: 8 }}>
              § READING ORDER
            </Eyebrow>
            <p
              style={{
                fontFamily: "var(--font-body, Inter), system-ui, sans-serif",
                fontSize: 13,
                lineHeight: 1.55,
                color: INK_MUTED,
                margin: 0,
              }}
            >
              Read <Em>before</Em> taking a live consult. Pull from the binder
              <Em>during</Em> consults instead of relying on memory.
            </p>
          </div>
        </aside>
      </main>

      {/* PREV / NEXT */}
      <nav
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px 64px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
        }}
      >
        {prev ? (
          <Link href={`/reference/${prev.slug}`}>
            <a
              style={{
                padding: "20px 24px",
                border: `1px solid ${HAIRLINE}`,
                borderRadius: 6,
                color: INK,
                textDecoration: "none",
                background: "transparent",
              }}
            >
              <Eyebrow style={{ color: BLUE, marginBottom: 8 }}>
                <ArrowLeft size={11} style={{ display: "inline", marginRight: 6 }} />
                Previous
              </Eyebrow>
              <div
                style={{
                  fontFamily: "var(--font-display, Fraunces), Georgia, serif",
                  fontSize: 20,
                  fontWeight: 500,
                  color: NAVY,
                }}
              >
                {prev.number} {prev.title}
              </div>
            </a>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/reference/${next.slug}`}>
            <a
              style={{
                padding: "20px 24px",
                border: `1px solid ${HAIRLINE}`,
                borderRadius: 6,
                color: INK,
                textDecoration: "none",
                background: "transparent",
                textAlign: "right",
              }}
            >
              <Eyebrow
                style={{
                  color: BLUE,
                  marginBottom: 8,
                  justifyContent: "flex-end",
                }}
              >
                Next
                <ArrowRight size={11} style={{ display: "inline", marginLeft: 6 }} />
              </Eyebrow>
              <div
                style={{
                  fontFamily: "var(--font-display, Fraunces), Georgia, serif",
                  fontSize: 20,
                  fontWeight: 500,
                  color: NAVY,
                }}
              >
                {next.number} {next.title}
              </div>
            </a>
          </Link>
        ) : (
          <span />
        )}
      </nav>

      {/* FOOTER */}
      <footer
        style={{
          padding: 32,
          maxWidth: 1280,
          margin: "0 auto",
          borderTop: `1px solid ${HAIRLINE}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <Eyebrow>· {guide.title.toUpperCase()} ·</Eyebrow>
        <PageNumber current={2} total={4} />
      </footer>
      <style>{`.kingdom-sib-row:hover { background: ${PALE}; }`}</style>
    </div>
  );
}
