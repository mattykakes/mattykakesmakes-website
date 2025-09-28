---
title: "The First Project"
date: 2025-09-27T11:04:36-04:00
draft: false
lang: en
featured_image: images/pages/project/the-first-project/qcv-touchup.png
featured_image_quality: 55
summary: A blast from the past that changed my career! Revisiting my first portfolio piece and the design decisions behind it.
description: A C++ photo editor built with Qt and OpenCV — the project that helped launch my career. Looking back years later, I reflect on its design choices, challenges, and lessons learned from my younger self’s work.
author: Matthew Miller
authorimage: images/global/author.webp
categories: [Software]
tags: [OpenCV, Qt, C++, Windows, Photography, Editor]
---

## Changing My Trajectory
__The year was 2018__ -- I spent the first few years of my career writing requirements for nuclear I&C system hardware. Important as it was, building a career in IBM Rational DOORS and Microsoft Word is not what I had envisioned for myself. However, the clock was ticking. Each passing week, I felt more removed from my education and passion for building things. It had become obvious that I would compete against applicants who spent 40 hours a week writing software while I was writing government letters for review. The longer I waited, the harder it would be to get hired doing something that could satisfy me. I was desperate for experience to make myself marketable. I needed a portfolio piece…

## Design Criteria
I put together loose requirements to make myself marketable upon completing this journey. My portfolio piece must demonstrate an understanding of:
* OOP and SOLID design principles
* Asynchronous and reactive programming
* A popular software framework
* At least one popular third-party library
* An ability to establish and apply design patterns

Building an application with these principles was not the whole challenge, but rather building an application to demonstrate an obvious understanding of said principles was. There is a limited amount of time to capture a hiring manager’s attention. To do so, I had to be a silent salesman.

With my studies focused on computer architecture and embedded systems, a web application was out of the question at the time. Even though it would be the easiest project for a manager to access, I didn’t want to overcome another barrier to entry at the time. This goes without saying, I wasn’t looking for web application jobs. I always wanted to be in proximity to the hardware; C++ was my language of choice.

The importance of utility in what I built also played a role. I wanted to build something I might use myself once finished. Something to stand out from the others I’d be competing against. Something with substance! Posting coursework to GitHub just didn’t sit well with me as a portfolio piece. I needed to avoid highlighting _fluff_. I needed something polished, even if there was a chance it could turn out to be polished :poop:.

## Getting Started
The idea of building a photo editor might seem like a waste of time from the outside, but it really did check all the boxes. Although what led me to this solution was less systematic than it could have been. A spiderweb of logic between exposure to relevant material during my undergraduate studies and the doors I hoped to open in the future.

