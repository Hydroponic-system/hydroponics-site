const fs = require('fs');
const path = require('path');

const files = [
    'index.html',
    'Inquiry.html',
    'TowerSystem.html',
    'NFTSystem.html',
    'DutchBucket.html',
    'Greenhouse.html',
    'SeedlingTray.html',
    'EbbFlow.html'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Replace Phone field
    // Match the entire flex container for phone
    const phoneFlexRegex = /<div class="flex">\s*<select[^>]*>[\s\S]*?<\/select>\s*<input type="tel"[^>]*>\s*<\/div>/g;
    
    content = content.replace(phoneFlexRegex, (match) => {
        if (file === 'index.html') {
            return `<input type="tel" placeholder="Phone Number" class="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:border-green-600 focus:bg-white transition" required>`;
        } else if (file === 'Inquiry.html') {
            return `<input type="tel" placeholder="Phone Number" class="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 text-sm focus:outline-none focus:border-green-500 transition">`;
        } else {
            // Product pages style
            return `<input type="tel" placeholder="WhatsApp / Phone" class="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white text-sm outline-none focus:border-green-500 transition">`;
        }
    });

    // 2. Replace Country field if exists as select
    const countrySelectRegex = /<select class="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:border-green-600 focus:bg-white transition appearance-none">\s*<option value="">Select Your Country<\/option>[\s\S]*?<\/select>/g;
    content = content.replace(countrySelectRegex, `<input type="text" placeholder="Your Country" class="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:border-green-600 focus:bg-white transition">`);

    // 3. Special case for Inquiry.html: add Country field if missing
    if (file === 'Inquiry.html' && !content.includes('Country')) {
        const insertionPoint = '<div>\n                                <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Product Interest</label>';
        const countryField = `<div>
                                <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Country</label>
                                <input type="text" placeholder="Your Country" class="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 text-sm focus:outline-none focus:border-green-500 transition">
                            </div>\n                            `;
        content = content.replace(insertionPoint, countryField + insertionPoint);
    }

    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
});
