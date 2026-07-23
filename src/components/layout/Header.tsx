"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Leaf, Menu, ShoppingBag } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import { SearchOverlay } from "@/components/overlays/SearchOverlay";
import { ShoppingDrawer } from "@/components/overlays/ShoppingDrawer";
import { AccountPanel } from "@/components/overlays/AccountPanel";
import { Container } from "@/components/ui/Container";
import { IconButton } from "@/components/ui/IconButton";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { groupIn, riseIn, still } from "@/lib/motion";

type OverlayName = "search" | "bag" | "account";

/*
 * Reparto 4/2: el grupo derecho carga además con el icono de la bolsa, así que
 * con 3 y 3 su bloque quedaba mucho más ancho y, al alinearse a la derecha,
 * se pegaba al logo. Con 4/2 los dos lados miden parecido.
 */
const navItems = site.nav.filter(({ id }) => id !== "inicio");
const leftNav = navItems.slice(0, 4);
const rightNav = navItems.slice(4);

export function Header() {
  const reduced = usePrefersReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openOverlay, setOpenOverlay] = useState<OverlayName | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    const initialFrame = window.requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    site.nav.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const closeOverlay = useCallback(() => {
    setOpenOverlay(null);
  }, []);

  const openSearch = useCallback(() => {
    setMobileMenuOpen(false);
    setOpenOverlay("search");
  }, []);

  const openBag = useCallback(() => {
    setMobileMenuOpen(false);
    setOpenOverlay("bag");
  }, []);

  const openAccount = useCallback(() => {
    setMobileMenuOpen(false);
    setOpenOverlay("account");
  }, []);

  const renderNavLink = ({ id, label }: { id: string; label: string }) => {
    const isActive = activeSection === id;

    return (
      <a
        key={id}
        href={`#${id}`}
        aria-current={isActive ? "location" : undefined}
        className={cn(
          "relative inline-flex min-h-11 items-center whitespace-nowrap text-[0.625rem] font-semibold uppercase tracking-[0.14em] transition-colors motion-reduce:transition-none",
          isActive ? "text-tinta" : "text-tinta/55 hover:text-tinta"
        )}
      >
        {label}
        <span
          aria-hidden
          className={cn(
            "absolute inset-x-0 bottom-2 h-px origin-center bg-verde transition-[transform,opacity] duration-200 motion-reduce:transition-none",
            isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
          )}
        />
      </a>
    );
  };

  return (
    <>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={reduced ? still : groupIn}
        className={cn(
          "fixed inset-x-0 top-0 z-30 h-[var(--header-h)] border-b bg-crema/90 backdrop-blur-md",
          "transition-[background-color,border-color] duration-200 motion-reduce:transition-none",
          isScrolled ? "border-borde/70 bg-crema/97" : "border-transparent"
        )}
      >
        <Container className="grid h-full grid-cols-[1fr_auto_1fr] items-center gap-4 xl:gap-8">
          <motion.div
            variants={reduced ? still : riseIn}
            className="flex items-center justify-self-start"
          >
            <IconButton
              label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setMobileMenuOpen((current) => !current)}
              aria-expanded={mobileMenuOpen}
              aria-haspopup="dialog"
              aria-controls="mobile-menu"
              className="shrink-0 xl:hidden"
            >
              <Menu size={19} strokeWidth={1.5} aria-hidden />
            </IconButton>

            <nav
              aria-label="Navegación principal"
              className="hidden items-center gap-8 xl:flex 2xl:gap-12"
            >
              {leftNav.map(renderNavLink)}
            </nav>
          </motion.div>

          <motion.div
            variants={reduced ? still : riseIn}
            className="justify-self-center"
          >
          <Link
            href="#inicio"
            aria-label={`${site.name}, ir al inicio`}
            className="group flex items-center gap-2.5"
          >
            <span
              aria-hidden
              className={cn(
                "grid size-8 shrink-0 place-items-center rounded-full border transition-colors duration-200 motion-reduce:transition-none",
                isScrolled
                  ? "border-verde bg-verde text-crema-clara"
                  : "border-verde/35 bg-crema-clara text-verde group-hover:border-verde"
              )}
            >
              <Leaf size={16} strokeWidth={1.6} />
            </span>
            <span className="whitespace-nowrap text-[0.8125rem] font-bold uppercase tracking-[0.16em] text-tinta sm:text-sm">
              {site.name}
            </span>
          </Link>
          </motion.div>

          <motion.div
            variants={reduced ? still : riseIn}
            className="flex items-center justify-end gap-8 justify-self-end 2xl:gap-12"
          >
            <nav
              aria-label="Navegación secundaria"
              className="hidden items-center gap-8 xl:flex 2xl:gap-12"
            >
              {rightNav.map(renderNavLink)}
            </nav>

            <IconButton
              label="Mi bolsa"
              title="Mi bolsa"
              aria-haspopup="dialog"
              onClick={openBag}
              className="shrink-0"
            >
              <ShoppingBag size={19} strokeWidth={1.5} aria-hidden />
            </IconButton>
          </motion.div>
        </Container>
      </motion.header>

      <MobileMenu
        open={mobileMenuOpen}
        activeSection={activeSection}
        onClose={closeMobileMenu}
        onOpenSearch={openSearch}
        onOpenBag={openBag}
        onOpenAccount={openAccount}
      />

      <SearchOverlay open={openOverlay === "search"} onClose={closeOverlay} />
      <ShoppingDrawer open={openOverlay === "bag"} onClose={closeOverlay} />
      <AccountPanel open={openOverlay === "account"} onClose={closeOverlay} />
    </>
  );
}
