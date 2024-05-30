# High-Level Solution Design (HLD)

## Overview

This document outlines the high-level design of the Slack bot for automatization infrastructure tasks.

## System Flow
In the existing cluster, FluxCD and IntegrationApp is deployed and configured.
That is, the creation of the bootstrap K8S cluster are not considered.

Next, using FluxCD, and Slack-bot is deployed in a separate namespaces.
The Slack-bot should receive and execute three commands:

- Deploy the application of a specified version in a specific environment:
`/create [env] [ver]`
- Provide a list of running applications and their versions:
`/get`
- Delete an application:
`/delete [env]`

The create and delete commands work with Git as the source of information for FluxCD
(they create the necessary directory with files and change the configuration for Flux).

The get command operates with ClusterApi.

All other commands will return a help string.

Thus, we do not create infrastructure but only perform the deploy procedure of an already created and packed application in a HELM chart.
## Diagram

![Image](Slack-Bot-v1.png)

## Components
- **SlackBOT**: As an entry point to interact with devs.
- **The App**: 3 tier application.
 
## Technologies Used

- **Node.JS**: Language for integration slack bot
- **Slack**: Team communication platform
- **GIT**: As version control system.
- **GIT Actions**: For testing and CI.
- **K8S**: As container orchestration system.
- **Helm charts**: To deploy an application to a Kubernetes cluster.
- **FluxCD**: To delivery solutions for Kubernetes.

## Conclusion
Utilizing a IntegrationApp for FluxCD management offers enhanced accessibility, simplified interaction, streamlined workflows, improved collaboration, automation, and integration flexibility. By leveraging the power of IntegrationApp, organizations can optimize their Kubernetes deployment processes, enhance team productivity, and accelerate time-to-market for applications.
