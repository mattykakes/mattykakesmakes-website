---
title: "Writing Clear Requirements"
date: 2025-11-06T21:47:00-04:00
draft: false
featured_image: images/pages/blog/writing-clear-requirements/fmgu1xkalf131.webp
featured_image_quality: 45
summary: A short reference for writing clear, structured requirements for systems and products.  
description: This guide explains how to define, structure, and validate requirements to improve clarity, traceability, and project outcomes—bridging the gap between specification and implementation.
author: Matthew Miller
authorimage: images/global/author.webp
categories: [Project Management, Product Owner, Writing]
tags: [Documentation, Product, Project, Technical, Writing]
---

Clear, well-written requirements are the foundation of a successful system. They define what needs to be built, ensure alignment among stakeholders, and help teams deliver a product that meets user needs. To ensure requirements are clear they must be properly scoped, structured effectively, and maintain the right level of formality.

# Scoping Requirements

For requirements to be affective they must be properly scoped. For products and systems, requirements generally fall under two separate categories: __Functional Requirements__ and __Implementation Requirements__. It is important that these two categories of requirements do not overlap as they serve different purposes, but work together at the same time to define a system.

## Functional Requirements

Functional requirements define what a system should do or what it needs to achieve -- its behaviors, operations, and interactions with users or other systems. They describe the intended functionality of the system without specifying how it should be implemented.

#### Examples:
* `A user shall be able to log in using an email and password.`
* `The system shall send an email notification when a user completes a purchase to the user who completed said purchase.`
* `A patient’s medical record must be retrievable using their patient UUID.`

## Implementation Requirements

Implementation requirements define how the system should be built -- specific technologies, tools, constraints, or design decisions that guide implementation. They focus on technical details rather than high-level functionality.

#### Examples:
* `The data layer shall be implemented using PostgreSQL as the database.`
* `The client facing application must be developed using Angular and NgRx for state management.`
* `Data must be encrypted using AES-256 before being stored.`

## Key Differences

|        | Functional Requirements | Implementation Requirements |
| ------ | ----------------------- | --------------------------- |
| __Focus__ | What the system does | How the system is built     |
| __Audience__ | Business analysts, product owners, developers | Developers, architects, system administrators |
| __Example__ | "Users shall be able to reset their password via email." | "Password reset emails must be sent using AWS SES." |


# Formality Reference
To write formal requirements, one must ensure clarity, specificity, and use precise language by defining each
requirement with a clear action, outcome, and acceptance criteria, identifying key stakeholders when
possible, outlining the project scope, and using consistent terminology throughout the document; always
review requirements with stakeholders to validate accuracy and completeness.

Below are key points to keep in mind when writing requirements to ensure they can represent clear deliverables.

### Use strong verbs and precise language
Employ words like `shall`, `must`, and `will` to clearly state what the system needs to do, avoiding ambiguity and vague terms like `should` or `may`.

### Write in a declarative perspective
This describes what the system must do in an objective way.
* Good, Declarative Requirement (Clear & Impersonal)
    * `The system must maintain a record of all patient data load attempts, including success and failure states, for auditing purposes.`
        * This describes what the system must do in an objective way.
        * It focuses on the expected state, not how to implement it.
* Poorly Written Requirement (First-Person, Vague, or Prescriptive)
    * `I want the system to keep track of patient data loading so I can check if something goes wrong.`
        * Uses `I want`, making it personal rather than objective.
        * `Keep track` is vague -- what data should be logged?
        * `So I can check` is a personal goal rather than a system behavior.
            
### Include acceptance criteria
Define specific conditions that must be met for a requirement to be considered complete and accepted. This can often take the form of a list or table.
* Requirement
    * `The system must load patient data using a UUID and display an error message if loading fails.`
* Acceptance Criteria
    * `When a valid UUID is provided, the system retrieves and displays the correct patient data.`
    * `If an invalid UUID is provided, the system triggers the patientLoadError action and displays an appropriate error message.`
    * `The "patientLoadingSelector" reflects a loading state while data is being retrieved.`
    * `Once data is loaded, the "patientSelector" contains the retrieved patient information.`
    * `If the API call fails, the system does not update the patient state and instead logs the error.`

### Organize with a structured format
Utilize a consistent template with sections for project overview, functional requirements, non-functional requirements, constraints, and assumptions. A hierarchical structure is just one acceptable example:
```
1 Functional Requirements
    1.1 User Authentication
        1.1.1 The system must allow users to log in using email and password.
        1.1.2 The system must lock an account after 5 failed login attempts.
    1.2 Patient Data Management
        1.2.1 The system must allow patient records to be retrieved using UUID.
        1.2.2 The system must log errors when patient data fails to load.
```

### Identify stakeholders where applicable
Clearly list all key stakeholders involved in the project to ensure their needs are addressed. This should exist in its own section or in an appendix to the requirements document.

### Reject scope creep
Requirements define the scope of a project. Adding to requirements after work has begun is a sign they were not thoroughly developed or reviewed. Unless prohibitive due to a lack of time-to-delivery or unforeseen circumstances, it is often best to complete a feature and update it later with new requirements so deadlines can be met.

### Review and validate with stakeholders
Share the requirements document with relevant stakeholders for feedback and confirmation. Good requirements can be written by one person. Great requirements go through a review process.

### Avoid negative requirements
Requirements must act as the bounds of functionality. Negative requirements are a sign the project is not appropriately bounded by requirements and introduces ambiguity.
* Negative requirement
    * `The system must not allow users to access sensitive data without proper authentication.`
* Bounded requirement
    * `The system shall only allow users to access sensitive data when a user is authenticated and belongs to the ‘sensitive data’ user group.`

### Provide clear deliverables
Formal requirements are often broken down into individual work items during development. These ticket-level requirements tend to adopt a more informal structure. If well written, even simple paragraph formatting can communicate clear deliverables, preserving structure and traceability.

* Good Example:
    * `The online shopping cart system shall allow users to add items to their cart, update quantities, and remove items, with a clear visual indication of the total cart value, and the system must provide a confirmation message upon successful item removal from the cart.`
        * Declarative, objective perspective.
        * Formal structure can be implied by concise writing. These requirements are verifiable.
* Bad Example
    * `I want users to be able to add stuff to their cart, change how many things they have, and take things out. They should be able to see how much everything costs, and when they delete something, they should get a message saying it worked.`
        * First-person phrasing (`I want`) makes it subjective.
        * Vague terms like `stuff` and `things` reduce clarity.
        * Unclear constraints (e.g., what kind of `message`? Pop-up, toast notification, email?).
        * No formal structure, making it hard to verify or test.
