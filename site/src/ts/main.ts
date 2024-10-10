import * as Spa from "./spa.js";

// ##################################################################### //
// ########################## INIT SPA BUTTONS ######################### //
// ##################################################################### //
document.addEventListener("DOMContentLoaded", () => {
    // Get elements
    const tabBtns: NodeListOf<HTMLAnchorElement> = document.querySelectorAll(
        "#tabs > .tabs > ul > li > a"
    );
    const portfolioPageBtns: NodeListOf<HTMLAnchorElement> =
        document.querySelectorAll("[id^='btn-portfolio-']");
    const projectPageBtns: NodeListOf<HTMLAnchorElement> =
        document.querySelectorAll("[id^='btn-project-']");
    const reelBtns: NodeListOf<HTMLAnchorElement> =
        document.querySelectorAll("[id^='reel-btn-']");

    // Init buttons
    for (const tabBtn of tabBtns) Spa.initTabBtn(tabBtn);
    for (const pageBtn of portfolioPageBtns) Spa.initPageBtn(pageBtn);
    for (const pageBtn of projectPageBtns) Spa.initPageBtn(pageBtn);
    for (const reelBtn of reelBtns) Spa.initReelBtn(reelBtn);

    // In each tab section, default to first page
    portfolioPageBtns[0]?.click();
    projectPageBtns[0]?.click();
});
