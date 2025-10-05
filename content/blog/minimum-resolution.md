---
title: "Minimum Resolution"
date: 2025-10-02T22:02:00-04:00
draft: false
featured_image: images/pages/blog/minimum-resolution/frontend-anxiety-meme.png
featured_image_quality: 25
summary: An evidence-based look into minimum and maximum screen resolutions for business-focused desktop applications.
description: An evidence-based opinion on minimum and maximum screen resolution requirements for general computing applications.
author: Matthew Miller
authorimage: images/global/author.webp
categories: [Software, Design]
tags: [UX, UI, Screen, Monitor, Application, Frontend]
---

In today’s wide range of monitor configurations, it can be difficult to define clear requirements for officially supported hardware when building an application. The most important step is knowing your audience. Broadly, desktop applications fall into two categories: _niche_ and _general_ computing.

Niche applications have specialized requirements and often require further categorization. They typically define the extremes of screen-size needs. Examples include high-resolution imaging, studio recording, and gaming on one end of the spectrum, and HMI control systems or kiosk applications on the other.

General computing applications, such as word processing, data analysis, communication, and design tools, form the backbone of modern work. They represent the majority of software built by developers and relied on by employees. Even with productivity needs and corporate budgets driving equipment choices, one challenge remains: how to accurately assess the design constraints for general applications.

## Equipment Configuration
An often overlooked factor influencing screen resolution is workspace configuration. If known, the workspace configuration that an application is intended for should influence its design. Preferred monitor size and configuration are dependent on one another as much as they are on external factors like task efficiency and available real estate. Fortunately, we can narrow the scope of supported sizes based on what is understood about these relationships. In the paragraphs below, monitors ranging from 20 inches to 27 inches were tested in both single and dual configurations. The preferred sizes vary depending on which metrics were prioritized.

