---
# Required discriminator used by content schema and section validation in index.astro.
section: hero
# SEO metadata passed into Layout.astro as page <title>/<meta description>.
meta:
  # Browser tab title and SEO title.
  title: "Volition Labs | Building Focused Communities"
  # Meta description used for search/social previews.
  description: "Volition Labs builds tools and communities that help developers, professionals, and students stay accountable, connected, and intentional. Commitspace is our first social productivity app."
# Navigation labels and links passed to Nav.astro.
nav:
  # Nav link text for the Commitspace anchor.
  commitspaceLabel: "Commitspace"
  # Nav link target for Commitspace section.
  commitspaceHref: "#commitspace"
  # Nav link text for the work/contact anchor.
  workLabel: "Work with Volition"
  # Nav link target for the work/contact section.
  workHref: "#work-with-us"
# Main hero heading rendered in Hero.astro.
headline: "We build with intention."
# Optional hero supporting copy (used if markdown body slot is absent).
subtext: "Volition Labs builds products that help people do deep work together. Commitspace is our first tool for structured group focus sessions."
# Primary hero CTA button label.
primaryLabel: "See Us Build"
# Primary hero CTA destination.
primaryHref: "#commitspace"
# Secondary hero CTA button label.
secondaryLabel: "Contact us"
# Secondary hero CTA destination.
secondaryHref: "#work-with-us"
---
