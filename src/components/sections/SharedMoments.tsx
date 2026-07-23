function CookieIllustration() {
  return (
    <svg
      viewBox="0 0 132 96"
      fill="none"
      aria-hidden="true"
      className="shared-moments-cookies cookies"
    >
      <g
        transform="translate(69 6) rotate(24 23 23)"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M23 1C35 1 45 10 45 22c0 13-10 23-22 23S1 35 1 22C1 10 11 1 23 1Z" />
        <circle cx="15" cy="14" r="1.8" fill="currentColor" stroke="none" />
        <circle cx="31" cy="13" r="1.8" fill="currentColor" stroke="none" />
        <circle cx="34" cy="30" r="1.8" fill="currentColor" stroke="none" />
        <circle cx="15" cy="31" r="1.8" fill="currentColor" stroke="none" />
        <circle cx="24" cy="22" r="1.8" fill="currentColor" stroke="none" />
      </g>
      <g
        transform="translate(36 34) rotate(-12 26 26)"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M26 1C40 1 51 12 51 26S40 51 26 51 1 40 1 26 12 1 26 1Z" />
        <circle cx="16" cy="16" r="2" fill="currentColor" stroke="none" />
        <circle cx="35" cy="15" r="2" fill="currentColor" stroke="none" />
        <circle cx="39" cy="34" r="2" fill="currentColor" stroke="none" />
        <circle cx="17" cy="36" r="2" fill="currentColor" stroke="none" />
        <circle cx="27" cy="27" r="2" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

export function SharedMoments() {
  return (
    <section
      id="momentos"
      aria-labelledby="momentos-heading"
      className="shared-moments section"
    >
      <div className="shared-moments-frame frame">
        <div className="shared-moments-poster poster">
          <video
            className="shared-moments-media"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src="/videos/hero-01.mp4" type="video/mp4" />
          </video>

          <h2 id="momentos-heading" className="shared-moments-title title">
            <span>SIPS WORTH</span>
            <span>SHARING</span>
          </h2>

          <CookieIllustration />

          <div className="shared-moments-quote quote">
            <p>
              BECAUSE GREAT COFFEE ISN&apos;T JUST
              <br />
              A DRINK &mdash; IT&apos;S A SHARED
              <br />
              EXPERIENCE.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
