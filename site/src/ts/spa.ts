// ##################################################################### //
// ############################ HELPER FUNCS ########################### //
// ##################################################################### //

/** Cache of elems manipulated by SPA */
type ElemCache = {
    ///// ----------------------------------------------------------------
    ///// SPA elements that are hidden / unhidden when buttons are clicked
    ///// ----------------------------------------------------------------

    /** index.html.haml */
    sections: {
        portfolios: HTMLElement;
        projects: HTMLElement;
    };
    /** index.html.haml */
    portfolioPages: NodeListOf<HTMLElement>;
    /** index.html.haml */
    projectPages: NodeListOf<HTMLElement>;
    /** sections/_reel-gallery.haml */
    reelVidBoxes: NodeListOf<HTMLDivElement>;

    ///// ---------------------------------------
    ///// SPA Buttons that hide / unhide elements
    ///// ---------------------------------------

    /** parts/_tab.haml */
    tabBtns: NodeListOf<HTMLAnchorElement>;
    /** sections/_nav.haml */
    portfolioPageBtns: NodeListOf<HTMLAnchorElement>;
    /** sections/_nav.haml */
    projectPageBtns: NodeListOf<HTMLAnchorElement>;
    /** sections/_reel-gallery.haml */
    reelBtns: NodeListOf<HTMLAnchorElement>;

    ///// -----------------------------------------------------------
    ///// Videos that stop playing when their SPA container is closed
    ///// -----------------------------------------------------------

    /** sections/_reel-gallery.haml */
    reelVids: NodeListOf<HTMLVideoElement>;
};

/**
 * Returns a cache of elems manipulated by SPA.
 * Created in an anonymous factory function.
 */
export const GetElemCache: () => ElemCache = (() => {
    let cache: ElemCache = {
        sections: {
            portfolios: document.querySelector("#portfolios"),
            projects: document.querySelector("#projects"),
        },
        portfolioPages: document.querySelectorAll("[id^='portfolio-']"),
        projectPages: document.querySelectorAll("[id^='project-']"),
        reelVidBoxes: document.querySelectorAll("[id^='reel-vid-box-']"),

        tabBtns: document.querySelectorAll("#tabs > .tabs > ul > li > a"),
        portfolioPageBtns: document.querySelectorAll("[id^='btn-portfolio-']"),
        projectPageBtns: document.querySelectorAll("[id^='btn-project-']"),
        reelBtns: document.querySelectorAll("[id^='reel-btn-']"),

        reelVids: document.querySelectorAll("[id^='reel-vid-box-'] > video"),
    };

    // Make cache immutable
    Object.freeze(cache);

    // Return function that returns cache
    return () => cache;
})();

// ##################################################################### //
// ############################# INIT FUNCS ############################ //
// ##################################################################### //

/**
 * Make a tab button:
 *   Hide / unhide content sections
 *   Set active tab button
 *   Pause all reel videos
 */
export const initTabBtn = (tabBtn: HTMLAnchorElement) => {
    let cache = GetElemCache();

    // Get tag of section to unhide. Extracts it from tab button class
    const targetSectionTag = tabBtn.className;

    tabBtn.addEventListener("click", () => {
        // Use CSS classes to hide / unhide content sections
        for (const id in cache.sections) {
            const section: HTMLElement = cache.sections[id];
            if (id === targetSectionTag) section.classList.remove("is-hidden");
            else section.classList.add("is-hidden");
        }
        // Use CSS classes to set active tab button
        for (const _tabBtn of cache.tabBtns)
            _tabBtn.parentElement.classList.remove("is-active");
        tabBtn.parentElement.classList.add("is-active");
        // Pause all reel videos
        for (const elem of cache.reelVids) elem.pause();
    });
};

/**
 * Make a page button:
 *   Hide / unhide content subsections
 *   Set active page button
 *   Pause all reel videos
 */
export const initPageBtn = (pageBtn: HTMLAnchorElement) => {
    let cache = GetElemCache();

    // Get id of page to unhide. Extracts it from page button id
    const targetPageId = pageBtn.id.slice("btn-".length);
    const targetPageType = targetPageId.slice(0, targetPageId.indexOf("-"));
    const targetPageNum = targetPageId.slice(targetPageId.indexOf("-") + 1);
    const targetPageBtnList = targetPageType + "PageBtns";
    const targetPagesList = targetPageType + "Pages";

    pageBtn.addEventListener("click", () => {
        // Use CSS classes to hide / unhide pages
        for (const elem of cache[targetPagesList] as NodeListOf<HTMLElement>) {
            if (elem.id === targetPageId)
                for (const child of elem.children)
                    child.classList.remove("is-hidden");
            else
                for (const child of elem.children)
                    child.classList.add("is-hidden");
        }
        // Update screen reader metadata
        for (const _pageBtn of cache[targetPageBtnList]) {
            _pageBtn.classList.remove("is-current");
            _pageBtn.setAttribute(
                "aria-label",
                "Goto page " + (targetPageNum + 1)
            );
            _pageBtn.removeAttribute("aria-current");
        }
        pageBtn.classList.add("is-current");
        pageBtn.setAttribute("aria-label", "Page " + (targetPageNum + 1));
        pageBtn.setAttribute("aria-current", "page");
        // Pause all reel videos
        for (const elem of cache.reelVids) elem.pause();
    });
};

/**
 * Make a reel gallery menu button:
 *   Hide / unhide reel video boxes
 *   Set active menu button
 *   Pause all reel videos
 */
export const initReelBtn = (reelBtn: HTMLAnchorElement) => {
    let cache = GetElemCache();

    // Get id of video to unhide. Extracts uuid substring from reel button id.
    const uuid = reelBtn.id.slice("reel-btn-".length);
    const boxId = "reel-vid-box-" + uuid;

    reelBtn.addEventListener("click", () => {
        // Use CSS classes to hide / unhide reel video boxes
        for (const elem of cache.reelVidBoxes) {
            if (elem.id === boxId) elem.classList.remove("is-hidden");
            else elem.classList.add("is-hidden");
        }
        // Use CSS classes to set active menu button
        for (const elem of cache.reelBtns) {
            if (elem.id === reelBtn.id) elem.classList.add("is-active");
            else elem.classList.remove("is-active");
        }
        // Pause all reel videos
        for (const elem of cache.reelVids) elem.pause();
    });
};
