# Git Ops Continuous delivery solutions for Kubernetes

## Status

Accepted

## Context

We need to choose between FluxCD and ArgoCD for our GitOps continuous delivery solution for Kubernetes. Both tools offer robust solutions, but we need to identify the one that best fits our needs in terms of flexibility, security, resource usage, and scalability.

## Decision

FluxCD

## Consequences

FluxCD look like more flexible and secured decision, which use less resources
If you want to deploy a unified, identical set of components across a large number of clusters, then Flux CD is the better choice

## Rationale

In our evaluation of FluxCD and ArgoCD, we found that FluxCD provides several advantages:

**Resource Efficiency:** FluxCD is designed to be lightweight and efficient, consuming fewer resources than ArgoCD. This is crucial for optimizing the performance of our Kubernetes clusters and reducing operational costs.

**Scalability:** FluxCD is particularly well-suited for deploying a unified, identical set of components across multiple clusters. This scalability ensures that we can manage large-scale deployments consistently and efficiently.

**Community and Ecosystem:** FluxCD has a strong community and is part of the Cloud Native Computing Foundation (CNCF). This provides a robust support network and a continuous stream of improvements and updates from a diverse group of contributors.
