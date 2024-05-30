# Provisioning tool

## Status

Accepted

## Context

Terraform, ansible, etc.?

## Decision

We decided not to use any provisioning tool which bring vender lock, so we can use any k8s cluster.

## Consequences

Choosing not to use any provisioning tool can reduce complexity, provide direct control, save costs, increase flexibility, and simplify debugging and visibility into the infrastructure setup.
We will be able to use any kubernetes cluster.