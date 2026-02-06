---
title: Kelvin Aerospace Lab White Paper
slug: About Us
sidebar_position: 2
date: 2025-10-22
---

![KAL](https://www.kelvinaero.org/images/klvweb.png)


## 1. EXECUTIVE SUMMARY

Kelvin Aerospace Lab (KAL) is a non-profit student-led organization founded in September 2025 dedicated to inspiring students' interest and curiosity in the fields of engineering, providing practical engineering opportunities through liquid rocket development, and advancing STEM accessibility in underserved communities. 


We believe that while robotics competitions offer valuable experience, they operate within established frameworks with predictable outcomes. KAL’s approach is fundamentally different. Development requires students to work with theory, design, simulation, control, manufacturing, and testing, where solutions are not predetermined. The level of complexity mirrors what engineers face in industry, providing students with irreplaceable experience in problem-solving.

Since our founding in September 2025, we have established a complete organizational infrastructure including a website for public outreach, a documentation platform for technical knowledge sharing, GitHub organizations for software tools and version control, and project management systems to track progress. We've completed computational analyses for a 200-Newton thrust engine, validated designs through ANSYS transient simulations, prototyped the scaled version of pintle injector, developed custom calculation software, and finalized test bench design and propellant feed systems. 

Our operation comprises 2 pillars: Engineering innovation develops rocket propulsion systems for educational and competition use, and Social support channels resources to schools lacking STEM programs through equipment donations, funding, software tools and documentation.

We are seeking sponsorship and partnership to accelerate our current development phase, and enable us to achieve our subsequent goals. By improving our technological level and expanding our charitable reach, more students will have access to STEM education, and more ideas will be realized. To support the sustainable model, accessible resources are indispensable, especially for creating pathways for underrepresented communities to participate in the rapidly evolving technological field.


---

## 2. VISION & MISSION

We envision aerospace engineering moving beyond corporate research facilities and making it accessible to motivated students eager for real-world engineering challenges. Exposing students to the complexities and uncertainties like liquid rocket propulsion is a good approach, helping students gain an overview of thermodynamics, fluid mechanics, control systems, electronics, and mechanical design.

Beyond being direct participants, we aspire for KAL to be a catalyst for STEM education accessibility. The rapid advancements in artificial intelligence and automation are accelerating technological change at an unprecedented pace, making early STEM education more crucial than ever.
We believe that STEM education and resources should be an important part of the future of basic education; therefore, a portion of future revenue funds this charitable mission, ensuring sustainability.

## 3. PROBLEM STATEMENT & OPPORTUNITY

### The Educational Gap in Hands-On Engineering

Modern STEM education at the secondary level faces a paradox: while theoretical content has become more advanced and accessible through online resources, opportunities for authentic hands-on engineering have become scarcer. Students can easily watch lectures from world-class researchers, yet rarely encounter the messiness of real engineering—the calculations and simulations that don’t initially converge, the prototypes that fail in unexpected ways, and the design for handling the coupling between multiple physical quantities. 

While traditional student engineering competitions are valuable, they are often conducted within a predetermined framework, limiting the scope of the problem. Robotics competitions provide a parts list, rules, and clearly defined objectives. Rocket competitions typically focus on solid rocket motors or commercially available engines with known performance characteristics. These structured environments can teach a large number of important skills, but they are fundamentally different from professional engineering practice. In professional engineering practice, requirements are often vague, solutions are uncertain, and success requires integrating knowledge from multiple disciplines, without a pre-defined path.

The consequences of this gap are significant. Students enter engineering programs having rarely designed something genuinely complex from first principles. They may excel at problem sets and exams, yet struggle when confronted with open-ended design challenges. The industry often reports that new graduates, despite having strong academic backgrounds, still require extensive mentorship to develop the judgment, interdisciplinary thinking, and resilience required to solve real-world engineering problems. To fill this gap, we are attempting this ambitious project that prepares students for post‑high‑school studies and work while also being structured enough to complete under appropriate guidance and safety protocols.

### Why We Choose to Develop the Liquid Rocket Engine

Liquid rocket engine development provides an ideal challenge. Unlike full rocket systems requiring extensive infrastructure and investments, a static test engine is developable with fewer resources while still demanding deep work across physics, electronics, and mechanical design. Participants, whether through simulation, fabrication, or testing, all gain the ability to overcome uncertainty, iterate and improve from failures, and most importantly, combine theory with practice.

It is precisely because engineering is a discipline that heavily relies on practice that we must choose an authentically difficult challenge, so we can create learning experiences that cannot be replicated through textbooks or lectures.

### Market and Social Opportunity

The STEM education market has grown substantially as awareness of skills gaps in engineering and technology has increased. Schools actively seek programs that provide authentic hands-on experience, however existing options often require significant cost to implement or come with prohibitive cost structures. Commercially available rocket engines are an example which offer limited customization options and are extremely expensive, while customizing a liquid engine from scratch requires expertise that most schools lack.

At the same time, a large number of aerospace enthusiasts, competition teams, and university teams are developing rockets, landers, and experimental aircraft. They currently either need to design propulsion systems from scratch or can only choose inferior solid rocket motors.

If an out-of-the-box liquid propulsion system with complete documentation, control electronics, and technical support can be provided, these teams can focus their efforts on aircraft design, control algorithms, and mission planning, rather than engine development. This indicates a potential business market that can both sustain KAL's operations and fund our philanthropic mission.

---

## 4. TECHNICAL STRATEGY
   
KAL's engineering approach is based on incremental iteration. We do not try to build the most ambitious system first, but follow a development path from rough to refined, achieving specific technical milestones at each stage and testing to validate core assumptions. We use this strategy to maintain a balance within limited resources and time constraints.

We believe secondary validation of data is crucial, which is why we chose to create our own computational software (KRA) and use it to generate data that is compared with commercial software to verify computational reliability. This is more prudent than treating commercial software as a black box and trusting results entirely, and it produces open-source resources that benefit the broader aerospace enthusiast community.

Simulations help us verify our designs with zero overhead. We use simulation to find problems and plan to compare simulation results with actual tests to identify parts that need adjustment.


### Current Status (February 2026)

The project has progressed through comprehensive planning and into detailed design and prototype validation. After four months of discussion and experimentation, we established technical roadmaps and organizational workflows. We then transitioned to basic design and development, and the results met expectations.

In computational analysis, we have completed full thermochemical calculations for a 200-Newton thrust engine using NASA CEA data and determined the engine's key dimensions and design. We also validated these results against Rocket Propulsion Analysis (RPA) software, achieving agreement within 3% on average across all major performance parameters.

In simulation, RPA is used for cooling channel design, and ANSYS transient simulations of the nozzle geometry confirm that thermal loads and flow characteristics meet design under operational conditions.

At the early design stage, we 3D-printed a regenerative cooling and injector model to understand the geometry. Similarly, an injector model is also being made to verify that our design is manufacturable and allows proper fluid flow paths. Water flow testing of this prototype confirmed the liquid collection chamber design under low pressure; however, actual performance still requires high-pressure testing. These low-cost validation tests help to refine our designs iteratively before investing in expensive metal 3D printing.

Test bench development has proceeded in parallel. We transitioned from Arduino-based prototypes to ESP32 microcontrollers to handle the increased sensor count and enable wireless telemetry. Our main assembly and development will take place after equipment procurement.

### Development Phases

The technical roadmap consists of distinct phases, each building upon validated results from the previous stages. 

**Phase 1: Room Temperature Gas-Fed Prototype Engine (Current - March)** establishes fundamental propulsion capability using gaseous oxygen and room-temperature ethanol as propellants, and ethanol as the regeneration coolant. The regenerative cooling design routes ethanol propellant through passages machined into the combustion chamber walls before injection, absorbing heat that would otherwise melt the chamber. Some of it will be used for liquid film cooling later, with a fuel-rich method to sacrifice some efficiency in exchange for lower wall temperatures.

After the test bench is completed, we plan to conduct hydrostatic testing, cold flow testing, and injector ignition to confirm that the system is functioning correctly and without leaks. For engine ignition, the goal is to achieve a stable combustion with our pintle injector design, validating nozzle performance under actual firing conditions, and demonstrating safe propellant feed and control systems. 

**Phase 2: Optimized Design and TVC System Research (March - May)** introduces a vector control and variable thrust system. We will optimize combustion and cooling efficiency which requires extensive testing to verify that thermal loads remain within material limits. We will also optimize injector atomization based on Phase 1 results, while also initiating research on movable pintle injector, closed-loop control and algorithms.

The success of this phase is to achieve stable combustion for 30 seconds and basic thrust vector control on the testbench.

**Phase 3: Advanced control systems (May - 2027)** develops thrust vector control (TVC), throttling, and hover capability for flight applications. We will implement PID control initially, then evaluate neural network-based controllers trained in simulation. Hover control requires processing multiple sensor inputs such as accelerometers, gyroscopes, thrust, propellant levels to command TVC gimbals and throttle valves. End-to-end neural networks can be trained in simulation and a virtual environment before hardware testing. This step will be the most difficult and will challenge the accuracy of the previous design.

### Tools and Methods

To achieve our goals, we chose a toolchain that was relatively easy to use yet still fit industry standards. CAD modeling uses Fusion 360 for mechanical design which allows us to balance between modeling speed and quality. Performance analysis relies on NASA CEA for thermochemical calculations and Rocket Propulsion Analysis (RPA) for design optimization, with our custom software (KRA) automating multi-parameter trade studies and verifications. ANSYS provides finite element analysis and computational fluid dynamics for detailed thermal and stress analysis. Electronics design employs KiCad for PCB layout and Arduino/ESP32 platforms for control hardware.

---

## 5. Social Impact and STEM Education Accessibility

The Social Impact pillar operates with its own budget and objectives, ensuring charitable activities received enough attention. We are identifying communities facing resource barriers, addressing specific needs and making STEM education accessible. Our target is underfunded districts where resources are scarce but interest is strong. The supports include equipment grants (3D printers, CNC machines, electronics) and documentation access. 

The funding comes from dedicated revenue streams separate from engineering operations. Our sponsors can direct contributions to charitable work, and future propulsion kit sales allocate a fixed percentage to this budget. We hope to provide ongoing support through this model.

---

## 6. FUNDING

### Why We Need Support

As a high school student organization, KAL faces resource challenges that distinguish us from university research groups or corporate R&D teams. We operate without institutional budgets, recurring appropriations or commercial revenue streams. Achieving our technical goal—developing a functional liquid rocket propulsion system with regenerative cooling and advanced control systems—requires real funding for almost every step from design to manufacturing and testing. However, traditional student fundraising such as bake sales and donation drives cannot generate the capital needed for our work. We need partners who agree with and support our goals, which creates both educational value and helps potential future engineers to grow.

### Funding Directions

**Phase 1 Engine Development (\$2000)**  
Our immediate need is completing our first gas-fed engine prototype and conducting cold flow and static fire tests. This includes component procurement ($300-500), test bench infrastructure ($1000), metal 3D printing ($300), fuel and preparation ($100), safety equipment and permits ($500). This phase will validate our engineering approach and prepare us for later development.

**Phase 2 Engine optimization and control system ($2000)**
After completing prototype testing, we will conduct research on engine optimization and control systems. This will improve combustion efficiency while reducing manufacturing costs to some extent. The development of Advanced Control Systems requires a longer timeframe and higher demands on hardware and software integration. This work will begin in the third quarter of 2026 and continue until 2027.

**Expand STEM Education ($5,000-10,000)**  

We have identified Indigenous schools and underfunded districts interested in partnerships. This funding will be used for donations. Initial charitable programs would serve 2-3 schools, to help us understand how to improve this project. The charitable pillar is separated from engineering funds, and sponsors can direct support specifically to education access.

**Organizational Infrastructure ($350)**  

We are considering registering as a formal non-profit organization (NPO) to ensure long-term viability. We hope to ensure the organization operates longer, serving a large student population, rather than disbanding after the current members graduate.

### How Sponsors Can Support Us

Organizations interested in partnership should contact us via [kelvinaero.org](http://kelvinaero.org) or email: [kelvinaero@proton.me](mailto:kelvinaero@proton.me). We welcome but are not limited to the following methods: 

**Financial Sponsorship**

Direct funding enables component purchases, fabrication services, venues and consumables. Sponsors can designate funds for engineering development, charitable programs, or general operations.

**Component Donations and Discounts**  

We are very grateful if liquid and gas valve manufacturers, sensor suppliers, electronics companies, and materials/profile providers can donate or offer discounts on components, which will greatly reduce our R&D costs.

**Equipment and Facility Access**  

We welcome assistance from relevant companies in providing site and fuel transportation, which would be of great help to us. We are currently in contact with the Rocketry Division of UMSATS in University of Manitoba for development and test site support.

**Technical Mentorship**

We are still in the early stages in this field, therefore guidance from professionals is highly welcome to help us avoid costly mistakes.

We will showcase the logos of our key partners and sponsors, and we welcome sponsor engagement through technical discussions and tracking.

---

## 7. RISKS & MITIGATION

Liquid rocket development involves inherent uncertainties. Manufacturing defects could cause hardware failures; test operations involve combustion and high-pressure propellants with inherent risks. For this reason, we mitigate these risks by using multiple tools to cross-validate the calculation results, and by planning full water pressure and cold flow tests plus a shorter first ignition to reduce uncertainty.

The static ignition will not occur until all other tests are completed.

---

## 8. CONCLUSION

We founded the Kelvin Aerospace Lab with the aim of exploring a possibility which is allowing students to truly participate in engineering practices that are closer to reality through the development of rocket engines, rather than being limited to the goals of competitions or textbook designs. Now, our preparing phase is nearing completion. We are going to take a new step forward, building upon our organizational structure, design, calculations, and simulation results, to bring the design to reality. The next sixteen months will bring us from first ignition toward flight capable solutions.

Beyond immediate engineering milestones, we are also building a sustainable organization serving students and communities. We have established our own project management and tracking system. Documentation and software will become resources for future teams. At the same time, we seek out and assist schools and institutions in resource-constrained communities to access STEM education hardware and software, building bridges to help achieve educational equality.

All of this wouldn't have been possible without the support of our sponsors and partners. We always welcome your participation and cooperation.

---

**More Informations**  
Website: [www.kelvinaero.org](http://www.kelvinaero.org)  
Documentation: [docs.kelvinaero.org](http://docs.kelvinaero.org)  
Email: [kelvinaero@proton.me](mailto:kelvinaero@proton.me)  


**Document Version**: 1.1

February 4, 2026

Kelvin High School

Kelvin Aerospace Lab

---

