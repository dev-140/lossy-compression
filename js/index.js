$(document).ready(function () {
    $(".form-select").on("change", function () {
        var container = this.value;

        console.log(container);

        if (container == 1) {
            $(".body").removeClass("d-none");
            $(".container-2").addClass("d-none");
        } else {
            $(".body").removeClass("d-none");
            $(".container-1").addClass("d-none");
        }
    });

    // Calculate the file size
    function base64FileSize(base64String) {
        // The first part of the Base64 string (before the comma) contains metadata
        var stringLength = base64String.length - (base64String.indexOf(",") + 1);
        var sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
        return sizeInBytes;
    }

    // Handle image upload
    $("#imageUpload").change(function (e) {
        var file = e.target.files[0];

        if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
            var reader = new FileReader();

            // When the image is loaded, display it and compress it
            reader.onload = function (event) {
                var originalSrc = event.target.result;

                // Display the original image
                $("#originalImage").attr("src", originalSrc);
                $("#container").addClass("d-flex");

                // Show original file size
                var originalSize = file.size / 1024; // File size in KB
                $("#originalSize").text("File Size: " + originalSize.toFixed(2) + " KB");

                // Create an image object and compress the image using canvas
                var img = new Image();
                img.onload = function () {
                    // Compress image using Canvas API
                    var canvas = document.createElement("canvas");
                    var ctx = canvas.getContext("2d");

                    // Reduce dimensions by 50% (can be adjusted)
                    var newWidth = img.width * 0.5; // 50% of original width
                    var newHeight = img.height * 0.5; // 50% of original height

                    // Set canvas dimensions to the reduced image dimensions
                    canvas.width = newWidth;
                    canvas.height = newHeight;

                    // Draw the image on the canvas with the new dimensions
                    ctx.drawImage(img, 0, 0, newWidth, newHeight);

                    // Compress the image, maintaining PNG format
                    var compressedSrc = canvas.toDataURL("image/png");

                    // Display the compressed image
                    $("#compressedImage").attr("src", compressedSrc);

                    // Show compressed file size
                    var compressedSize = base64FileSize(compressedSrc) / 1024;
                    $("#compressedSize").text("File Size: " + compressedSize.toFixed(2) + " KB");
                };

                img.src = originalSrc; // Set image source for the img element
            };

            reader.readAsDataURL(file); // Read the image as a Data URL
        } else {
            alert("Please upload a valid JPEG or PNG image.");
        }
    });
});