In a study sponsored by [The Korean Society of Medical Informatics](https://www.kosmi.org/index_en.php), on [Monitor Preference for Electronic Medical Records in Outpatient Clinics](https://e-hir.org/journal/view.php?id=10.4258/hir.2012.18.4.266), 15 physicians were subjected to varying monitor sizes and configurations during real outpatient sessions. The study concluded that 27-inch WQHD monitors in outpatient settings, where desk space is often limited, had the highest level of user satisfaction. The survey participants also state that using 24-inch monitors in a dual configuration caused physical fatigue due to increased eye movement. This suggests an upper limit to preferred screen width for outpatient physician work. The study is limited in the sense that it investigated subject satisfaction without objective measuring tools. However, it does have advantages in how it evaluates monitor configurations against real work by attending physicians and how the physical constraints of their environment play a role in their preference.

When comparing productivity numbers between screen configurations, the [Jon Peddie Research](https://www.jonpeddie.com/) group found that [Multiple Displays can Increase Productivity by 42%](https://www.jonpeddie.com/news/jon-peddie-research-multiple-displays-can-increase-productivity-by-42/). In a 140-page report surveying over 1000 end users about using additional displays, they found that the addition of a second monitor alleviated the need for users to flip between windows by spreading their work across multiple screens. While this may not score the highest in sanctification rating, itʼs an important quantification. Equipment costs should also be considered in this equation. Two smaller monitors can often cost the same or less than one large, high-resolution monitor. Where workspace real estate allows, administrative decisions will likely lead to two small monitors over a large one, citing both measurable productivity gains and upfront cost when considering ROI on equipment.

Another study, [Productivity, Screens, and Aspect Ratios](https://collections.lib.utah.edu/ark:/87278/s69w3dmf) by the [University of Utah](https://www.utah.edu/), later [reported on by NPR](https://www.npr.org/2008/03/27/89140287/be-productive-get-a-bigger-screen), focused on quantifying how monitor size and aspect ratio affect productivity. They point out that the footprint of work being performed makes a difference in this quantification. In their tests, they compared the effectiveness of common editing work in text documents, spreadsheets, and data entry. They found that once you reach a 26-inch display, you start seeing diminishing returns over a 24-inch monitor – a 6% decline. This is especially true when compared to a 24-inch monitor in a dual configuration. They state, “if the work that you do can be handled easily in a 24-inch screen, going to a 26-inch screen might make you feel better about your work or feel better about yourself, but it probably is not going to change your performance, and actually, might cause a slight decline, because you have to manage more of that real estate on your desktop.” They also cite that with an aging workforce, those who do see a productivity gain from a larger 26-inch screen often do so because they can display text in a large type, which reduces eye strain and fatigue. However, increased scaling effectively reduces the usable space on screen.

Given the information in these studies, when optimizing for ROI, most monitors used for general computing and office work will likely range from 24 inches to 27 inches. These sizes provide the best balance of equipment cost and employee productivity compared to other options in the market. 

## Market Trends
In the absence of efficiency data, it is normal to lean on manufacturers’ market knowledge for equipment recommendations. Manufacturers often publish guidance to help users balance screen size and resolution to meet their needs. These recommendations typically consider factors like the task at hand and budget.

HP's [Ultimate Guide to Choosing the Right Computer Display](https://www.hp.com/us-en/shop/tech-takes/what-are-typical-monitor-sizes) highlights market trends by outlining common size ranges for typical use cases and recommending resolutions for specific screen sizes. These recommendations align closely with those provided by other leading manufacturers:

#### Standard Monitor Sizes as defined by HP
| Size Range    |	Typical Uses  | 
| ------------- | --------------- |
| 19-21 inches  | Compact displays for basic tasks and small spaces |
| __22-24 inches__  | __Popular for office use and general computing__ |
| 27-32 inches 	| Ideal for gaming, graphic design, and multitasking |
| 34+ inches 	| Ultrawide monitors for immersive experiences and professional use |

#### Common Monitor Resolutions as defined by HP
* __1920 x 1080__ (Full HD): __Most common, suitable for 22-27 inch monitors__
* 2560 x 1440 (QHD): Popular for 27-32 inch monitors, offers sharper images
* 3840 x 2160 (4K UHD): High-resolution option for 27 inches and above
* 5120 x 2880 (5K): Premium resolution for large, high-end monitors

Another metric to consider, in the age of remote work, is laptop screen sizes. HP's [How to Choose the Best Laptop Screen Size for Your Needs](https://www.hp.com/us-en/shop/tech-takes/choosing-the-best-laptop-screen-size) guide shows that laptops with screens 15 inches and smaller remain popular for portable general computing: 

#### Common Laptop Screen Sizes as defined by HP
* 11 to 12 inches: Ultraportable laptops
* 13 to 14 inches: Thin and light laptops
* __15 to 16 inches: Standard/mainstream laptops__
* 17 to 18 inches: Large screen/desktop replacement laptops

Even in today's market, standard HD screens remain popular. Based on the tables above, the correlating HD screen size and use case is consistent with the somewhat dated report from the Bureau of Labor Statistics on the [most common use cases for computers at work](https://www.bls.gov/opub/ted/2005/aug/wk5/art05.htm) news release from 2005 (USDL 05-1457) in the table below:

#### Types of Computer Activity Work, Oct 2003

| Occupation and industry | Percent |
| ----------------------- | ------- |
| Internet or e-mail | 75.2 |
| Word processing or desktop publishing | 67.6 |
| Spreadsheets or databases | 64.2 | 
| Calendar or scheduling | 56.8 | 
| Graphics or design | 29.7 | 
| Programming | 16.4 |

A safe assumption of changes in the BLS data over the last 20 years would be due to the rise in popularity of virtual meetings like [Zoom](https://www.zoom.com/) and [Teams](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software). If treating them like physical meetings and removing them from a more recent dataset, if one exists, I speculate the numbers would be largely the same -- with general computing dominating the landscape.

## Accounting for Scale Factor
Physical pixel count is only half of the equation. Operating systems often automatically scale text, icons, and other interface elements to counteract screens with a high pixel density from being hard to decipher. Windows does this using a metric called Dots Per Inch (DPI), and will calculate an automatic scale factor based on its value.

Pixel density is inversely proportional to screen size for a fixed resolution. This means that for a given resolution, a smaller physical screen size has a larger DPI value. Windows will automatically increase the DPI-based scale factor to keep the user interface accessible using this formula: `Scaling Factor = Display DPI / 96`. Knowing this, a 22-inch 1080p monitor will have a standard baseline for scaling of 100%. While 22 inches is considered small for desktop displays, it is much larger than most available laptop displays. On Windows, the typical recommended scale factor is 125% on this equipment.

As pointed out in the [University of Utah followup interview](https://www.npr.org/2008/03/27/89140287/be-productive-get-a-bigger-screen), we have to consider adjustments for an aging workforce. Users with poor eyesight will often adjust the scaling factor to 125% or higher to reduce eye strain and fatigue. In this case, a 1920 x 1080 at 125% effectively becomes 1536 x 864. Applications pushing the boundaries of a 1920 x 1080 resolution screen may experience scaling and clipping issues in this case.

## Conclusion
When IT and administrative departments budget for equipment, they typically aim to balance cost and productivity – maximizing their return on investment. Accounting for the research and manufacturers' recommendations, we can conclude that screens ranging from 14 inches to 27 inches with resolutions of 1080p and 1440p are commonplace.

To safely avoid poor accessibility and a frustrating user experience due to resolution scaling, all general computing and business-facing applications should be built to support a __minimum resolution of 1536 x 864 with a 100% scaling factor__. On higher DPI screens, the scaling factor will be adjusted so text and UI elements are functionally the same size as a screen with a lower DPI. Based on the cited evidence, this low water mark is a safe resolution to support without spending additional effort on smaller screens.

It’s less common to set an upper bound for screen resolution when building general applications. As Samsung points out in their Monitor Buying Guide, ultrawide aspect ratio monitors are used in a similar way to dual-screen configurations when performing general computing tasks. This aligns with the research on equipment configuration, where excessive horizontal space becomes exhausting to use and has diminishing returns – especially if prioritizing one application. The biggest risk is large, awkward gaps and dead space in flexible context panes. Good guidance for supporting large 4k screens and uncommon aspect ratios is to make menu and workspace panes resizable so users can adjust the application based on their workflow needs.
