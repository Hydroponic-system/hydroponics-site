(async () => {
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    async function extractProducts(level) {
        console.log(`Extracting ${level}...`);
        // Find the rows in the table
        const rows = document.querySelectorAll('tr.ant-table-row');
        const products = [];
        
        for (const row of rows) {
            try {
                // Product Name and ID are usually in the same cell or adjacent
                // Often the ID is in a separate span or part of a link
                const nameLink = row.querySelector('a[target="_blank"]');
                const name = nameLink ? nameLink.innerText.trim() : '';
                
                // ID might be in a text node or another element
                // Let's look for a string of numbers that looks like an ID
                const text = row.innerText;
                const idMatch = text.match(/\d{10,}/);
                const id = idMatch ? idMatch[0] : '';
                
                // Category - this might be harder. Let's look for text that looks like a category
                // Or find the category column.
                // Assuming it's in the table cells.
                const cells = row.querySelectorAll('td');
                // We'll need to inspect the table headers to be sure, but let's try to find it.
                // In many Alibaba tables, category is one of the columns.
                
                products.push({ id, name, level, category: 'Unknown' }); // Category will be refined
            } catch (e) {
                console.error(e);
            }
        }
        return products;
    }

    // Function to click tabs
    async function clickTab(tabText) {
        const tabs = Array.from(document.querySelectorAll('span, div, li')).filter(el => el.innerText && el.innerText.includes(tabText));
        for (const tab of tabs) {
            if (tab.innerText.includes('(')) {
                tab.click();
                await sleep(3000);
                return true;
            }
        }
        return false;
    }

    // Main execution
    const results = [];
    
    // First, clear filters if "暂无数据" is present
    if (document.body.innerText.includes('暂无数据')) {
        const clearBtn = Array.from(document.querySelectorAll('span, i')).find(el => el.innerText === '全部重点运营品' || (el.className && el.className.includes('ant-tag-close')));
        if (clearBtn) clearBtn.click();
        await sleep(2000);
    }

    // Process "爆品"
    await clickTab('爆品');
    results.push(...await extractProducts('Explosive'));

    // Process "优品"
    await clickTab('优品');
    results.push(...await extractProducts('Superior'));

    // Refine category if possible - usually in the product growth page it's visible in a column
    // Let's try to get all text from cells and pick the one that's not ID/Name/Metrics
    
    return results;
})();
