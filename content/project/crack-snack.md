---
title: "Crack Snack"
date: 2025-12-20T11:04:36-04:00
draft: false
featured_image: images/pages/project/crack-snack/crack-snack-mak.png
featured_image_quality: 65
summary: Exploring the layers of safety behind Crackable Climbing's electromechanical crack climbing trainer and the unique hardware that makes it possible.
description: An in-depth look at the redundant safety layers and unique electromechanical hardware powering Crackable Climbing's crack climbing trainer. Explore the fail-safes that make these highly adjustable climbing trainers safe and reliable.
author: Matthew Miller
authorimage: images/global/author.webp
categories: [Embedded]
tags: [KiCAD, C++, Embedded, Hardware, PCB, Control, Climbing]
---

Before discussing the project at hand, it's important to start by framing the need for a safety device. For that, we'll need to understand what the heck a [_Crack Snack_](https://crackableclimbing.com/) is, what problem it solves, and what about this problem is unique in the rock climbing space.

## The Need for an Adjustable Crack
Arguably, the most popular and glamorized form of outdoor climbing is known as [free climbing](https://en.wikipedia.org/wiki/Free_climbing). While outdoor enthusiasts have been treating climbing as a distinct sport since the early 20th century, rock climbing as we know it today took form in the 1970s. This movement of [clean climbing](https://en.wikipedia.org/wiki/Clean_climbing) brought safety and sustainability to the activity paving the way for mainstream adoption.

Outdoor climbing's rise in popularity eventually fueled [demand for indoor climbing gyms](https://outdoors.stackexchange.com/questions/19915/when-did-indoor-climbing-gyms-start-to-become-popular). These indoor gyms provided a level of accessibility to specialized training equipment previously reserved for those who built their own. However, of the three categories of modern free climbing -- [bouldering](https://en.wikipedia.org/wiki/Bouldering), [sport climbing](https://en.wikipedia.org/wiki/Sport_climbing), and [trad climbing](https://en.wikipedia.org/wiki/Traditional_climbing) -- only techniques rooted in trad climbing remained difficult to learn indoors, namely [crack climbing](https://en.wikipedia.org/wiki/Crack_climbing).

Historically, gyms have tried to accomodate crack climbing practice by using screw-on [volumes](https://en.wikipedia.org/wiki/Glossary_of_climbing_terms#volume_hold) (left) or by building their own custom crack into the wall itself (right). While this provides an introduction to crack climbing indoors, it does not -- and can not -- account for the range of sizes needed for a variety of climbers to train all the hand and foot sizes they may experience outdoors.

{{< imgc src="pages/project/crack-snack/gym-cracks.png" alt="Gym Crack Examples" quality="45" >}}

This is not only due to the natural variation in outdoor rock features, but also differences in hand and foot sizes across people. What may be considered a perfect or easy sized crack for one person may be awkward and difficult for another. Hence the need for an adjustable crack climbing trainer.

## Enter, the Crack Snack
Our solution, which appeared publicaly in March of 2023, was to make a fully adjustable crack climbing trainer that could be mounted to a tilt board for maximum versatility. This would allow climbers to practice techniques at a variety of sizes and angles. Most of what they would encounter outside could now be simulated indoors.

[{{< imgc src="pages/project/crack-snack/crack-snack-matt-jason.jpg" alt="Crack Snack Creators" quality="47" >}}](https://www.instagram.com/p/CpixfHdPPM_/)

The idea behind the [Crack Snack](https://crackableclimbing.com/) belongs to my long-time climbing friend Jason. Its physical design is the result of his many experiments building climbing trainers for personal use coupled with his experience designing high-quality custom installations at [Urban Tree](https://pittsburghurbantree.com/). 


What makes this system truely unique, aside from it being a work of art, is that it moves under its own power. This brought with it its own list of challenges. A dedicated safety system being of utmost importance -- _which is where my contribution comes into play_.


## Safety First
The idea for safety system emerged during a crack climbing training session using Jason's machines. As we discussed the inherent dangers of a machine that moves under its own power, the need to protect users became obvious.

{{< videoloop mp4="videos/pages/project/crack-snack/crack-moving.mp4" >}}

The danger stems from the need to provide a realistic climbing experience. Climbers generate significant compressive force through hand and foot wedging techniques; if the system isn't sufficiently rigid, these forces will either [deflect](https://en.wikipedia.org/wiki/Deflection_(engineering)) the crack volumes or [backdrive](https://www.linearmotiontips.com/what-is-back-driving-and-why-is-it-important/) the linear motion assembly.

It was paramount we minimize system displacement under load. When crack climbing, any movement in the system feels amplified. Less than an 1/8th of an inch difference (~3.2 mm) can change the technique used to stay wedged in a crack.

Unfortunately for us, linear systems with high backdrive force generally produce strong driving forces due to the same mechanical principles that resist backdriving. In our application, users would be sticking their hands inside of something that both moves on its own and produces... a lot of force...

[{{< videoloop mp4="videos/pages/project/crack-snack/a-new-hope-trash-compactor.mp4" >}}](https://www.imdb.com/title/tt0076759/)

We decided having a multi-layered approach to safety would be best, which we broke out into the following high-level requirements:

* __Two-Hand Control:__ Require dual-button activation to ensure hands are clear of the machine during motion.
* __Status Feedback:__ Provide real-time operational state feedback to users.
* __Obstruction Sensing:__ Detect obstacles during operation and trigger an immediate safe state.
* __System Self-Tests:__ Periodically verify the integrity of all safety systems.
* __Fail-Safe Design:__ Ensure the system defaults to a safe state upon any internal failure.
* __Hardware Robustness:__ Protect custom hardware against power transients and electrical noise.

To minimize complexity and accelerate our time to delivery, we initially planned to rely on [COTS](https://en.wikipedia.org/wiki/Commercial_off-the-shelf) equipment for as much as possible. However, during planning, we quickly found that forcing off-the-shelf controllers to handle our specific integration requirements to be both cost prohibitive and unnecessarily complex. Instead I elected to design custom hardware tailored to communicate directly with a COTS linear motion system to handle user input and safety.

## Control System
To discuss the complexities of this control system, it’s easiest to break it down into individual sections. This approach is a practical way to understand the system at a high level.

### Human Machine Interface
buttons and use, two hand control and user feedback -- stitch two gifs side by side - blinking async and blinking sync

### Control Logic
state diagram, talk about finite state machine (in chunks (use obstruction vaguely)), what happens during an obstruction but refer to obstruction as "enter a safe state". Obstruction actions can be talked about in the next section.

### Obstruction Sensing
light wall vs load cells. 
polling rate and how the sensors actively check themselves
What happens when an obstruction happens closing vs opening

### Diagnostics
talk about the need to run diagnostics and the repo I used. Not sharing




## Custom Hardware
this is where we can put the hardware diagram to start this section. This will show where the PCB exists, what is cots and what is not

Like all prototypes, the safety system began as a rats-nest of an arduino...
{{< imgc src="pages/project/crack-snack/crack-control-heinous-prototype.jpg" alt="Prototype Rat's Nest" quality="30" >}}

Good enough to run early 3d printers, had plenty of power to do what we needed

talk about pcb design, burning fuses, benifits to having it a board with both assembly time, robustness, testing. Hurtles finding parts. Small batch pricing. Design for part availability (in house parts), software written for chips, etc..

