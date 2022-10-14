$("#add-image").on("click", function () {
  //- $(this).css('background-color', '#fff');
  var imgCount = $(".img-list").children().length || 0;
  imgCount - 1 < maxImageCount
    ? $("#file-input").trigger("click")
    : swalWarning({
      title: "Warning",
      description: "The number of images has been limited.",
    });
});

$("#file-input").on("change", function (e) {
  e.preventDefault();
  if ($(this).val() != "") {
    $("#uploadForm").submit();
  }
});

// multi/part  form submit
$("#uploadForm").submit(function (e) {
  e.preventDefault();
  ajaxUploadForm({
    imgParentDiv: ".img-list",
    _this: this,
    token: token,
  });
  $("#file-input").val(null);
});

$(document).on("click", ".remove-file", function () {
  // remove element
  var backupSrc = $(this).closest("div").find("img.img").attr("src");
  var makeInput = `<input class="remove-files" type="hidden" name="remove_images[]" value=${backupSrc} />`;
  $(".remove-img-list").append(makeInput);
  $(this).parent().remove();
});
