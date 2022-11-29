const enableRibbonDebugButton = document.getElementById('enableRibbonDebugButton');


enableRibbonDebugButton.addEventListener('click', activateDebugRibbon);

async function activateDebugRibbon() {

    const ribbonDebugString = "&flags=FCB.CommandChecker=true&ribbondebug=true";

    let currentTab = await GetCurrentTab();

    if (!currentTab)
        return;

    let baseUrl = currentTab.url;

    let composedUrl = baseUrl + ribbonDebugString;

    chrome.tabs.update(currentTab.id, {url: composedUrl});
}

async function GetCurrentTab() {
    let tabs = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tabs || tabs.length === 0)
        return null;

    let currentTab = tabs[0];

    if (currentTab && !currentTab.active)
        return null;

    if (!currentTab.url)
        return null;

    return currentTab;
}