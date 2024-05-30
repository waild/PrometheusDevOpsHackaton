# ADR - Bot language

## Status

Accepted

## Context

We need a light and fast tool to implement integration, such as Golang, Node.JS, or Python.

## Decision

Node.JS

## Consequences

We chose Node.JS because it ensures faster development cycles and easier maintainability.

## Rationale

Initially, we chose Go because the team wanted to gain new experience with this language. However, during the implementation process, we encountered several challenges that slowed down our progress. It became clear that the key factors for us were the speed of development and maintainability.

Additionally, after a brief market analysis, it was evident that there are more developers proficient in Node.JS. This means that in the future, it will be easier for the customer to maintain the product on their own if necessary. Therefore, we decided to switch to Node.JS to ensure faster development cycles and easier maintainability.
