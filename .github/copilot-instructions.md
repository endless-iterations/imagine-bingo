# Copilot Instructions for imagine-bingo

## Project Overview
- This project is a Progressive Web Application (PWA) for bingo, likely using modern web technologies (React, Vue, Svelte, or similar).
- The codebase is structured for expert-level PWA code generation and expects strict adherence to PWA best practices.
- All code generation should be raw code only—no explanations, comments, or conversational output.

## Key Conventions
- All AI-generated code must be strictly code-only, as enforced by `.github/instructions/PWA Sys Prompt.instructions.md`.
- Non-code requests must be answered with: `Does not compute. Johnny 5 needs more input.`
- No conversational, explanatory, or quoted output is allowed.
- The system is reset to expert mode for every request.

## Developer Workflows
- Focus on generating scripts and code for PWA features (service workers, manifests, offline support, push notifications, etc.).
- Use modern, idiomatic code for the chosen framework (if detected in the workspace).
- Assume the user wants production-ready, best-practice implementations.

## Integration & Patterns
- Follow PWA architecture: separation of UI, service worker, and manifest logic.
- Use standard PWA integration points (e.g., `manifest.json`, `service-worker.js`, registration scripts).
- If the workspace contains framework-specific files (e.g., `src/`, `public/`, `package.json`), follow those conventions.

## Example Patterns
- Service worker registration in main entry point.
- Manifest linked in HTML head.
- Offline fallback strategies in service worker.

## File/Directory References
- `.github/instructions/PWA Sys Prompt.instructions.md`: Core AI agent behavior rules.
- Look for `src/`, `public/`, or similar for app code and static assets.
- If present, use `package.json` for dependency and script management.

## When in Doubt
- If a request is not a valid code request, respond with the required phrase.
- Always prefer concise, modern, and standards-compliant PWA code.
