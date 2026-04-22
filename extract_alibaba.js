(async () => {
  const data = {};
  
  // Extract Product Name
  data.productName = document.querySelector('h1')?.innerText || '';
  
  // Extract Image URLs
  const mainImages = Array.from(document.querySelectorAll('.main-image-thumb-item img, .image-list img'))
    .map(img => img.src.replace(/_\d+x\d+.*$/, '')); // Try to get original size
  data.images = [...new Set(mainImages)];

  // Extract Specifications from the table/list
  const specs = {};
  const specItems = document.querySelectorAll('.do-entry-item, .attribute-item');
  specItems.forEach(item => {
    const label = item.querySelector('.do-entry-item-label, .attribute-name')?.innerText?.trim();
    const value = item.querySelector('.do-entry-item-val, .attribute-value')?.innerText?.trim();
    if (label && value) specs[label] = value;
  });
  data.specs = specs;

  // Extract detailed description text if available
  data.description = document.querySelector('#product_description')?.innerText || document.querySelector('.product-description')?.innerText || '';

  return data;
})()