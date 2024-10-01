import * as Spa from "./spa.js";

// ##################################################################### //
// ################## ADD FUNCTIONALITY TO SPA BUTTONS ################# //
// ##################################################################### //
document.addEventListener("DOMContentLoaded", () => {
    let cache = Spa.GetElemCache();

    // Init buttons
    for (const tabBtn of cache.tabBtns) Spa.initTabBtn(tabBtn);

    for (const pageBtn of cache.portfolioPageBtns) Spa.initPageBtn(pageBtn);
    for (const pageBtn of cache.projectPageBtns) Spa.initPageBtn(pageBtn);

    for (const reelBtn of cache.reelBtns) Spa.initReelBtn(reelBtn);

    // In each tab section, default to first page
    cache.portfolioPageBtns[0]?.click();
    cache.projectPageBtns[0]?.click();
});
