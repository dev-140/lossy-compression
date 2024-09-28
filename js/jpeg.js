$(document).ready(function () {
  $("#fileUpload").on("change", function () {
    const fileInput = this;

    if (fileInput.files.length === 0) {
      return;
    }

    const file = fileInput.files[0];
    const quality = 0.01; // Set the desired quality level (0 to 1)

    // Create an image element
    const img = new Image();
    img.onload = function () {
      // Create a canvas to draw the image
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set the canvas dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0);

      // Get the original image size in KB
      const originalSizeInKB = (file.size / 1024).toFixed(2);
      $("#originalImg").attr("src", URL.createObjectURL(file));
      $("#originalImgSize").text(`File Size: ${originalSizeInKB} KB`);

      // Compress the image and get the data URL
      const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);

      // Display the compressed image
      $("#compressedImg").attr("src", compressedDataUrl);
      const compressedSizeInKB = (
        (compressedDataUrl.length * 3) /
        4 /
        1024
      ).toFixed(2);
      $("#compressedImgSize").text(`File Size: ${compressedSizeInKB} KB`);

      $("#imageContainer").addClass("d-flex");
    };

    // Read the uploaded image file
    const reader = new FileReader();
    reader.onload = function (e) {
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
});
