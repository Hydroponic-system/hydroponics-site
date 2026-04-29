(async () => {
  const results = {
    suitableCrops: { status: 'Not found', brokenImages: [] },
    cropCycleTable: { status: 'Not found', brokenImages: [] },
    otherProfessionalSystems: { status: 'Not found', brokenImages: [] },
    consoleErrors: []
  };

  const checkImages = (container) => {
    const imgs = container.querySelectorAll('img');
    const broken = [];
    imgs.forEach(img => {
      if (!img.complete || img.naturalWidth === 0) {
        broken.push(img.src);
      }
    });
    return broken;
  };

  const findSectionByText = (text) => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6, b, strong, div'));
    return headings.find(el => el.textContent.trim().includes(text));
  };

  // Suitable Crops
  const suitableSection = findSectionByText('Suitable Crops');
  if (suitableSection) {
    let parent = suitableSection.parentElement;
    // Walk up a bit to find a container with images if the direct parent is just a heading
    const broken = checkImages(parent.closest('section') || parent.closest('div.container') || parent);
    results.suitableCrops.status = broken.length === 0 ? 'All Loaded' : 'Some Broken';
    results.suitableCrops.brokenImages = broken;
  }

  // Crop Cycle Table
  const tableSection = findSectionByText('Crop Cycle Table');
  if (tableSection) {
    let parent = tableSection.parentElement;
    const broken = checkImages(parent.closest('section') || parent.closest('div.container') || parent);
    results.cropCycleTable.status = broken.length === 0 ? 'All Loaded' : 'Some Broken';
    results.cropCycleTable.brokenImages = broken;
  }

  // Other Professional Systems
  const relatedSection = findSectionByText('Other Professional Systems');
  if (relatedSection) {
    let parent = relatedSection.parentElement;
    const broken = checkImages(parent.closest('section') || parent.closest('div.container') || parent);
    results.otherProfessionalSystems.status = broken.length === 0 ? 'All Loaded' : 'Some Broken';
    results.otherProfessionalSystems.brokenImages = broken;
  }

  // General 404 check from performance entries
  const performanceEntries = performance.getEntriesByType('resource');
  // Note: performance entries don't directly show status codes in JS for security, 
  // but we can infer from image dimensions or try to fetch some to verify if needed.
  // However, the task asked for console 404 errors. I will rely on the sub-agent's 'errors' action or just look at naturalWidth.
  
  return results;
})()