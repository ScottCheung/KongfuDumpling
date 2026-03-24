/** @format */

export function useImageUpload() {
  const handleImageUpload = async (
    file: File,
    category: string,
    itemName: string,
  ) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', category);
      formData.append('itemName', itemName);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        return data.path;
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Image upload failed');
      return null;
    }
  };

  return { handleImageUpload };
}