I don’t remember why I felt this way, but in looking for something practical to build, I remember being displeased with free, simple photo editors at the time (circa early Windows 10). It was enough to convince myself that a lightweight photo editor could be my white whale. From a technical perspective, it made sense. Application programming is often reactive, [or at least event-driven](https://stackoverflow.com/a/34496621), and object-oriented in nature. Additionally, if I wanted to build something that was easily expanded upon, I'd have to adhere to at least some [SOLID design principles](https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design) and an organized project structure. If I didn't, it would get painful fast -- a good indication to pivot if I was doing something wrong.

There were two BIG requirements I had in selecting a framework: it must be cross-platform and widely adopted. While [wxWidgets](https://wxwidgets.org/) and [GTK](https://www.gtk.org/) were good contenders, [Qt](https://www.qt.io/) was a clear winner. Unlike the others, which are more limited GUI toolkits, Qt is a full-fledged application framework. Its ecosystem supports everything from production-grade desktop software to mobile and embedded UIs; even providing a built-in [observer pattern](https://en.wikipedia.org/wiki/Observer_pattern) signaling mechanism, powered by its [MOC](https://doc.qt.io/qt-6/moc.html), without the need to introduce additional libraries. The more I read about its adoption across industries, the more I felt confident in my my decision. It was the most versitile option and therefore likely to translate into applicable experience. 

Everything I needed was bundled into the Qt framework. Yet I still wanted to add an external library. This would demonstrate that I understood the build process enough to link and manage external dependencies. Picking up more experience with another popular tool couldn't hurt my chances either. While I had coursework in college on writing image processing algorithms, doing it here felt like a time-consuming way to reinvent the wheel. It was an easy choice to make. I would use [OpenCV](https://opencv.org/) to perform the actual image operations.

## Features
The qcvTouchUp image editor supports color and light adjustments, sharpening and blurring, and transformations. All operations are GPU-accelerated using OpenGL but fall back to the CPU if OpenGL bindings are unavailable. The image processing happens in worker threads separate from the UI, which allows for lag-free previews of image edits when manipulating the QWidget menu items. Loading files could be done via drag and drop into the preview area while saving supported JPEG, PNG, and WebP formats.

## Challenges
First and foremost had to be the sheer amount of information to learn. Having very little coding experience outside of undergraduate classes at the time, I remember this feeling like a bear of a project. I was very fortunate that both Qt and OpenCV have excellent documentation. In the time before public-facing [LLMs](https://en.wikipedia.org/wiki/Large_language_model) like [ChatGPT](https://chatgpt.com/), this was invaluable for free-to-use tools and libraries.

The reactive nature of image processing also posed a challenge. I did not have the foresight to implement a smarter image preview strategy, like breaking the image up into tiles for processing or scaling the operated-on preview buffer to match the photo viewport. OpenCV is generating previews on the full-resolution images. Since the image processing is handled on a separate worker thread than the UI, a [queued connection](https://doc.qt.io/archives/qt-5.15/qt.html#ConnectionType-enum) is used to signal user input changes from the main thread. Since processing a request takes longer than a slider moving across the screen, the queue would fill with requests from each tick mark a slider passes. The preview would lag while waiting for the worker thread to finish with the previous request as the queue grew. The solution was to write a simple [signal/slot filter](https://github.com/mattykakesmakes/qcvTouchUp/blob/master/app_filters/signalsuppressor.h) to ignore incoming requests while work was being performed, queuing only the last request for the observer to operate on. By dropping intermediate requests, I was able to coordinate a preview that was perceived as lag-free.

I remember the [image viewport widget](https://github.com/mattykakesmakes/qcvTouchUp/blob/master/imagewidget.h) also being a bit challenging, yet one of the more fun parts of the project. This widget supports drag-and-drop file opening, point-of-interest scaling (cursor location is the focal point for zoom in/out), region-of-interest selection, and translation for cropping (click and drag when the crop tool is selected to select a region, then click and drag the region to relocate it). To do this correctly, there was a small amount of geometry needed to translate all of the coordinates based on the image location and scale.

## Shortcomings
Planning would have to be the biggest one. Something I had to learn from experience is that good software comes from planning your work before writing code. Whether it’s enterprise microservice architecture or a small tool’s directory structure, planning will set the interest rate for accruing technical debt – which only gets worse with time. This project is a great example of exactly that. I had a general idea of what I wanted to do, but it more or less fell into place as I went. This led to time spent on rework, poor application of design principles, and all-around head-scratching. I bet I could have finished a much more polished project in half the time if I were patient in my approach.

The UX and UI leave something to be desired. I always intended to go back and redesign the side panel as a [Qt Quick embedded widget](https://doc.qt.io/qt-6/qtquick-embeddedinwidgets-example.html) at the tail end of the project. Instead, the interface lives on as an obvious afterthought at best. I eventually dubbed the project "super good enough" and started applying to jobs with it as my showcase piece. However, there is a small example of an embedded Qt Quick element in the image editor that served as a proof-of-concept for the _later_ that never came. I did end up building a full [QML Android application](https://github.com/mattykakesmakes/QPlumbob) to round out my Qt framework skills. Feel free to check that out, too. It was a [BLE](https://en.wikipedia.org/wiki/Bluetooth_Low_Energy) controller intended to light up a [Sims](https://www.ea.com/games/the-sims)-style overhead plumbob for a Halloween costume.

I don't remember this being a problem when I built the app, but after dusting off the project to write this article, I found a glaring bug. The rotate tool crashes periodically. I don't think I'll take the time to figure out why. It could be anything from (most likely) my fault to driver compatibility issues with old library versions ¯\\(ツ)/¯ .

## Try it Out!
Even though the [qcvTouchUp project](https://github.com/mattykakesmakes/qcvTouchUp) originated as an early teaching tool for me, I believe it is still worth playing with, and I am proud of what I built and where it took me. Because of this project, I landed my first software job. It was a contract-to-hire position, but to me it was an invaluable lifeline.

If you have access to a x64 version of Windows, download and extract the [archive](https://github.com/mattykakesmakes/qcvTouchUp/releases/tag/V0.0.3). Look for qcvTouchUp.exe to launch it. It takes a moment to load the linked packages into memory, and there is no splash screen, so be patient with the first launch if it is not immediate. Enjoy!
