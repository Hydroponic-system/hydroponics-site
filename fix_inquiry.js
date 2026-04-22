const fs = require('fs');
let content = fs.readFileSync('Inquiry.html', 'utf8');

if (!content.includes('Country')) {
    const regex = /<div>\s*<label[^>]*>Product Interest<\/label>/;
    const countryField = `<div>
                                <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Country</label>
                                <input type="text" placeholder="Your Country" class="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 text-sm focus:outline-none focus:border-green-500 transition">
                            </div>
                        `;
    content = content.replace(regex, (match) => countryField + match);
    fs.writeFileSync('Inquiry.html', content);
    console.log('Added Country field to Inquiry.html');
}
