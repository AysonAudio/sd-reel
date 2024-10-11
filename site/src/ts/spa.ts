// ##################################################################### //
// ############################ HELPER FUNCS ########################### //
// ##################################################################### //

/**
 * Runs a function after the DOM is loaded.
 */
const runAfterLoadDOM = (func: () => void) => {
    const state = document.readyState;
    if (state === "complete" || state === "interactive") func();
    else document.addEventListener("DOMContentLoaded", func);
};

// ##################################################################### //
// ############################# INIT FUNCS ############################ //
// ##################################################################### //

/**
 * Make all tab buttons:
 *   Hide / unhide content sections
 *   Set active tab button
 *   Pause all reel videos
 */
export const initTabBtns = () => {
    runAfterLoadDOM(() => {
        //// GET ELEMENTS ////
        const sections: { [index: string]: HTMLElement } = {
            portfolios: document.querySelector("#portfolios"),
            projects: document.querySelector("#projects"),
        };
        const tabBtns: NodeListOf<HTMLAnchorElement> =
            document.querySelectorAll("#tabs a");
        const reelVids: NodeListOf<HTMLVideoElement> =
            document.querySelectorAll("[id^='reel-vid-box-'] > video");

        //// INIT ALL TAB BUTTONS ////
        for (const tabBtn of tabBtns) {
            // Get tag of section to unhide. Extracts it from tab button class
            const targetSectionTag = tabBtn.className;

            tabBtn.addEventListener("click", () => {
                // Use CSS classes to hide / unhide content sections
                for (const id in sections) {
                    const section: HTMLElement = sections[id];
                    if (id === targetSectionTag)
                        section.classList.remove("is-hidden");
                    else section.classList.add("is-hidden");
                }
                // Use CSS classes to set active tab button
                for (const _tabBtn of tabBtns)
                    _tabBtn.parentElement.classList.remove("is-active");
                tabBtn.parentElement.classList.add("is-active");
                // Pause all reel videos
                for (const elem of reelVids) elem.pause();
            });
        }
    });
};

// -------------------------------------------------------------------------- //

/**
 * Make all page buttons:
 *   Hide / unhide content subsections
 *   Set active page button
 *   Pause all reel videos
 */
export const initPageBtns = () => {
    runAfterLoadDOM(() => {
        //// GET ELEMENTS ////
        const pages: { [index: string]: NodeListOf<HTMLElement> } = {
            portfolio: document.querySelectorAll("[id^='portfolio-']"),
            project: document.querySelectorAll("[id^='project-']"),
        };
        const pageBtns: { [index: string]: NodeListOf<HTMLAnchorElement> } = {
            portfolio: document.querySelectorAll("[id^='btn-portfolio-']"),
            project: document.querySelectorAll("[id^='btn-project-']"),
        };
        const reelVids: NodeListOf<HTMLVideoElement> =
            document.querySelectorAll("[id^='reel-vid-box-'] > video");

        //// HELPER FUNCTION THAT INITS ONE PAGE BUTTON ////
        const init = (pageBtn: HTMLAnchorElement) => {
            // Get id of page to unhide. Extracts it from page button id
            const pageId = pageBtn.id.slice("btn-".length);
            const pageType = pageId.slice(0, pageId.indexOf("-"));
            const pageNum = pageId.slice(pageId.indexOf("-") + 1);

            pageBtn.addEventListener("click", () => {
                // Use CSS classes to hide / unhide pages
                for (const elem of pages[pageType] as NodeListOf<HTMLElement>) {
                    if (elem.id === pageId)
                        for (const child of elem.children)
                            child.classList.remove("is-hidden");
                    else
                        for (const child of elem.children)
                            child.classList.add("is-hidden");
                }
                // Update screen reader metadata
                for (const _pageBtn of pageBtns[pageType]) {
                    _pageBtn.classList.remove("is-current");
                    _pageBtn.removeAttribute("aria-current");
                    _pageBtn.setAttribute(
                        "aria-label",
                        "Goto page " + (pageNum + 1)
                    );
                }
                pageBtn.classList.add("is-current");
                pageBtn.setAttribute("aria-label", "Page " + (pageNum + 1));
                pageBtn.setAttribute("aria-current", "page");
                // Pause all reel videos
                for (const elem of reelVids) elem.pause();
            });
        };

        //// INIT ALL PAGE BUTTONS ////
        for (const pageBtnListName in pageBtns) {
            for (const pageBtn of pageBtns[pageBtnListName]) init(pageBtn);

            // In each tab section, default to first page
            pageBtns[pageBtnListName][0]?.click();
        }
    });
};

// -------------------------------------------------------------------------- //

/**
 * Make all reel gallery menu buttons:
 *   Hide / unhide reel video boxes
 *   Set active menu button
 *   Pause all reel videos
 */
export const initReelBtns = () => {
    runAfterLoadDOM(() => {
        // Get elements
        const reelBtns: NodeListOf<HTMLAnchorElement> =
            document.querySelectorAll("[id^='reel-btn-']");
        const reelVidBoxes: NodeListOf<HTMLDivElement> =
            document.querySelectorAll("[id^='reel-vid-box-']");
        const reelVids: NodeListOf<HTMLVideoElement> =
            document.querySelectorAll("[id^='reel-vid-box-'] > video");

        for (const reelBtn of reelBtns) {
            // Get id of video to unhide. Extracts uuid substring from reel button id.
            const uuid = reelBtn.id.slice("reel-btn-".length);
            const boxId = "reel-vid-box-" + uuid;

            reelBtn.addEventListener("click", () => {
                // Use CSS classes to set active menu button
                for (const elem of reelBtns) {
                    if (elem.id === reelBtn.id) elem.classList.add("is-active");
                    else elem.classList.remove("is-active");
                }
                // Use CSS classes to hide / unhide reel video boxes
                for (const elem of reelVidBoxes) {
                    if (elem.id === boxId) elem.classList.remove("is-hidden");
                    else elem.classList.add("is-hidden");
                }
                // Pause all reel videos
                for (const elem of reelVids) elem.pause();
            });
        }
    });
};
