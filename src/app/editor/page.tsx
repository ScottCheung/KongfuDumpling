/** @format */

'use client';

import { useEffect } from 'react';
import { useMenuStore } from '@/lib/store/menu-store';
import { useLayoutStore } from '@/lib/store/layout-store';
import { MenuItem } from '@/types/menu';
import { motion } from 'framer-motion';
import { useEditorState } from './hooks/useEditorState';
import { useImageUpload } from './hooks/useImageUpload';
import { useMenuFilters } from './hooks/useMenuFilters';
import { EditorHeader } from './components/EditorHeader';
import { SearchFilters } from './components/SearchFilters';
import { MenuItemCard } from './components/MenuItemCard';
import { EditDrawerWrapper } from './components/EditDrawerWrapper';
import { EditCategoryDrawer } from './components/EditCategoryDrawer';
import { AddItemModal } from './components/AddItemModal';
import { SaveConfirmModal } from './components/SaveConfirmModal';
import { ManageTagsModal } from './components/ManageTagsModal';
import { GlobalDrawer } from '@/components/layout/global-drawer';
import menuData from '../../../data/menu.json';

export default function EditorPage() {
  const {
    categories,
    isLoaded,
    loadFromJSON,
    updateItem,
    updateCategory,
    addItem,
    deleteItem,
    resetItem,
    restoreFromBackup,
    getModifiedCount,
    saveChanges,
    getAllItems,
    setCategories,
  } = useMenuStore();

  const { actions: layoutActions } = useLayoutStore();

  const {
    editingId,
    setEditingId,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedTags,
    setSelectedTags,
    isAddingNew,
    setIsAddingNew,
    showSaveConfirm,
    setShowSaveConfirm,
    uploadingImage,
    setUploadingImage,
    newItemForm,
    setNewItemForm,
    isManagingTags,
    setIsManagingTags,
  } = useEditorState();

  const { handleImageUpload } = useImageUpload();

  useEffect(() => {
    if (!isLoaded) {
      setCategories(menuData.categories as any);
    }
  }, [isLoaded, setCategories]);

  const items = getAllItems();

  const categoryNames = ['all', ...categories.map((cat) => cat.name)];

  const filteredItems = useMenuFilters(
    items,
    searchTerm,
    selectedCategory,
    selectedTags,
  );

  const handleTagToggle = (
    type: 'ingredients' | 'flavors' | 'restrictions',
    tag: string,
  ) => {
    setSelectedTags((prev) => {
      const currentTypeTags = prev[type];
      const newTypeTags =
        currentTypeTags.includes(tag) ?
          currentTypeTags.filter((t) => t !== tag)
        : [...currentTypeTags, tag];
      return {
        ...prev,
        [type]: newTypeTags,
      };
    });
  };

  const handleEdit = (
    item: MenuItem & { category?: string; categoryId?: string },
  ) => {
    setEditingId(item.id);

    const category = categories.find(
      (cat) => cat.name === item.category || cat.id === item.categoryId,
    );

    if (!category) return;

    // Open drawer with edit form
    layoutActions.openDrawer({
      width: 600,
      content: (
        <EditDrawerWrapper
          item={item}
          onSave={async (updates) => {
            await updateItem(category.id, item.id, updates);
            setEditingId(null);
            layoutActions.closeDrawer();
          }}
          onCancel={() => {
            setEditingId(null);
            layoutActions.closeDrawer();
          }}
          onImageChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return null;

            setUploadingImage(true);
            const imagePath = await handleImageUpload(
              file,
              category.name,
              item.name,
            );
            setUploadingImage(false);

            return imagePath;
          }}
          uploadingImage={uploadingImage}
        />
      ),
    });
  };

  const handleNewItemImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file || !newItemForm.category || !newItemForm.name) {
      alert('Please fill in category and item name first');
      return;
    }

    setUploadingImage(true);
    const imagePath = await handleImageUpload(
      file,
      newItemForm.category,
      newItemForm.name,
    );
    setUploadingImage(false);

    if (imagePath) {
      setNewItemForm({ ...newItemForm, image: imagePath });
    }
  };

  const handleSaveChanges = () => {
    const modifiedCount = getModifiedCount();
    if (modifiedCount === 0) {
      alert('No changes to save');
      return;
    }
    setShowSaveConfirm(true);
  };

  const confirmSaveChanges = async () => {
    await saveChanges();
    setShowSaveConfirm(false);
    alert('Changes saved successfully!');
  };

  const getDeletedItems = () => {
    const { originalCategories } = useMenuStore.getState();
    const deletedItems: MenuItem[] = [];
    originalCategories.forEach((origCat) => {
      const currentCat = categories.find((cat) => cat.id === origCat.id);
      if (currentCat) {
        origCat.items.forEach((origItem) => {
          if (!currentCat.items.find((item) => item.id === origItem.id)) {
            deletedItems.push({ ...origItem, category: origCat.name } as any);
          }
        });
      }
    });
    return deletedItems;
  };

  const getAddedItems = () => {
    const { originalCategories } = useMenuStore.getState();
    const addedItems: MenuItem[] = [];
    categories.forEach((cat) => {
      const origCat = originalCategories.find(
        (origCat) => origCat.id === cat.id,
      );
      if (origCat) {
        cat.items.forEach((item) => {
          if (!origCat.items.find((origItem) => origItem.id === item.id)) {
            addedItems.push({ ...item, category: cat.name } as any);
          }
        });
      }
    });
    return addedItems;
  };

  const handleRestoreBackup = async () => {
    if (
      confirm(
        'Are you sure you want to restore from backup? This will overwrite all current data.',
      )
    ) {
      await restoreFromBackup();
      alert('Data restored from backup successfully!');
    }
  };

  const handleAddNew = async () => {
    if (!newItemForm.name || !newItemForm.category) {
      alert('Please fill in item name and category');
      return;
    }

    const category = categories.find(
      (cat) => cat.name === newItemForm.category,
    );
    if (!category) {
      alert('Category not found');
      return;
    }

    const { category: _, ...itemData } = newItemForm;
    await addItem(category.id, itemData);
    setIsAddingNew(false);
    setNewItemForm({
      category: '',
      name: '',
      price: 0,
      description: '',
      tags: {
        ingredients: [],
        flavors: [],
        restrictions: [],
      },
    });
    alert('New item added successfully!');
  };

  const handleDelete = async (
    categoryId: string,
    itemId: string,
    name: string,
  ) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      await deleteItem(categoryId, itemId);
      alert('Item deleted successfully!');
    }
  };

  const handleReset = async (categoryId: string, itemId: string) => {
    await resetItem(categoryId, itemId);
    alert('Item reset successfully!');
  };

  if (!isLoaded) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-background'>
        <div className='text-2xl font-bold text-ink-primary'>Loading...</div>
      </div>
    );
  }

  const modifiedCount = getModifiedCount();

  return (
    <div className='min-h-screen bg-background flex'>
      <div className='flex-1'>
        <EditorHeader
          modifiedCount={modifiedCount}
          onAddNew={() => setIsAddingNew(true)}
          onSaveChanges={handleSaveChanges}
          onRestoreBackup={handleRestoreBackup}
        />

        <div className='max-w-7xl mx-auto px-6'>
          <SearchFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categoryNames}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            onClearFilters={() =>
              setSelectedTags({
                ingredients: [],
                flavors: [],
                restrictions: [],
              })
            }
            onManageTags={() => setIsManagingTags(true)}
          />
        </div>

        <main className='max-w-7xl mx-auto px-6 py-8'>
          <SaveConfirmModal
            isOpen={showSaveConfirm}
            onClose={() => setShowSaveConfirm(false)}
            onConfirm={confirmSaveChanges}
            modifiedItems={items.filter((item) => item.isModified)}
            addedItems={getAddedItems()}
            deletedItems={getDeletedItems()}
            getOriginalItem={(id) => {
              for (const cat of categories) {
                const item = cat.items.find((item) => item.id === id);
                if (item) {
                  return useMenuStore.getState().getOriginalItem(cat.id, id);
                }
              }
              return undefined;
            }}
          />

          <AddItemModal
            isOpen={isAddingNew}
            onClose={() => {
              setIsAddingNew(false);
              setNewItemForm({
                category: '',
                name: '',
                price: 0,
                description: '',
                tags: {
                  ingredients: [],
                  flavors: [],
                  restrictions: [],
                },
              });
            }}
            newItemForm={newItemForm}
            onFormChange={(updates) =>
              setNewItemForm({ ...newItemForm, ...updates })
            }
            onImageChange={handleNewItemImageChange}
            uploadingImage={uploadingImage}
            categories={categoryNames.filter((cat) => cat !== 'all')}
            onSubmit={handleAddNew}
          />

          <ManageTagsModal
            isOpen={isManagingTags}
            onClose={() => setIsManagingTags(false)}
          />

          <div className='space-y-6'>
            {categories.map((category) => {
              const categoryItems = filteredItems.filter(
                (item) => (item as any).category === category.name,
              );
              if (categoryItems.length === 0) return null;

              return (
                <div
                  key={category.id}
                  className='bg-panel/80 backdrop-blur-sm rounded-[48px]  shadow-lg overflow-hidden border border-border'
                >
                  <div className='bg-primary relative p-card flex flex-col w-full items-start justify-start'>
                    <button
                      onClick={() => {
                        layoutActions.openDrawer({
                          width: 500,
                          content: (
                            <EditCategoryDrawer
                              categoryName={category.name}
                              categoryDescription={category.description}
                              onSave={(newName, newDesc) => {
                                updateCategory(category.id, {
                                  name: newName,
                                  description: newDesc,
                                });
                                layoutActions.closeDrawer();
                              }}
                              onCancel={() => {
                                layoutActions.closeDrawer();
                              }}
                            />
                          ),
                        });
                      }}
                      className='px-3 py-0.5 absolute right-8 top-8 bg-primary-foreground/20 hover:bg-primary-foreground/30 rounded-lg text-primary-foreground text-sm transition-colors'
                    >
                      Edit Category
                    </button>
                    <div className='flex w-full justify-start gap-3'>
                      <h2 className='text-2xl font-bold text-primary-foreground'>
                        {category.name}
                      </h2>
                    </div>
                    {category.description && (
                      <p className='text-sm text-primary-foreground/80 mt-1'>
                        {category.description}
                      </p>
                    )}
                  </div>
                  <div className='p-4 '>
                    {categoryItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <MenuItemCard
                          item={item}
                          onEdit={() =>
                            handleEdit({ ...item, categoryId: category.id })
                          }
                          onReset={() => handleReset(category.id, item.id)}
                          onDelete={() =>
                            handleDelete(category.id, item.id, item.name)
                          }
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
      <GlobalDrawer />
    </div>
  );
}
