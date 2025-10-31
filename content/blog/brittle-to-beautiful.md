---
title: "Brittle to Beautiful"
date: 2025-10-29T22:02:00-04:00
draft: false
featured_image: images/pages/blog/brittle-to-beautiful/bb-graph.jpg
featured_image_quality: 35
summary: Building reactive, browser-based front-ends with long term maintainability in mind. 
description: TODO
author: Matthew Miller
authorimage: images/global/author.webp
categories: [Software, Design]
tags: [Enterprise, Reactive, Browser, Application, Frontend]
---

Have you ever worked on a large or long-lived, browser-based front-end that became a bear to maintain -- one that became brittle and frustrating to work on as it grew?

If your application has any of these symptoms, chances are you have:
* Small changes cause regressions
* Object locations seem arbitrary
* Styling and spacing issues are inconsistent
* Version control history is unreliable

These problems might seem trivial to avoid – but trying to make something robust using a combination of reactive programming, custom elements, and loosely typed languages is like trying to navigate through the Bermuda Triangle. You may make it through on a whim, but without a plan things will go wrong.

In my time working with front-end frameworks, I've identified these six pain points as the main culprits in eroding the maintainability of browser applications. 

* [Poor Encapsulation](#poor-encapsulation)
* [Undefined Semantic Structure](#undefined-structure)
* [Unscoped State Distribution](#unscoped-state)
* [State Object Mutability](#object-mutability)
* [Loose Rule-Based Compliance](#loose-compliance)
* [No Software Blueprint](#no-blueprint)

Having a plan to mitigate these six bullet points is essential to prevent the compounding effect of technical debt over time.


# Poor Encapsulation {#poor-encapsulation}
The concept encapsulation is pretty straightforward. Encapsulation is used to reduce the shared state from external modification.

```
class Counter {
  private count = 0; // hidden state

  increment() {
    this.count++;
  }

  getValue() {
    return this.count;
  }
}
const c = new Counter();
c.increment();
console.log(c.getValue());
```

This is easy enough when dealing with class members -- it's _Programming 101_. What this looks like with UI components can much less straightforward. What do you do at a level above members and methods?

When you throw style sheets, templates, and embedded javascript into the mix -- suddenly it becomes much less straightforward.

### Component Example
Let’s use this UI component as an example. This Picklist component is from the [PrimeNG](https://primeng.org/) library, but we’re going to assume we’re building our own. What we elevate here is pretty straightforward -- we have a few components and services for managing state across those components.

![Picklist Component](images/pages/blog/brittle-to-beautiful/primeng-picklist-animation.gif)

| Components | Services |
| ---------- | -------- |
| Picklist (top level)   | PicklistService (fetch list content) |
| PicklistList (row container) | PicklistStateService (manipulate local state) |
| PicklistRow (lowest child) | |

Now lets say the project doesn’t have a strong encapsulation precedent, or even a step further for examples sake and say the project doesn’t prevent the use of child components elsewhere.

Then, one day, a product owner says they need the ShoppingCart component updated __immediately__. If we pretend the shopping cart they are referring to is just a basic list of text -- the picklist row starts to look like an easy drop in replacement...

{{< imgc src="pages/blog/brittle-to-beautiful/contemplate-row.png" alt="Contemplate Row" quality="25" >}}

The PicklistRow is already has the item data needed to calculate a user’s total and maps image resources appropriately. It might have too much functionality built into it but it has what you need - what could it hurt?

... a year goes by and the pattern sticks....

PicklistRow is now used everywhere as a generic component it was never designed to be.

```
src/
│
├── components/
│   ├── Picklist
│   ├── PicklistList        // imports PicklistRow
│   ├── PicklistRow
│   ├── ShoppingCart
│   ├── ShoppingCartList    // imports PicklistRow
│   ├── ShippingPreview
│   ├── ShippingPreviewList // imports PicklistRow
│   ├── OrderHistory
│   ├── OrderHistoryList    // imports PicklistRow
│   └── …
└── index
```

Eventually someone tries to change PicklistRow in an update to the OrderHistory component. That update breaks the PickList. PicklistList and PicklistRow are then updated in a bugfix, but this breaks the ShoppingCart. PicklistRow has become bloated; full of extraneous code. Our lack of encapsulation has lead to a brittle maintenance nightmare.

### Component Encapsulation

The best way to prevent this is to __modularize__ components. It’s a way to treat a component as a fundamental building block by only exposing the top level element.

Angular provides built-in functionality to do just this via NgModules. It even provides a way to scope instances of services with its dependency injection system. In this way each top-level component declaration has its own service instance shared between its imports.

React takes a bit more work to accomplish this. Feature boundaries are defined by directory structure, index files at the parent directory’s root determine what stays private, while services and state live inside hooks and context providers as there is no dependency injection system. The developer must select the right pattern to maintain the desired level of encapsulation.

<div class="code-toggle">
    <pre class="angular code-block" style="display:block;"><code>features/
 │   ├─ picklist/
 │   │   ├─ components/
 │   │   │   ├─ picklist/
 │   │   │   │   ├─ picklist.component.ts
 │   │   │   │   ├─ picklist.component.css
 │   │   │   │   └─ picklist.component.html
 │   │   │   ├─ picklist-list/
 │   │   │   │   └─ …
 │   │   │   └─ picklist-row/
 │   │   │       └─ …
 │   │   ├─ services/
 │   │   │   ├─ pickliststate.service.ts
 │   │   │   └─ picklist.service.ts
 │   │   └─ picklist.module.ts
 │   ├─ shoppingcart/
 │   │   └─
 │   └─ …
 └─ …</code></pre>

  <pre class="react code-block" style="display:none;"><code>features/
 ├─ picklist/
 │   ├─ components/
 │   │   ├─ Picklist.tsx
 │   │   ├─ Picklist.module.css
 │   │   ├─ PicklistList.tsx
 │   │   ├─ PicklistList.module.css
 │   │   ├─ PicklistRow.tsx
 │   │   └─ PicklistRow.module.css
 │   ├─ context/
 │   │   └─ PicklistContext.tsx
 │   ├─ hooks/
 │   │   └─ usePicklist.ts
 │   └─ index.ts
 ├─ shoppingcart/
 │   └─ …
 └─ …</code></pre>
  
  <div style="text-align:right;">
    <a href="javascript:void(0);" class="toggle-link">Show React Example</a>
  </div>
</div>

The same concept can be applied to style sheets. Style encapsulation can prevent bleed-over of local styles into other parts of the application. Again, Angular does this out of the box while React has several ways to approach style management. The best way I’ve found to go about it would be to use CSS modules.

Even then care must be taken to style each component appropriately, not overreaching into child style specificity from a parent stylesheet when trying to force a change -- breaking encapsulation.

Even if components are modularized, there are still pitfalls. Bad modularization can be an issue. One common example is known as the “Monolith Anti-Pattern”.

<div class="code-toggle">
    <pre class="angular code-block" style="display:block;"><code>@NgModule({
  declarations: [
    AppComponent,
    PicklistComponent,
    PicklistListComponent,
    PicklistRowComponent,
    ShoppingCartComponent,
    ShoppingCartItemComponent,
    CheckoutComponent,
    InventoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    PicklistService,
    PicklistStateService,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }</code></pre>

  <pre class="react code-block" style="display:none;"><code>// React DOM bootstrap
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

export { default as Picklist } from '...';
export { default as PicklistList } from '...';
export { default as PicklistRow } from '...';
export * from './features/picklist/context/PicklistContext';
export * from './features/picklist/hooks/usePicklist';
export { default as ShoppingCart } from '...';
export { default as ShoppingCartItem } from '...';
export * from './features/shoppingcart/hooks/useShoppingCart';
export { default as Checkout } from '...';
export { default as Inventory } from '...';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);</code></pre>
  
  <div style="text-align:right;">
    <a href="javascript:void(0);" class="toggle-link">Show React Example</a>
  </div>
</div>

It happens when an overabundance of modules are imported at the root level. Not only does this break component encapsulation, but can cause unintended root scoping of private services, too. Caution must be used to import modules only where they are consumed, preserving a well-structured dependency tree.

# Undefined Semantic Structure {#undefined-structure}

Having an undefined, or un-agreed upon, semantic project structure can cause problems, too. Without it:

* Project organization can degrade over time.
* Inconsistent file names can become hard to scan visually.
* Functionality can be hard to determine without opening the file.
* Imports can break easily when files are moved.

Introducing consistency here is the equivalent of laying a good foundation for a home. If the foundation sinks or heaves, problems show up everywhere in time.

### Directory Structure

Let’s talk about directory structure by considering another scenario. The product team wants us to add a “recents” expandable list in the header. This shortcut will provide links to recently visited dashboards as a navigation aid.

```
src/
├─ components/      // <-- ?
│  ├─ Header.ts
│  ├─ Footer.ts
│  └─ Button.ts
├─ modules/         // <-- ?
│  ├─ dashboard/    // <-- ?
│  │  ├─ Dashboard.ts
│  │  ├─ dashboardService.ts
│  │  └─ widgets/   // <-- ?
│  │     ├─ WidgetA.ts
│  │     └─ WidgetB.ts
│  └─ users/
│     ├─ UserList.ts
│     ├─ userService.ts
│     └─ UserCard.ts
├─ services/
│  ├─ api.ts
│  └─ auth.ts
└─ utils/
   ├─ helpers.ts
   └─ validators.ts
```
Now, where will this component live?

* In the components source directory similar to the Button component since its intent is to be used in the header?
* Its own module directory and exported?
* In the dashboard module and be exported alongside it to share the local dashboardService? 
* Its own widgets directory or the existing one?

The decision paralysis in this scenario isn’t limited to new developers. I’ve seen experienced developers fall for these easy-to-make mistakes when making changes to unorganized applications. If a poor decision is made, it only compounds the problem for the next person.

Having a predetermined structure will aid in this decision making so that developers don’t waste time navigating inconsistent patterns.

While directory structures should be derived from the project needs, this base structure is a great starting point and example:
```
src/
├─ core/
│  ├─ auth/
│  ├─ interceptors/
│  ├─ store/
│  └─ …
├─ features/
│  ├─ feature-codes-list/
│  ├─ feature-evidence-list/
│  ├─ tab-codes/
│  ├─ tab-evidence/
│  └─ …
├─ shared/
│  ├─ generics/
│  ├─ interfaces/
│  ├─ utilities/
│  │  └─ api.util.ts
│  └─ …
└─ …
```

The `shared/` directory is for both global and generic objects. Files are bucketed based on their definitions. For instance, interfaces and utility objects would exist here. These would be broadly used by feature components and core objects alike. They can include uses like types for state sharing, date formatting, sorting functionality, or lookups. The generics directory would have subdirectories for custom components. For instance a loading overlay or date-picker that isn’t specific to any one feature component.

The `core/` directory has a similar structure in that each directory grouping will have files bucketed on their definitions. These will be any and all root or application-wide dependencies such as security, session management, and state management; but differ from the shared directory in that they exist at the root context and are not meant to be initialized multiple times. For instance the store/ directory would be structured based on whatever implementation of Redux best fits the project.

The `features/` directory is different than the other two. Each feature component must have its own base directory which contains subdirectories for other building block components, local services, private utilities, etc. This becomes the foundation for our encapsulation pattern as feature components will consume other feature components by importing them as a module. It's where the bulk of our dependency tree complexity will live. For instance, the `tab-codes/` module may consume both the `feature-codes-list/` and `feature-evidence-list/` modules which group all of their dependencies, exposing only the top level component.

### Naming Convention

Although a much smaller ask, prefixes and suffixes can help add additional structure for quick-readability when navigating a project.

```
src/
├─ core/
│  ├─ store/
│  │  └─ codes/
│  │     ├─ codes.effect.ts
│  │     ├─ codes.reducer.ts
│  │     └─ …
│  └─ …
├─ features/
│  ├─ feature-codes-list/
│  │  ├─ codes-list.module.ts
│  │  ├─ services/
│  │  │  └─ codes-sort.service.ts
│  │  └─ components/
│  │     ├─ code-row/
│  │     └─ codes-list/
│  │        ├─ code-list.component.ts
│  │        └─ code-list.component.html
│  ├─ tab-codes/
│  └─ …
├─ shared/
│  ├─ interfaces/
│  │  └─ diagnosis-code.interface.ts
│  └─ …
└─ …
```
File suffixes can be used to indicate what the object does - we can see that `codes-list.ts` and `codes-list.html` both belong to the same component object - which could be especially useful when locating files through a global search.

Directory prefixes within a large directory like `features/` help us infer how a module is used. See that the both codes list and codes tab are feature components. We can infer that the `tab-codes/` directory is more of a top level component while the `feature-codes-list/` is intended for modular reuse.

Additionally, consistent naming like sticking to either camel or kebab case helps with directory tree readability and further enhances organization.

# Unscoped State Distribution {#unscoped-state}


<script>
document.querySelectorAll('.code-toggle').forEach(toggle => {
  const link = toggle.querySelector('.toggle-link');
  const angularBlock = toggle.querySelector('.angular');
  const reactBlock = toggle.querySelector('.react');
  let showingAngular = true;

  link.addEventListener('click', () => {
    if (showingAngular) {
      angularBlock.style.display = 'none';
      reactBlock.style.display = 'block';
      link.textContent = 'Show Angular Example';
    } else {
      angularBlock.style.display = 'block';
      reactBlock.style.display = 'none';
      link.textContent = 'Show React Example';
    }
    showingAngular = !showingAngular;
  });
});
</script>