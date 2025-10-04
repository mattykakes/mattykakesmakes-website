---
title: "Minimum Resolution"
date: 2025-10-02T22:02:00-04:00
draft: false
lang: en
featured_image: images/pages/blog/minimum-resolution/frontend-anxiety-meme.png
featured_image_quality: 25
summary: An evidence-based look into minimum and maximum screen resolutions for business-focused desktop applications.
description: todo
author: Matthew Miller
authorimage: images/global/author.webp
categories: [Software, Design]
tags: [UX, UI, Screen, Monitor, Application, Frontend]
---

In todayʼs broad landscape of monitor configurations, itʼs easy to get lost trying to determine what requirements to use as bounds for officially supported hardware when building an application. The first and most important step in determining what to support is to know your audience. You should be able to generalize what _type_ of user-facing application you are developing. For desktop's, these fall into one of two main categories: <u>niche</u> and <u>general</u> computing.

Niche applications have specialized requirements and usually need to be categorized further. They represent the extremes when determining required screen size to perform a task. Software like high resolution imaging, studio recording, and gaming would be on one extreme while HMI's for control systems and keosk applications are on the other.

General computing applications include word processing, data analysis, communication, and design tools. They are the workhorses of the modern job. They constitute the majority of software that developers create and that employees rely on. While factors like productivity and corporate budgets often determine equipment choices, the problem persists: how to accurately assess the constraints placed on general application design.

## Market Trends
With so many options available, manufacturers provide guidance to help buyers balance screen size and resolution to best meet their needs. These recommendations typically consider factors such as the task at hand, available workspace, and budget.

HP's [Ultimate Guide to Choosing the Right Computer Display](https://www.hp.com/us-en/shop/tech-takes/what-are-typical-monitor-sizes) highlights market trends by outlining common size ranges for typical use cases and recommending resolutions for specific screen sizes. These recommendations align closely with those provided by other leading manufacturers.

#### Standard Monitor Sizes as defined by HP:
| Size Range    |	Typical Uses  | 
| ------------- | --------------- |
| 19-21 inches  | Compact displays for basic tasks and small spaces |
| __22-24 inches__  | __Popular for office use and general computing__ |
| 27-32 inches 	| Ideal for gaming, graphic design, and multitasking |
| 34+ inches 	| Ultrawide monitors for immersive experiences and professional use |

#### Common Monitor Resolutions as defined by HP:
* __1920 x 1080__ (Full HD): __Most common, suitable for 22-27 inch monitors__
* 2560 x 1440 (QHD): Popular for 27-32 inch monitors, offers sharper images
* 3840 x 2160 (4K UHD): High-resolution option for 27 inches and above
* 5120 x 2880 (5K): Premium resolution for large, high-end monitors

Even in today's market, standard HD screens remain popular. Based on the tables above, the correlating HD screen size and use case is consistent with the, somewhat dated, report from the Bureau of Labor Statistics on the [most common use cases for computers at work](https://www.bls.gov/opub/ted/2005/aug/wk5/art05.htm) news release from 2005 (USDL 05-1457) in the table below.

#### Types of Computer Activity Work, Oct 2003:

| Occupation and industry | Percent |
| ----------------------- | ------- |
| Internet or e-mail | 75.2 |
| Word processing or desktop publishing | 67.6 |
| Spreadsheets or databases | 64.2 | 
| Calendar or scheduling | 56.8 | 
| Graphics or design | 29.7 | 
| Programming | 16.4 |

I think it is safe to assume the largest change to these numbers in the last 20 years would be due to the rise in popularity of virtural meetings like [Zoom](https://www.zoom.com/) and [Teams](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software). If treating them like physical meetings and removing them from a more recent dataset I speculate the numbers would be largely the same with general computing dominating the landscape.

## Equipment Configuration
Two factors that greatly influence what resolution to support 

ultrawide vs dual setup and how ultrawide can be partitioned into two or three smaller screens (for size consideration. Look at samsung article on this one). But would follow the same trend in reducing virtual size if considering 3 monitors  [Samsung](https://www.samsung.com/us/monitors/monitor-buying-guide/best-monitor-size), [Lenovo](https://www.lenovo.com/us/en/glossary/how-big-is-my-monitor), talk about this in the part about how individual screen size shrinks

If you expect your software to be used on a multi screen setup, size down.

## Accounting for Scale Factor


## Conclusion
When IT and administrative departments budget for equipment, they typically aim to balance cost and productivity -- maximizing their return on investment. --- tie in why the research backs up what the manufacturers recommend in from their experience in the market and the BOL data




Cost constraints are also a driving factor in the popularity of

 Cost constraints -- talk about this here