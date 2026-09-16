# Portfolio Website Agent Guide

## Mission

Make reliable portfolio-site changes while helping the site grow over time. Preserve the existing visual system and factual content unless the user explicitly asks for a change, and use judgment to improve the experience within the task.

## Project shape

- Keep the site lightweight and static: the primary surfaces are `index.html`, `css/`, `images/`, and `scripts/`.
- Treat repository configuration and scripts as the source of truth for commands and structure. Document durable, non-obvious conventions here rather than duplicating configuration.
- Avoid new dependencies unless they are necessary for the requested work; explain the reason when proposing one.

## Design and implementation

- Use the existing CSS layers: inspect `css/tokens.css`, `css/base.css`, and `css/styles.css` before adding styles. Extend existing tokens and patterns where they fit.
- Preserve the site’s visual language, semantic HTML, content hierarchy, and responsive behavior across desktop and mobile.
- Reuse and verify existing assets. Keep image references valid and intentional, with meaningful alt text.
- Use progressive enhancement: core content and navigation should remain useful without JavaScript; add client-side behavior only when it provides a clear, justified improvement.
- Maintain and improve the current accessibility baseline, including semantic structure, skip navigation, keyboard focus, reduced-motion behavior, meaningful alternatives for images, and adequate contrast. Aim for WCAG 2.2 AA where applicable.
- Refactor when it materially improves the requested change or removes clear brittleness. Surface broader refactor opportunities rather than expanding scope silently.
- Implement scoped innovations that clearly support the task. Present broader redesigns, new sections, site-wide visual changes, information-architecture changes, or dependency changes as findings and suggestions when their impact or direction is material.

## Verification

1. Inspect the relevant source files and existing patterns before editing.
2. Run the repository’s relevant checks. The current review workflow is defined in `package.json`; use `pnpm test` and/or `pnpm build` as appropriate.
3. For UI changes, inspect the rendered page at desktop and narrow mobile widths. Prefer the in-app Browser when available; otherwise use the best available local preview.
4. Investigate and fix failures caused by the change, then rerun the checks. Distinguish unrelated pre-existing failures in the final report.

Completion means the requested change is implemented, relevant checks pass, and visual verification is complete or its limitation is clearly reported.

## Delivery boundary

- Prepare and validate changes locally.
- After requested changes pass validation, commit and push the relevant changes to GitHub.
- When a deployment is requested, run `pnpm deploy` to publish the site to `gh-pages`.
- Report changes and validation results concisely, separating implemented improvements from suggested follow-ups.

Keep this file short and maintain it as a durable guide: remove stale or duplicated guidance when repository conventions change.
