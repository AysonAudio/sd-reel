import * as App from "./app.js";

// ##################################################################### //
// ################## ADD FUNCTIONALITY TO SPA BUTTONS ################# //
// ##################################################################### //
document.addEventListener("DOMContentLoaded", () => {
    let cache = App.GetElemCache();

    // Init buttons
    for (const tabBtn of cache.tabBtns) App.initTabBtn(tabBtn);

    for (const pageBtn of cache.portfolioPageBtns) App.initPageBtn(pageBtn);
    for (const pageBtn of cache.projectPageBtns) App.initPageBtn(pageBtn);

    for (const reelBtn of cache.reelBtns) App.initReelBtn(reelBtn);

    // In each tab section, default to first page
    cache.portfolioPageBtns[0]?.click();
    cache.projectPageBtns[0]?.click();
});
