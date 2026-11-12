# Verification

## Light theme and motion revision

- Added Lenis 1.3.27; package audit reported zero known vulnerabilities.
- Replaced homepage service accordion with six linked rounded light cards; retained all service detail routes.
- Verified white body surfaces and light headers on About, Services, Mobility, Products, HRMS, Careers, Jobs, Application, Insights, Article, Contact, Privacy, and Terms at a 390 × 844 viewport override. No horizontal document overflow was observed.
- Visually reviewed the dark animated network hero, light service card grid, light Staffing page, and mobile Products page.
- Verified the hero pause control changes to “Play background animation.”
- Verified the section anchor scrolls to expertise and service-card navigation resets the new page to the top.
- Verified mobile menu opening applies the Lenis stopped state, uses a white surface, and focuses its first link. Navigating to Products closes the menu, restores scrolling, and resets to the top.
- Reduced motion is explicitly handled by Lenis, Motion, the canvas scene, and the CSS. Native touch scrolling is retained.

- TypeScript and optimized Vite production build passed after updating React Router to 7.18.5 and Vite to 6.4.6.
- Package installation audit reported zero known vulnerabilities.
- Browser verified the homepage, mega-menu navigation, Staffing-specific FAQ, and loading of workplace photography.
- Mobile route sweep: About, all 10 service details, service index, product index and all 4 details, Careers, job index, 3 job details, application, Insights, 4 articles, Contact, Privacy, Terms, and 404 rendered the expected heading without horizontal document overflow at a 390 × 844 viewport override.
- Desktop homepage and tablet Mobility screenshots visually reviewed.
- Job keyword search returned the expected role; combining it with a nonmatching location displayed the empty state; reset restored all 3 sample roles.
- Contact form blocked incomplete required inputs. A valid demo enquiry displayed the explicit simulation confirmation. Product demo interest was preselected from the query string.
- Sample resume selected through the browser chooser. The application flow displayed the explicit confirmation that no application was sent and no file uploaded.
- Insights category filter returned the expected article; a nonmatching search displayed the empty state.
- Product tabs changed the preview and detail link. Arrow-key navigation selected the next tab.
- Browser console check reported no errors.

Limitations: No real video, backend, mail delivery, uploaded-file storage, CMS, live vacancies, or approved legal policies are included. Resume MIME content is not inspected in this frontend demonstration; a real upload backend must independently validate files. Company content marked as draft or illustrative requires review.
