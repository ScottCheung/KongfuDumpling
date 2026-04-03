const fs = require('fs');
const path = require('path');

const menuPath = path.join(__dirname, 'data/menu.json');
const menu = JSON.parse(fs.readFileSync(menuPath, 'utf8'));

let maxId = 0;
menu.categories.forEach(cat => {
  cat.items.forEach(item => {
    if (item.id) {
      const numId = parseInt(item.id.replace(/\D/g, '')) || 0;
      maxId = Math.max(maxId, numId);
    }
  });
});

let newIdCount = maxId + 1;

menu.categories.forEach(cat => {
  cat.items.forEach(item => {
    if (!item.id) {
      item.id = `${newIdCount++}`;
    }
    // Ensure basic structures exist
    if (!item.tags) {
      item.tags = { ingredients: [], flavors: [], restrictions: [] };
    }
    if (!item.tags.ingredients) item.tags.ingredients = [];
    if (!item.tags.flavors) item.tags.flavors = [];
    if (!item.tags.restrictions) item.tags.restrictions = [];
    
    if (!item.options) item.options = [];
    
    if (item.isModified === undefined) item.isModified = false;
    if (item.modifiedFields === undefined) item.modifiedFields = [];
  });
});

fs.writeFileSync(menuPath, JSON.stringify(menu, null, 2));
console.log('Successfully updated menu.json with missing IDs and fields.');
