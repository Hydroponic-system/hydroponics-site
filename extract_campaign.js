(async () => {
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    // 1. Change date to Last 30 Days
    const dateInput = document.querySelector('.ant-calendar-picker-input');
    if (dateInput) {
        dateInput.click();
        await sleep(1000);
        const last30DaysOption = Array.from(document.querySelectorAll('.ant-tag')).find(el => el.innerText.includes('最近30天') || el.innerText.includes('Last 30 days'));
        if (last30DaysOption) {
            last30DaysOption.click();
        } else {
            // Fallback: try to find by text in any element
            const any30 = Array.from(document.querySelectorAll('*')).find(el => el.innerText === '最近30天');
            if (any30) any30.click();
        }
        await sleep(3000);
    }

    // 2. Wait for table to load
    await sleep(2000);

    // 3. Extract products
    const rows = document.querySelectorAll('.ant-table-row');
    const products = [];
    
    // Find headers for CTR and Conversions
    const headers = Array.from(document.querySelectorAll('th')).map(th => th.innerText.trim());
    const ctrIdx = headers.findIndex(h => h.includes('点击率') || h.includes('CTR'));
    const inquiryIdx = headers.findIndex(h => h.includes('询盘') || h.includes('Inquiry'));
    const tmIdx = headers.findIndex(h => h.includes('TM') || h.includes('Consultation'));
    const orderIdx = headers.findIndex(h => h.includes('订单') || h.includes('Order'));

    for (const row of rows) {
        try {
            const cells = row.querySelectorAll('td');
            const ctrStr = ctrIdx !== -1 ? cells[ctrIdx].innerText.replace('%', '') : '0';
            const ctr = parseFloat(ctrStr);
            
            const inquiries = inquiryIdx !== -1 ? parseInt(cells[inquiryIdx].innerText) || 0 : 0;
            const tm = tmIdx !== -1 ? parseInt(cells[tmIdx].innerText) || 0 : 0;
            const orders = orderIdx !== -1 ? parseInt(cells[orderIdx].innerText) || 0 : 0;
            const conversions = inquiries + tm + orders;

            if (ctr > 3 || conversions >= 1) {
                // Extract ID
                const text = row.innerText;
                const idMatch = text.match(/\d{10,}/);
                const id = idMatch ? idMatch[0] : '';
                
                // Name
                const nameLink = row.querySelector('a');
                const name = nameLink ? nameLink.innerText.trim() : '';

                products.push({ id, name, ctr, conversions });
            }
        } catch (e) {}
    }
    return products;
})()
