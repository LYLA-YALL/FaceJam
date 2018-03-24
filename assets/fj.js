var apiKey = "api_key=laayC4Q2zbJVehmHJQaShRBlXte6GOHY&";
var apiSecret = "api_secret=dAJDmzmDj5f_lj93y_AoEqhgtT0WGPLI&";
var returnAttribute = "return_attributes=emotion";

// Event listener for button element
$(".form-control-file").on("change", function () {

  // Grab form data, in this case, the image
  // var uploadForm = $("form[name=\"upload-form\"]")[0];

  // Place the grabbed image into a formData constructor to create a new FormData object
  formData = new FormData();

  var uploadedImage = $(".form-control-file")[0].files[0];
  console.log($(".form-control-file")[0].files[0]);

  formData.append("api_key", apiKey);
  formData.append("api_secret", apiSecret);
  formData.append("return_attribute", returnAttribute);
  formData.append("image_file",uploadedImage);

  console.log(formData);

  // // Alternate...
  // var formData = new FormData();
  // formData.append('section', 'general');
  // formData.append('action', 'previewImg');
  // // Attach file
  // formData.append('image', $('input[type=file]')[0].files[0]);

  // Constructing a URL to query Face++ for emotion reading

  var queryURL = "https://api-us.faceplusplus.com/facepp/v3/detect";

  // Performing our AJAX POST request
  $.ajax({
    url: queryURL,
    method: "POST",
    processData: false,
    contentType: "multipart/form-data",
    data: formData
  })
    // After the data comes back from the API
    .then(function (response) {
      // Storing an array of results in the results variable
      var results = response.data;

      var sadness = (response.faces.attributes.emotion.sadness) * 100;

      // Looping over every result item
      for (var i = 0; i < results.length; i++) {

        // Only taking action if the photo has an appropriate rating
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          // Creating a div with the class "item"
          var gifDiv = $("<div class='item'>");

          // Storing the result item's rating
          var rating = results[i].rating;

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + rating);

          // Creating an image tag
          var personImage = $("<img>");

          // Giving the image tag an src attribute of a proprty pulled off the
          // result item
          personImage.attr("src", results[i].images.fixed_height.url);

          // Appending the paragraph and personImage we created to the "gifDiv" div we created
          gifDiv.append(p);
          gifDiv.append(personImage);

          // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
          $("#gifs-appear-here").prepend(gifDiv);
        }
      }
    });
});
