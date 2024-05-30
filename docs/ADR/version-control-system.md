# Version control system

## Status

Accepted

## Context

We need to pick git system across Github, Gitlab, Bitbucket, etc.

## Decision

Github

## Consequences

Using GitHub offers centralized repository management, enhanced collaboration, robust version control, seamless CI/CD integration, strong security, an extensive ecosystem, and scalability for projects of all sizes.

**Cost:**
**Consideration**: Advanced features may require a paid subscription.
**Details**: Free accounts offer basic features; larger teams or enterprises may need to invest in paid plans for additional storage and security.

---

# Monorepo ADR

## Status

Accepted

## Context

We need to decide whether to use a monorepo or multiple repositories for managing our project's codebase.

## Decision

Monorepo

## Consequences

Using a monorepo allows for centralized code management, simplified dependency management, consistent tooling and configuration, improved code sharing and reuse, and streamlined CI/CD pipelines. However, it also comes with potential challenges such as increased repository size, complexity in managing unrelated projects, and potential for more complex merge conflicts.
