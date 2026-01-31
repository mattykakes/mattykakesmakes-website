---
title: "Crack Snack"
date: 2026-01-30T11:10:36-04:00
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

Outdoor climbing's rise in popularity eventually fueled [demand for indoor climbing gyms](https://outdoors.stackexchange.com/questions/19915/when-did-indoor-climbing-gyms-start-to-become-popular). These indoor gyms provided a level of accessibility to specialized training equipment previously reserved for those who built their own setups. However, of the three categories of modern free climbing -- [bouldering](https://en.wikipedia.org/wiki/Bouldering), [sport climbing](https://en.wikipedia.org/wiki/Sport_climbing), and [trad climbing](https://en.wikipedia.org/wiki/Traditional_climbing) -- only techniques rooted in trad climbing remained difficult to learn indoors, namely [crack climbing](https://en.wikipedia.org/wiki/Crack_climbing).

Historically, gyms have tried to accommodate crack climbing practice by using screw-on [volumes](https://en.wikipedia.org/wiki/Glossary_of_climbing_terms#volume_hold) (left) or by building their own custom crack into the wall itself (right). While this provides an introduction to crack climbing indoors, it does not -- and can not -- account for the range of sizes needed for a variety of climbers to train all the hand and foot sizes they may experience outdoors.

{{< imgc src="pages/project/crack-snack/gym-cracks.png" alt="Gym Crack Examples" quality="45" >}}

This is not only due to the natural variation in outdoor rock features, but also differences in hand and foot sizes across people. What may be considered a perfect or easy sized crack for one person may be awkward and difficult for another. Hence the need for an adjustable crack climbing trainer.

## Enter, the Crack Snack
Our solution, which appeared publicaly in __March of 2023__, was to make a fully adjustable crack climbing trainer that could be mounted to a tilt board for maximum versatility. This would allow climbers to practice techniques at a variety of sizes and angles. Most of what they would encounter outside could now be simulated indoors!

[{{< imgc src="pages/project/crack-snack/crack-snack-matt-jason.jpg" alt="Crack Snack Creators" quality="47" >}}](https://www.instagram.com/p/CpixfHdPPM_/)

The idea behind the [Crack Snack](https://crackableclimbing.com/) belongs to my long-time climbing friend Jason. Its physical design is the result of his many experiments building climbing trainers for personal use coupled with his experience designing high-quality custom installations at [Urban Tree](https://pittsburghurbantree.com/). 


What makes this system truly unique, aside from it being a work of art, is that it moves under its own power. This brought with it its own list of challenges. A dedicated safety system being of utmost importance -- _which is where my contribution comes into play_.


## Safety First {#safety}
The idea for a safety system emerged during a crack climbing training session using Jason's machines. As we discussed the inherent dangers of a machine that moves under its own power, the need to protect users became obvious.

{{< videoloop mp4="videos/pages/project/crack-snack/crack-moving.mp4" poster="videos/pages/project/crack-snack/posters/crack-moving.jpg" >}}

The danger stems from the need to provide a realistic climbing experience. Climbers generate significant compressive force through hand and foot wedging techniques; if the system isn't sufficiently rigid, these forces will either [deflect](https://en.wikipedia.org/wiki/Deflection_(engineering)) the crack volumes or [backdrive](https://www.linearmotiontips.com/what-is-back-driving-and-why-is-it-important/) the linear motion assembly.

It was paramount we minimize system displacement under load. When crack climbing, any movement in the system feels amplified. Less than an 1/8 of an inch difference (~3.2 mm) can change the technique used to stay wedged in a crack.

Unfortunately for us, linear systems with high backdrive force generally produce strong driving forces due to the same mechanical principles that resist backdriving. In our application, users would be sticking their hands inside of something that both moves on its own and produces... a lot of force...

{{< videoloop mp4="videos/pages/project/crack-snack/a-new-hope-trash-compactor.mp4" poster="videos/pages/project/crack-snack/posters/a-new-hope-trash-compactor.jpg" >}}

We decided having a multi-layered approach to safety would be best, which we broke out into the following high-level requirements:

* __Two-Hand Control:__ Require dual-button activation to ensure hands are clear of the machine during motion.
* __Status Feedback:__ Provide real-time operational state feedback to users.
* __Obstruction Sensing:__ Detect obstacles during operation and trigger an immediate safe state.
* __System Self-Tests:__ Periodically verify the integrity of all safety systems.
* __Fail-Safe Design:__ Ensure the system defaults to a safe state upon any internal failure.
* __Hardware Robustness:__ Protect custom hardware against power transients and electrical noise.

To minimize complexity and accelerate our time to delivery, we initially planned to rely on [COTS](https://en.wikipedia.org/wiki/Commercial_off-the-shelf) equipment for as much as possible. However, during planning, we quickly found that forcing off-the-shelf controllers to handle our specific integration requirements to be both cost prohibitive and unnecessarily complex. Instead I elected to design custom hardware tailored to communicate directly with a COTS linear motion system to handle user input and safety.

## Control System {#control}
To discuss the complexities of this control system, it’s easiest to break it down into individual sections. This approach is a practical way to understand the system at a high level.

### Human Machine Interface
The sign of a truly intuitive user interface is one that is so clear and self-explanatory that users don't need instructions. Users should be able to understand a device's function and operate it through familiarity and visual cues alone -- at least... as much as possible.

Operating a Crack Snack needed to balance safety without creating barriers that could compromise ease of use.

For safety, we borrowed a _two hand operation_ approach from industrial equipment. Machines like [power presses](https://en.wikipedia.org/wiki/Machine_press) and [stamping machines](https://en.wikipedia.org/wiki/Stamping_press) often require two hand controls to reduce the risk of the operator's hand being in the danger zone during operation. By placing buttons on either side of the device, users cannot stick their hands in the device during adjustment, which they might be tempted to do when sizing the crack.

{{< imgc src="pages/project/crack-snack/crack-control.png" alt="Crack Snack Control" quality="60" >}}

But how to make the two handed operation intuitive with the buttons so far apart?

* __Place buttons at an equal and ergonomic height__ -- By placing the buttons in a consistent and visible place, it will indicate that the buttons are meant for operation.
* __Use buttons that are inviting__ -- Some buttons, like [emergency stop switches](https://en.wikipedia.org/wiki/Kill_switch), are designed to discourage casual use. [Arcade](https://en.wikipedia.org/wiki/Arcade_cabinet)-style buttons carry a friendly and established history. Leveraging this familiarity signals to users that these buttons are intended as primary inputs.
* __Matching button colors__ -- With matching colors on each panel, the design suggests to users that buttons are operated by being pressed together. This leverages the [Gestalt Principle](https://en.wikipedia.org/wiki/Principles_of_grouping) known as the [Law of Similarity](https://www.interaction-design.org/literature/article/the-law-of-similarity-gestalt-principles-1?srsltid=AfmBOoq7ZvdV5Hkll3MGwS7QdHUPgu60-oKwq-WLZX3k86Rqlxsj9hSE).
* __Selecting familiar colors__ -- Use universal standards to make operation intuitive. While red and green typically mean stop and go, pairing red with a neutral color like blue creates clear movement cues. In this context, red leverages its association with "danger" to signal that it closes the device.
* __Use buttons for feedback__ -- The buttons already have the user's attention. By illuminating the buttons in different patterns, they can be used to communicate the status of the device without needing a separate screen.

{{< videoloop mp4="videos/pages/project/crack-snack/button-blink.mp4" poster="videos/pages/project/crack-snack/posters/button-blink.jpg" >}}

Even blinking patterns can be leveraged to provide sophisticated feedback. Flashing lights are often used to signal something has gone wrong or that a system is active. In our case we utilize separate patterns to convey different states:

* __Fault state__ -- the button pairs blink synchronously to alert the user to an error and that operation is disabled.
* __Standard operation__ -- the pressed button pair (<span style="color: #D20A2E;">red</span> _or_ <span style="color: #1591EA;">blue</span>) blink to signal input is being received, providing real-time confirmation of movement. 
* __Startup__ -- A brief blink sequence upon startup serves as a "heartbeat" to signal the device is active and ready for use.

Through this intentional design, the Crack Snack provides both an intuitive and safe user interface that meets our two-hand control and status feedback requirements.

### Obstruction Sensing
As mentioned in the [safety section](#safety), any electromechanical crack climbing trainer will need some level of obstruction sensing to be considered truly safe -- due to the forces in play. The Crack Snack was no exception. Our first task was to select a sensing technology. To guide our choice, we again looked toward industrial equipment for a solution which left us with a myraid of options that could be split into two destinct categories: _proximity_ and _contact_ sensing.

We ruled out proximity sensing for a few reasons... Proximity sensing can become computationally heavy and is often susceptible to environmental noise, which means more time spent on filtering and fine-tuning. Since I was designing the control system hardware myself, opting for contact sensing helped us hit our deadline by avoiding the headache of potential rework and keeping the required hardware simple.

Eventually, we decided to use [load cells](https://en.wikipedia.org/wiki/Load_cell) for contact sensing. Load cells are immune to the EMI issues that often plague [capacitive sensing](https://en.wikipedia.org/wiki/Capacitive_sensing) -- a significant advantage given the concerns over using large areas of foil behind the crack decks. Furthermore, they offer significantly higher resolution than typical motor [current sensing](https://en.wikipedia.org/wiki/Current_sensing), allowing for the detection of minute changes in force that would otherwise go unnoticed. This sensitivity allows the load cells to detect spikes in force caused by mechanical misalignment, poor installation, or structural damage -- offering two-for-one diagnostic capabilities that would not be possible with most other sensing technologies.

We designed the system to detect obstructions in real-time by monitoring load cell data for any readings exceeding preset thresholds, whether the interference originates from the interior or exterior of the crack. To ensure total system integrity, sensor data is polled 15 times per second via an [ISR](https://en.wikipedia.org/wiki/Interrupt_handler). This routine acts as a hardware watchdog. If the [ADC](https://en.wikipedia.org/wiki/Analog-to-digital_converter)s fail to report within a strict timing window, or if the system fails to detect the expected force deviations while in motion, it assumes hardware damage or sensor failure. In either case, the Crack Snack immediately enters a fault state and initiates a safety lockout to prevent unsafe movement.

__DISCLAIMER:__ ⚠️ DO NOT try to crush yourself with the Crack Snack. Any intentional action you take to test the system on your own is strictly at your own risk. ⚠️

### Control Logic
The system operates as a [finite state machine](https://en.wikipedia.org/wiki/Finite-state_machine), where the transition between states is governed by user input and sensor feedback. To ensure operational safety, the logic is split into two primary modes: __Standard Operation__ (where the system responds to user input through extension and retraction of the volume) and a __Fault State__ (where the system locks down following a detected obstruction or hardware failure). While this is not shown in the table, these modes are separated by [bitmasks](https://en.wikipedia.org/wiki/Mask_(computing)) which act as logical gatekeepers. The system must satisfy `MASK_STATE_OK` bitwise check before it will process any movement commands. If a fault is detected, the system shifts to a state covered by the `MASK_STATE_FAULT` bitmask, effectively locking the machine out of its standard operational loop until a manual reset sequence is successfully completed.

The table below outlines the behavior of the system once it has successfully passed its power-on self-test.

| Logical State | Trigger / Entry Condition | Hardware Action | LED Behavior | Exit / Next State |
| ------------- | ------------------------- | --------------- | ------------ | ----------------- |
| STATE_IDLE    | No buttons pressed OR Fault cleared | All signals INACTIVE | LEDs OFF | EXTEND or RETRACT on button press. |
| STATE_EXTEND  | Blue buttons pressed + Threshold OK | EXTEND_SIGNAL Active | Blue Blink |  IDLE on release or JAM_ON_EXTEND |
| STATE_RETRACT | Red buttons pressed + Threshold OK | RETRACT_SIGNAL Active | Red Blink | IDLE on release or JAM_ON_RETRACT |
| STATE_JAM_ON_EXTEND | Blue buttons + Extend threshold exceeded | INACTIVE -- Stops all movement | OFF | Auto-transitions to WAIT_FOR_CLEAR |
| STATE_JAM_ON_RETRACT | Red buttons + Retract threshold exceeded | Safety Rescue: Brief extend move then INACTIVE -- Stops all movement | OFF | Auto-transitions to WAIT_FOR_CLEAR |
| STATE_LOAD_CELL_FAULT | Failed post-run sensor check | INACTIVE | OFF | Auto-transitions to WAIT_FOR_CLEAR |
| STATE_WAIT_FOR_CLEAR | Triggered by any Fault state | INACTIVE | Both Blink | FAULT_CLEARED after both buttons held for 10s |
| STATE_FAULT_CLEARED | Both buttons held for 10s | INACTIVE | Both Solid ON | IDLE after both buttons are released for 10s |

This design ensures the system remains in a predictable state at all times. By requiring a deliberate reset, the control logic removes the risk of accidental restarts. The decision to resume operation is an explicit decision by the operator. The result is a system that prioritizes mechanical preservation and user safety above all else.

### Diagnostics
To build and diagnose issues with the system, we needed robust diagnostic abilities. For this, I developed a simple command utility I called the [Serial Command Coordinator](https://github.com/mattykakes/SerialCommandCoordinator), which maps specific system functions to serial inputs. This allowed me to build a dedicated interface for direct hardware interaction, serving three critical roles:

* __Calibration__ -- It allows for the precise zeroing and scaling of the load cells, which is essential for accurate obstruction detection across installations.
* __Monitoring__ -- The ability to stream raw sensor data allows us to observe the _noise floor_ of the system; which lets us adjust sensor thresholds as well as inspect the system for wear, damage, or misalignment.
* __Testing__ -- During development or maintenance, the utility provides the ability to boot into different operating modes. These modes allow for manual movement, verbose logging, and stress testing without the constraints of the standard safety loop.

USB connectivity is disabled during normal operation for safety -- these commands are inaccessible to the end user; however, this transparency ensures that proper diagnostics can be performed during maintenance and development. Without it, quantifying and correcting anomalies would be impossible.

## Custom Hardware
The brain of the Crack Snack resides in its custom safety module. This [PCB](https://en.wikipedia.org/wiki/Printed_circuit_board) is responsible for integrating the COTS modules and various inputs into a unified system. Not only does the safety module run the [control system](#control) from the previous section -- it also extends the safety system to be redundant through the hardware itself.

{{< imgc src="pages/project/crack-snack/crack-module-diagram.png" alt="Crack Module Diagram" quality="83" >}}

From a hardware perspective, the safety module acts as the interface between the user and the device as a whole. It samples the analog signals from the load cells and monitors the control buttons, translating these inputs into coordinated signals that drive the motor controller and LED indicators. Since I optimized the design to minimize computational complexity, a standard 8-bit microcontroller could provide more than enough headroom to handle these tasks. This allowed focus to shift toward the physical robustness of the module.

However, no product starts in its final form; the journey to a polished board is paved with iterations. The Crack Snack, like many hardware projects, began its life as a **_heinous_** [Arduino](https://www.arduino.cc/) based prototype to prove the concept and work out kinks. This early version was a chaotic collection of relays and breakout modules. While fragile, it validated the core logic of the state machine and let us work through mechanical changes. 

{{< imgc src="pages/project/crack-snack/crack-control-heinous-prototype.jpg" alt="Heinous Prototype" quality="30" >}}

The next step was to actually design the PCB... something I had never done before. Even with a degree in Computer Engineering, I really only had a starting point in theoretical circuit design and analysis. To move into the manufactured realm, I had to teach myself an entirely new set of [EDA](https://en.wikipedia.org/wiki/Electronic_design_automation) toolchains, industry best practices, and various manufacturing constraints -- the latter being the biggest surprise of the whole design process.

To make the safety module economical, I needed to outsource the assembly. Outsourcing wasn't just to cut down on Crack Snack assembly time; more importantly, it was about leveraging professional quality control. Services like automated optical inspection and probe testing are nearly impossible to replicate without factory automation.

Since we didn't plan on mass-producing after the prototype stage, we needed a service focused on small batches. The goal was to find a low-cost, _prototype-focused_ manufacturer with a fast turnaround. However, I quickly learned a key constraint: while these shops can source parts, it is much more efficient and cost effective to choose a manufacturer first and then design the board specifically around their in-stock inventory.

This is where the inventory constraints really came into play. For the prototype, I used the Avia HX711 ADC because it was [readily available](https://www.sparkfun.com/sparkfun-load-cell-amplifier-hx711.html) in a [breakout board](https://www.pcbasic.com/blog/breakout_board.html) form factor. My design paired it with an [Arduino AVR core](https://github.com/arduino/ArduinoCore-avr) compatible microcontroller, allowing me to use an already available [HX711 library](https://github.com/bogde/HX711) instead of writing my own. To stay on schedule, I also wanted to avoid learning yet another toolchain, so staying in the Arduino ecosystem saved me the headache. Consequently, my search for a manufacturer centered on finding one that could reliably source these two specific chips; the rest of my components were generic enough that a variant would be available in stock anywhere.

> An aside -- I wasn't concerned about using the Arduino toolchain for this product; it has a proven track record in early 3D printers and other niche control systems. The time saved far outweighed the negligible overhead of the library. It wouldn't impact the system's responsiveness in any perceivable way.

At the time, the HX711 proved difficult to find in domestic inventories so I had to look abroad. I landed on using [JLCPCB](https://jlcpcb.com/) and desiged a 2-layer board tailored to their component stock. As part of their service they included a [DFM](https://en.wikipedia.org/wiki/Design_for_manufacturability) review that even caught a few issues before production. This route also proved to be highly cost-effective; the boards arrived fully assembled for about $30 each. It was clear validation of the decision to go custom -- we were able to deliver a purpose-built safety system for a fraction of the cost of a less-integrated COTS alternative. Pictured below is version 3 of the finished safety module next to its snap-together 3D printed enclosure.

{{< imgc src="pages/project/crack-snack/crack-control-safety-module.png" alt="Safety Module v3" quality="65" >}}

The physical layout of the board continued the safety-first mindset. The power management section implements a via farm beneath the voltage regulator to pull heat away from the component and into the copper plane on the back of the board. The logic is also safeguarded with transient voltage suppression and reverse polarity protection.

Above all else, the most critical safety feature in the hardware is the physical isolation of the signal that closes the crack. By using a surface mount relay in a _normally open_ configuration, the signal path to close the Crack Snack is physically disconnected from the voltage level shifter and remains grounded by default. The relay is wired directly to the retract buttons via a trace that splits at the screw terminal shared with the controller input. This hardware-level interlock means that if the board malfunctions in any way, it is physically impossible for the device to send a close signal to the COTS motor controller. The signal that opens the crack is left out of the _normally open_ relay path so that if the system detects an obstruction while closing, the microcontroller can still trigger an emergency opening to release the pressure before its lockout procedure.


## Wrapping Up
Reflecting on this project, the journey from an idea during a training session to a finished product that included a custom manufactured PCB felt like a real, high-level circuit design course. Having a hard deadline and a critical safety goal forced me out of my comfort zone to learn an entirely new set of skills by diving head-first into the realities electronics manufacturing -- let alone taking part in every step required to launch a product, which was exciting on its own. If nothing else this was a rad, practical engineering experience that I couldn't replicate in any sort of classroom setting, and I'm happy Jason trusted me to do my part 🙂.

If you are looking to bridge the gap between breadboard prototypes and professional hardware, these are the resources I found to be the most invaluable during the design phase of the safety module:
* [KiCAD](https://www.kicad.org/) -- An open-source EDA software suite. It's a professional grade tool for designing schematics and PCBs.
* [Electronic Component Search Engine](https://componentsearchengine.com/) -- A free resource for downloading 3D models, footprints, and schematic symbols for electronic components. 
* [Practical Electronics for Inventors](https://www.barnesandnoble.com/w/practical-electronics-for-inventors-fourth-edition-paul-scherz/1122324251) -- An excellent reference book for practical circuit design and analysis.
* [Electrical Engineering Stack Exchange](https://electronics.stackexchange.com/) -- A Q&A site where engineers and hobbyists help each other with technical problems related to electronics design. It has a lot of PCB design best-practices and recommendations.

<p style="text-align: right;">... and if you haven't already – check out the <a href="https://crackableclimbing.com/" target="_blank" rel="noopener">Crack Snack</a>!</p>

{{< youtube QKlrF5N2bq4 >}}
