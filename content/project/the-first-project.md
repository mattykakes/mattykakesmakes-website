---
title: "The First Project"
date: 2025-09-14T11:10:36+08:00
draft: false
language: en
featured_image: images/pages/project/the-first-project/qcv-touchup.png
featured_image_quality: 55
summary: A blast from the past that changed my career! The decisions behind my first portfolio piece as an inexperienced engineer.
description: TODO - The description is a meta description, primarily used for search engine optimization (SEO) and social media sharing. It provides a brief, keyword-rich overview of the page's content that search engines might display in their results.
author: Matthew
authorimage: assets/images/global/author.webp
categories: Project
tags: [OpenCV, Qt, C++, Windows, Editor]
---

## Changing My Trajectory
__The year was 2018__ -- I spent the first few years of my career writing requirements for nuclear I&C system hardware. Important as it was; building a career in IBM Rational DOORS and Microsoft Word is not what I had invisioned for myself. However, the clock was ticking. Each passing week I felt more removed from my education and passion for building things. It had become obvious I would compete against applicants who spent 40 hours a week writing software while I was writing government letters for review. The longer I waited, the harder it would be to get hired doing something that could satisfy me. I was desperate for experience to make myself marketable. I needed a portfolio piece...

## Design Criteria
I put together loose requirements to make myself marketable upon completing this journey. My portfolio piece must demonstrate an understanding of:
* OOP and SOLID design principles
* Asynchronous and reactive programming
* A popular software framework
* At least one popular third party library
* An ability to establish and apply design patterns

Building an application with these principles was not the whole challenge, but rather building an application to highlight an understanding of said principles in under 30 seconds was. There is a limited amount of time to capture a hiring manager's attention. To do so I had to be a silent salesman.

With my studies focused on computer architecture and embedded systems, a web application was out of the question. Even though it would be the easiest project for a manager to access, I had a lot on my plate and didn't want to overcome another barrier of entry at the time. This goes without saying I wasn't looking for web application jobs. I always wanted to be in close proximity to the hardware so C++ was my language of choice at the time.

The importance of utility in what I built also played a role. I wanted to build something I might use myself once finished. Something to stand out from the others I'd be competing against. Something with substance! Posting coursework to GitHub just didn't sit well with me at the time. I needed to avoid highlighting fluff. I needed something polished, even if there was a chance it could turn out to be :poop:.

## But Why a Photo Editor?
It checked all the boxes! ...But really what lead me to this solution was less systematic than it could have been. A spiderweb of logic between exposure to relevant material during my undergraduate studies and what doors I wanted to open in the future is what lead me to this conclusion.

### The Project
I don't remember why I felt this way, but in looking for something practical to build I remember being displeased with free photo editor options at the time (circa early Windows 10). It was enough to convince myself a light wight editor could be my white whale. From a technical perspective it made sense. Application programming is often reactive, [or at least event-driven](https://stackoverflow.com/a/34496621), and object oriented in nature. Additionally if I wanted to build something that was easily expanded upon I'd have to adhere to at least some [SOLID design principles](https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design) and an organized project structure. If I didn't, it would get painful fast -- a good indication to pivot if I was doing something wrong.

### The Framework
There were two BIG requirements I had in selecting a framework: it must be cross-platform and widely adopted. While [wxWidgets](https://wxwidgets.org/) and [GTK](https://www.gtk.org/) were good contenders with their own strengths, [Qt](https://www.qt.io/) was a clear winner. Unlike the others, which are more limited GUI toolkits, Qt is a full fledged application framework. Its ecosystem supports everything from production-grade desktop software to mobile and embedded UIs; even providing a built in [observer pattern](https://en.wikipedia.org/wiki/Observer_pattern) signaling mechanism, powered by its [MOC](https://doc.qt.io/qt-6/moc.html), without the need to introduce additional libraries. The more I read about its adoption across industries, the more I felt confident in my my decision. It was the most versitile option, and therefore the most likely to translate directly into applicable experience. 

### The Library
TODO - With everything bundled so nicely into the Qt framework I still needed an external library to show I could manage external dependencies to integrate into it...... I had taken classes on image processing and even wrote algorithms using CUDA in my undergraduate research work -- was excited to write my own for this project as an exercise but realized that it would take too long?
opencv

## Features
It does what it do

## Challenges
Signal Suppressor
CPU Fallback and OpenGL/CV over CUDA
Reactive vs event driven https://stackoverflow.com/questions/34495117/how-is-reactive-programming-different-than-event-driven-programming

## Shortcomings
Organization
Lack of a plan - didn't utilize all of SOLID principles was part of this
UX/UI - never went back to do a full QML menu implementation or design it out

## Try it Out!
Even though this project originated as an early teaching tool for myself, I believe it is still worth playing with.


Please download it!