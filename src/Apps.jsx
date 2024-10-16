import React, { useState } from 'react';

function Apps() {
  const [files, setFiles] = useState(null);
//   const uploadMutation = trpc.uploadFiles.useMutation();

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   if (!files) return;

  //   const formData = new FormData();
  //   Array.from(files).forEach(file => {
  //     formData.append('files', file);
  //   });

  //   console.log(formData.get('files'))

  //   // await uploadMutation.mutateAsync(formData);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    const filess = Array.from(files)
    const readers = filess.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            file,
            url: reader.result,
          });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then(images => {
      // setSelectedImages(prevImages => [...prevImages, ...images]);
      console.log(images)
    }).catch(error => {
      console.error("Failed to read file", error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="files" type="file" multiple onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default Apps;
