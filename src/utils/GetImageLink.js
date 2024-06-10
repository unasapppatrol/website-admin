// Fungsi untuk mengubah tautan gambar dari Google Drive
export const getImageLink = async (link) => {
  var newLink = link.replace(
    "https://drive.google.com/uc?export=view&id=",
    "https://lh3.google.com/u/0/d/"
  );

  return newLink;
};
