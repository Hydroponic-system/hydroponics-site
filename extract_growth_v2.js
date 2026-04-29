(async () => {
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    async function extractProducts(level) {
        console.log(`Extracting ${level}...`);
        const rows = document.querySelectorAll('tr.ant-table-row');
        const products = [];
        
        // Find column index for "商品类目" or similar
        const headers = Array.from(document.querySelectorAll('th')).map(th => th.innerText.trim());
        const categoryIdx = headers.findIndex(h => h.includes('类目') || h.includes('Category'));
        
        for (const row of rows) {
            try {
                const cells = row.querySelectorAll('td');
                const nameLink = row.querySelector('a[target="_blank"]');
                const name = nameLink ? nameLink.innerText.trim() : '';
                
                const text = row.innerText;
                const idMatch = text.match(/\d{10,}/);
                const id = idMatch ? idMatch[0] : '';
                
                let category = 'Unknown';
                if (categoryIdx !== -1 && cells[categoryIdx]) {
                    category = cells[categoryIdx].innerText.trim();
                } else {
                    // Fallback: look for typical categories in cells
                    for (let cell of cells) {
                        const cellText = cell.innerText;
                        if (cellText.includes('Tower') || cellText.includes('NFT') || cellText.includes('Bucket') || cellText.includes('System')) {
                            category = cellText.trim();
                            break;
                        }
                    }
                }
                
                products.push({ id, name, level, category });
            } catch (e) {
                console.error(e);
            }
        }
        return products;
    }

    async function clickTab(tabText) {
        const tabs = Array.from(document.querySelectorAll('span, div, li, text')).filter(el => el.innerText && el.innerText.includes(tabText));
        for (const tab of tabs) {
             // Look for the one that looks like a tab (often in a list or has specific classes)
             if (tab.innerText.trim().startsWith(tabText)) {
                tab.click();
                await sleep(3000);
                return true;
             }
        }
        return false;
    }

    const results = [];
    
    // Check if we need to clear filter
    const closeIcons = document.querySelectorAll('.ant-tag-close-icon, .anticon-close');
    for (let icon of closeIcons) icon.click();
    await sleep(1000);

    // Try to find tabs
    const tabLabels = ['爆品', '优品'];
    for (const label of tabLabels) {
        await clickTab(label);
        results.push(...await extractProducts(label));
    }

    return results;
})();
