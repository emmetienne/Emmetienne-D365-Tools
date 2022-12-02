const enableRibbonDebugButton = document.getElementById('enableRibbonDebugButton');
const enablePerformanceMonitorButton = document.getElementById('enablePerformanceMonitorButton');

enableRibbonDebugButton.addEventListener('click', activateDebugRibbon);
enablePerformanceMonitorButton.addEventListener('click', activatePerformanceMonitor);

async function activateDebugRibbon() {

    const ribbonDebugString = "&flags=FCB.CommandChecker=true&ribbondebug=true";

    let currentTab = await GetCurrentTab();

    if (!currentTab)
        return;

    let baseUrl = currentTab.url;

    let composedUrl = baseUrl + ribbonDebugString;

    chrome.tabs.update(currentTab.id, { url: composedUrl });
}

async function activatePerformanceMonitor() {
    let currentTab = await GetCurrentTab();

    if (!currentTab)
        return;

    let currentUrl = new URL(currentTab.url);

    let key = "perf";
    let value = false;

    if (currentUrl.searchParams.has(key)){
        value = !currentUrl.searchParams.get(key);
    }
    else{
        value = true;
    }

    currentUrl.searchParams.set(key, value);
    chrome.tabs.update(currentTab.id, { url: currentUrl.href });
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