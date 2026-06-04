/**
 * The Porch Kitchen — restaurant site component.
 *
 * Ported from the mockup at porch-kitchen-mockup/index.html.
 * Design is preserved exactly: all CSS classes are scoped under `.pk-site`
 * (defined in app/sites/[subdomain]/porch.css). No Tailwind is used here.
 *
 * Server component — no interactivity required.
 */
export default function PorchKitchenSite() {
  return (
    <div className="pk-site">

      {/* Inline SVG pattern defs — referenced by fill="url(#herbPat)" below */}
      <svg width="0" height="0" aria-hidden={true} style={{ position: "absolute" }}>
        <defs>
          <pattern
            id="herbPat"
            width="188"
            height="188"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(7)"
          >
            <g
              fill="none"
              stroke="#515B33"
              strokeOpacity=".15"
              strokeWidth="1.2"
              strokeLinecap="round"
            >
              <path d="M34 160 C 54 122 60 94 70 52" />
              <path d="M70 52 L70 38" />
            </g>
            <g fill="#515B33" fillOpacity=".12">
              <ellipse cx="46" cy="130" rx="10" ry="3.4" transform="rotate(40 46 130)" />
              <ellipse cx="58" cy="122" rx="10" ry="3.4" transform="rotate(-28 58 122)" />
              <ellipse cx="52" cy="108" rx="10" ry="3.4" transform="rotate(44 52 108)" />
              <ellipse cx="64" cy="100" rx="10" ry="3.4" transform="rotate(-24 64 100)" />
              <ellipse cx="60" cy="84" rx="9" ry="3.2" transform="rotate(46 60 84)" />
              <ellipse cx="70" cy="76" rx="9" ry="3.2" transform="rotate(-22 70 76)" />
              <ellipse cx="66" cy="60" rx="8" ry="3" transform="rotate(48 66 60)" />
              <ellipse cx="73" cy="52" rx="8" ry="3" transform="rotate(-20 73 52)" />
            </g>
          </pattern>
        </defs>
      </svg>

      {/* ===== TOP ANNOUNCEMENT BAR ===== */}
      <div className="pk-topbar">
        🌿 <strong>Now open for Lunch &amp; Dinner</strong> in Sebastopol &nbsp;&middot;&nbsp; Tue–Sun &nbsp;&middot;&nbsp; Reservations &amp; online ordering available
      </div>

      {/* ===== HEADER ===== */}
      <header className="pk-header">
        <div className="pk-wrap pk-nav">
          <div className="pk-brand">
            The Porch Kitchen
            <small>by The Cook &amp; The Drummer</small>
          </div>
          <nav className="pk-menu-links">
            <a href="#menu">Menu</a>
            <a href="#visit">Visit</a>
            <a href="#catering">Catering</a>
            <a href="#about">About</a>
            <a href="#music">Live Music</a>
          </nav>
          <div className="pk-nav-cta">
            <a className="pk-btn pk-btn-ghost" href="#reserve">Reserve</a>
            <a
              className="pk-btn pk-btn-solid"
              href="https://www.toasttab.com/local/order/the-cook-and-the-drummer-6811-laguna-park-way"
              target="_blank"
              rel="noopener noreferrer"
            >
              Order Online
            </a>
          </div>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section
        className="pk-hero pk-section"
        id="top"
        style={{
          background:
            "linear-gradient(180deg,rgba(34,32,26,.5),rgba(34,32,26,.68)),url('https://thecookandthedrummer.com/wp-content/uploads/2024/02/slider-image-2.jpg') center/cover",
        }}
      >
        <div className="pk-wrap">
          <p className="pk-eyebrow">Sebastopol · Sonoma Wine Country</p>
          <h1>The Porch Kitchen</h1>
          <p className="pk-tag">Farm-fresh California cooking, French at heart.</p>
          <p className="pk-meta">
            <span>🍴 Lunch &amp; Dinner</span>
            <span>·</span>
            <span>🥂 Beer &amp; Wine</span>
            <span>·</span>
            <span>📍 6811 Laguna Park Way</span>
          </p>
          <div className="pk-hero-cta">
            <a className="pk-btn pk-btn-solid" href="#reserve">Reserve a Table</a>
            <a
              className="pk-btn pk-btn-clay"
              href="https://www.toasttab.com/local/order/the-cook-and-the-drummer-6811-laguna-park-way"
              target="_blank"
              rel="noopener noreferrer"
            >
              Order Online
            </a>
            <a
              className="pk-btn pk-btn-ghost"
              style={{ borderColor: "#fff", color: "#fff" }}
              href="#menu"
            >
              View Menu
            </a>
          </div>
        </div>
        <span className="pk-ph-note">[ hero photo: the dining room / plated dish ]</span>
      </section>

      {/* ===== INTRO STRIP ===== */}
      <section className="pk-intro pk-has-tex pk-section">
        <svg className="pk-tex" preserveAspectRatio="none">
          <rect width="100%" height="100%" fill="url(#herbPat)" />
        </svg>
        <div className="pk-wrap">
          <div>
            <p className="pk-eyebrow">Welcome to the table</p>
            <h2 style={{ fontSize: "2.4rem", margin: "10px 0 18px" }}>Every detail matters.</h2>
            <p>
              From the team behind <strong>The Cook &amp; The Drummer</strong> — Sonoma County&apos;s
              beloved catering company — comes The Porch Kitchen, a neighborhood restaurant in the
              heart of Sebastopol. Chef Lisa Boisset brings twenty years and Cordon&nbsp;Bleu training
              to a menu that&apos;s seasonal, local, and made by hand: bright salads, nourishing grain
              bowls, French-inflected sandwiches, and a dinner table worth lingering at — now with
              local beer &amp; wine.
            </p>
          </div>
          <div
            className="pk-ph"
            style={{
              background:
                "url('https://thecookandthedrummer.com/wp-content/uploads/2024/02/family-style.jpg') center/cover",
              border: "none",
            }}
          />
        </div>
      </section>

      {/* ===== MENU ===== */}
      <section className="pk-menu-section pk-has-tex pk-section" id="menu">
        <svg className="pk-tex" preserveAspectRatio="none">
          <rect width="100%" height="100%" fill="url(#herbPat)" />
        </svg>
        <div className="pk-wrap">
          <div className="pk-section-head">
            <p className="pk-eyebrow">Seasonal &amp; made by hand</p>
            <h2>The Menu</h2>
            <p>A taste of what&apos;s on the counter. Menus rotate with the season and the farmers&apos; market.</p>
          </div>
          <div className="pk-menu-grid">

            {/* Sandwiches */}
            <div className="pk-menu-cat">
              <h3>Sandwiches</h3>
              <div className="pk-item">
                <div className="pk-nm">Jambon Beurre <small>Ham, sweet butter, baguette</small></div>
                <div className="pk-pr">16.95</div>
              </div>
              <div className="pk-item">
                <div className="pk-nm">Ch&egrave;vre Tomate <small>Goat cheese, tomato, herbes de Provence</small></div>
                <div className="pk-pr">16.95</div>
              </div>
              <div className="pk-item">
                <div className="pk-nm">House Pesto Turkey <small>&ldquo;The best turkey sandwich&rdquo; &mdash; Yelp</small></div>
                <div className="pk-pr">17.95</div>
              </div>
              <div className="pk-item">
                <div className="pk-nm">Focaccia, &frac14; Sheet <small>House-baked, to share</small></div>
                <div className="pk-pr">10.50</div>
              </div>
            </div>

            {/* Artisan Salads */}
            <div className="pk-menu-cat">
              <h3>Artisan Salads</h3>
              <div className="pk-item">
                <div className="pk-nm">Butternut Squash Salad</div>
                <div className="pk-pr">17.95</div>
              </div>
              <div className="pk-item">
                <div className="pk-nm">&ldquo;OG&rdquo; Caesar <small>add chicken 19.95</small></div>
                <div className="pk-pr">15.25</div>
              </div>
              <div className="pk-item">
                <div className="pk-nm">Adobo Roasted Chicken Salad</div>
                <div className="pk-pr">17.95</div>
              </div>
              <div className="pk-item">
                <div className="pk-nm">Roasted Beet Salad</div>
                <div className="pk-pr">16.95</div>
              </div>
            </div>

            {/* Nourishing Grain Bowls */}
            <div className="pk-menu-cat">
              <h3>Nourishing Grain Bowls</h3>
              <div className="pk-item">
                <div className="pk-nm">Warm Savory Grain Bowl</div>
                <div className="pk-pr">19.95</div>
              </div>
              <div className="pk-item">
                <div className="pk-nm">Red Quinoa Grain Bowl</div>
                <div className="pk-pr">16.95</div>
              </div>
              <div className="pk-item">
                <div className="pk-nm">Butternut Squash Farro</div>
                <div className="pk-pr">10.95</div>
              </div>
              <div className="pk-item">
                <div className="pk-nm">Roasted Kabocha Coconut Soup <small>Seasonal</small></div>
                <div className="pk-pr">10.95</div>
              </div>
            </div>

            {/* Add a Protein */}
            <div className="pk-menu-cat">
              <h3>Add a Protein</h3>
              <div className="pk-item">
                <div className="pk-nm">Roasted Wild Salmon</div>
                <div className="pk-pr">12.00</div>
              </div>
              <div className="pk-item">
                <div className="pk-nm">Five Spice Pork Loin</div>
                <div className="pk-pr">7.00</div>
              </div>
              <div className="pk-item">
                <div className="pk-nm">Roasted Shredded Chicken</div>
                <div className="pk-pr">5.00</div>
              </div>
              <div className="pk-item">
                <div className="pk-nm">Two Eggs</div>
                <div className="pk-pr">4.50</div>
              </div>
            </div>

            {/* Sweets */}
            <div className="pk-menu-cat">
              <h3>Sweets</h3>
              <div className="pk-item">
                <div className="pk-nm">Tahitian Vanilla Cheesecake</div>
                <div className="pk-pr">5.50</div>
              </div>
              <div className="pk-item">
                <div className="pk-nm">Bread Pudding</div>
                <div className="pk-pr">7.95</div>
              </div>
              <div className="pk-item">
                <div className="pk-nm">Bag of Cookies</div>
                <div className="pk-pr">10.00</div>
              </div>
              <div className="pk-item">
                <div className="pk-nm">House Jam Jar</div>
                <div className="pk-pr">10.00</div>
              </div>
            </div>

            {/* Drinks */}
            <div className="pk-menu-cat">
              <h3>
                Drinks{" "}
                <span className="pk-winebadge">Beer &amp; Wine</span>
              </h3>
              <div className="pk-item">
                <div className="pk-nm">House Hibiscus Iced Tea</div>
                <div className="pk-pr">5.00</div>
              </div>
              <div className="pk-item">
                <div className="pk-nm">Hot Coffee / Hot Tea</div>
                <div className="pk-pr">3.50</div>
              </div>
              <div className="pk-item">
                <div className="pk-nm">San Pellegrino / Olipop</div>
                <div className="pk-pr">3.50</div>
              </div>
              <div className="pk-item">
                <div className="pk-nm">
                  Local Sonoma Wine &amp; Beer{" "}
                  <small>By the glass with dinner</small>
                </div>
                <div className="pk-pr">—</div>
              </div>
            </div>

          </div>
          <p className="pk-menu-note">Vegetarian, vegan &amp; gluten-free options at every course.</p>
        </div>
      </section>

      {/* ===== ORDER / RESERVE BAND ===== */}
      <section className="pk-band" id="reserve">
        <div className="pk-wrap">
          <p className="pk-eyebrow" style={{ color: "#f3d9a8" }}>Two easy ways to enjoy The Porch</p>
          <h2>Reserve a table — or order ahead</h2>
          <p>Join us for lunch or dinner on the porch, or grab it to go. Online orders go straight to the kitchen, commission-free.</p>
          <div className="pk-hero-cta">
            <a className="pk-btn pk-btn-clay" href="#reserve">Reserve a Table</a>
            <a
              className="pk-btn"
              style={{ background: "#fff", color: "var(--pk-sage-dk)" }}
              href="https://www.toasttab.com/local/order/the-cook-and-the-drummer-6811-laguna-park-way"
              target="_blank"
              rel="noopener noreferrer"
            >
              Order Pickup
            </a>
            <a
              className="pk-btn pk-btn-ghost"
              style={{ borderColor: "#fff", color: "#fff" }}
              href="#"
            >
              DoorDash Delivery
            </a>
          </div>
        </div>
      </section>

      {/* ===== CATERING ===== */}
      <section className="pk-cater pk-section" id="catering">
        <div className="pk-wrap">
          <div
            className="pk-ph"
            style={{
              background:
                "url('https://thecookandthedrummer.com/wp-content/uploads/2024/02/sparkling-glassware-stands-long-table-prepared-wedding-di-650x650-1.jpg') center/cover",
              border: "none",
            }}
          />
          <div>
            <p className="pk-eyebrow">The Cook &amp; The Drummer</p>
            <h2 style={{ fontSize: "2.4rem", margin: "10px 0 8px" }}>Catering &amp; Events</h2>
            <p>
              Long before the restaurant, there was the catering. Weddings, winery dinners, corporate
              gatherings and celebrations across the North Bay — full-service food, professional staff,
              rentals, and live music, all coordinated by Lisa &amp; Kevin.
            </p>
            <ul>
              <li>Weddings &amp; rehearsal dinners</li>
              <li>Winery &amp; vineyard events</li>
              <li>Corporate, holiday &amp; private parties</li>
              <li>Drop-off catering &amp; grazing tables</li>
            </ul>
            <a
              className="pk-btn pk-btn-solid"
              href="https://thecookandthedrummer.com/reservation/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Inquire About Your Event
            </a>
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="pk-about pk-has-tex pk-section" id="about">
        <svg className="pk-tex" preserveAspectRatio="none">
          <rect width="100%" height="100%" fill="url(#herbPat)" />
        </svg>
        <div className="pk-wrap">
          <div className="pk-section-head">
            <p className="pk-eyebrow">The Cook &amp; The Drummer</p>
            <h2>Meet Lisa &amp; Kevin</h2>
            <p>
              A husband-and-wife team — a chef and a drummer — who built a Sonoma County institution
              on great food and good music.
            </p>
          </div>
          <div className="pk-duo">
            <div className="pk-card">
              <div
                className="pk-ph"
                style={{
                  background:
                    "url('https://thecookandthedrummer.com/wp-content/uploads/2024/02/CHEF-LISA-1024x683.jpeg') center/cover",
                  border: "none",
                }}
              />
              <h3>Chef Lisa Boisset</h3>
              <div className="pk-role">The Cook</div>
              <p>
                Trained at the California Culinary Academy and Le Cordon Bleu, Paris, with 20 years as
                an executive chef. Her cooking is French at the roots, Californian on the plate, and
                farm-fresh always.
              </p>
            </div>
            <div className="pk-card">
              <div
                className="pk-ph"
                style={{
                  background:
                    "url('https://thecookandthedrummer.com/wp-content/uploads/2024/02/Cook-and-Drummer-1-683x1024.jpg') center/cover",
                  border: "none",
                }}
              />
              <h3>Kevin Boisset</h3>
              <div className="pk-role">The Drummer</div>
              <p>
                A Paris-born jazz drummer playing since age nine, Kevin runs the room and brings the
                North Bay&apos;s best musicians to the table — because a great meal deserves a great
                soundtrack.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MUSIC ===== */}
      <section className="pk-music pk-wood pk-section" id="music">
        <div className="pk-wrap">
          <p className="pk-eyebrow" style={{ color: "#f3d9a8" }}>On the porch</p>
          <h2 style={{ fontSize: "clamp(2rem,4vw,2.8rem)" }}>Live Music Nights</h2>
          <p>
            Jazz, classical, and contemporary — curated by Kevin. Join us for dinner with live music
            on select evenings. Follow along for the schedule.
          </p>
          <div className="pk-hero-cta" style={{ justifyContent: "center", marginTop: "24px" }}>
            <a
              className="pk-btn pk-btn-ghost"
              style={{ borderColor: "#fff", color: "#fff" }}
              href="#"
            >
              See the Schedule
            </a>
          </div>
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section className="pk-reviews pk-has-tex pk-section">
        <svg className="pk-tex" preserveAspectRatio="none">
          <rect width="100%" height="100%" fill="url(#herbPat)" />
        </svg>
        <div className="pk-wrap">
          <div className="pk-stars">★★★★★</div>
          <p className="pk-quote">
            &ldquo;The best turkey sandwich I&apos;ve ever had — the soup&apos;s spices, the beet
            salad… and the space is so cute. We&apos;ll be back.&rdquo;
          </p>
          <p className="pk-quote-by">— Kaci W., Yelp · The Porch Kitchen</p>
          <div className="pk-rev-row">
            <div><b>5.0</b> Google (25)</div>
            <div><b>5.0</b> Yelp</div>
            <div><b>100%</b> couples recommend</div>
            <div><b>Women-owned</b> · Sebastopol</div>
          </div>
        </div>
      </section>

      {/* ===== VISIT ===== */}
      <section className="pk-visit pk-section" id="visit">
        <div className="pk-wrap">
          <div className="pk-ph">[ embedded Google Map — 6811 Laguna Park Way ]</div>
          <div className="pk-info">
            <p className="pk-eyebrow">Find us</p>
            <h2 style={{ fontSize: "2.2rem", margin: "8px 0 6px" }}>Visit The Porch</h2>
            <dl>
              <dt>Address <span className="pk-flag">confirm w/ owners</span></dt>
              <dd>
                6811 Laguna Park Way, Sebastopol, CA 95472
                <br />
                <span style={{ color: "var(--pk-muted)", fontSize: ".9rem" }}>Near The Barlow</span>
              </dd>
              <dt>Phone</dt>
              <dd>(707) 393-9488</dd>
              <dt>Hours <span className="pk-flag">placeholder</span></dt>
              <dd style={{ marginTop: "8px" }}>
                <div className="pk-hours-row"><span>Tue – Fri</span><span>11am – 9pm</span></div>
                <div className="pk-hours-row"><span>Saturday</span><span>10am – 9pm</span></div>
                <div className="pk-hours-row"><span>Sunday</span><span>10am – 3pm</span></div>
                <div className="pk-hours-row"><span>Monday</span><span>Closed</span></div>
              </dd>
            </dl>
            <div className="pk-hero-cta" style={{ justifyContent: "flex-start", marginTop: "24px" }}>
              <a className="pk-btn pk-btn-solid" href="#reserve">Reserve</a>
              <a
                className="pk-btn pk-btn-ghost"
                href="https://www.toasttab.com/local/order/the-cook-and-the-drummer-6811-laguna-park-way"
                target="_blank"
                rel="noopener noreferrer"
              >
                Order Online
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="pk-footer pk-wood">
        <div className="pk-wrap">
          <div className="pk-foot">
            <div>
              <div className="pk-brand">
                The Porch Kitchen
                <small style={{ color: "#8d8674" }}>by The Cook &amp; The Drummer</small>
              </div>
              <p style={{ marginTop: "14px", fontSize: ".92rem", maxWidth: "300px" }}>
                Farm-fresh California cooking, French at heart. Sebastopol, Sonoma County.
              </p>
              <div className="pk-foot-cta">
                <a className="pk-btn pk-btn-solid" href="#reserve">Reserve</a>
                <a
                  className="pk-btn pk-btn-clay"
                  href="https://www.toasttab.com/local/order/the-cook-and-the-drummer-6811-laguna-park-way"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Order Online
                </a>
              </div>
            </div>
            <div>
              <h4>Visit</h4>
              <a href="#menu">Menu</a>
              <a href="#reserve">Reservations</a>
              <a href="#visit">Hours &amp; Location</a>
              <a href="#music">Live Music</a>
            </div>
            <div>
              <h4>The Company</h4>
              <a href="#catering">Catering &amp; Events</a>
              <a href="#about">About Lisa &amp; Kevin</a>
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
            </div>
          </div>
          <div className="pk-legal">
            <span>&copy; 2026 The Porch Kitchen &middot; The Cook &amp; The Drummer</span>
            <span>6811 Laguna Park Way, Sebastopol, CA &middot; (707) 393-9488</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
