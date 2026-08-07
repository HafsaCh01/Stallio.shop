import { Link } from "@tanstack/react-router";
import { Container } from "./Container";
import { CTAButton } from "./CTAButton";
import { Logo } from "./Logo";
import { footerLinks, siteConfig, socialLinks } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="mt-auto border-t border-ink/10 bg-paper-dim text-ink-soft"
    >
      <Container className="grid gap-10 py-14 sm:grid-cols-2 sm:py-16 md:grid-cols-[1.3fr_1fr_1fr_1.2fr] md:gap-12">
        <div className="max-w-xs">
          <Link to="/" aria-label="Stallio home">
            <Logo />
          </Link>
          <p className="mt-3 text-sm leading-relaxed">
            {siteConfig.tagline} No domain, no payment gateway, no code.
          </p>
        </div>

        <FooterColumn title="Stallio" links={footerLinks.studio} />
        <FooterColumn title="Support" links={footerLinks.help} />

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">
            Get seller tips
          </h3>
          <p className="mt-3 text-sm">
            Short, practical emails on growing your store. No spam.
          </p>
          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@email.com"
              className="w-full min-w-0 rounded-full border border-ink/15 bg-paper px-4 py-2 text-sm text-ink placeholder:text-ink-faint focus:border-teal"
            />
            <CTAButton href="/#final-cta" size="sm" className="shrink-0">
              Join
            </CTAButton>
          </form>
        </div>
      </Container>

      <div className="border-t border-ink/10">
        <Container className="flex flex-col-reverse items-center gap-4 py-6 text-xs text-ink-faint sm:flex-row sm:justify-between">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-ink"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">
        {title}
      </h3>
      <ul className="mt-3 flex flex-col gap-2 text-sm">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="transition-colors hover:text-ink">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
