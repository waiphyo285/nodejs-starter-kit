/* *
 * Common Scripts
 */

const version = apiVersionNum;

const headers = {
  "userrole": role,
  "x-access-method": signJwtMethod,
  "authorization": "Bearer " + token,
};

$("#dialogDeleteConfirm").on("show.bs.modal", function (event) {
  var button = $(event.relatedTarget);
  var id = button.data("id");
  $(this).attr("data-id", id);
  $(this).find("#dialogDelete").on("click", function (ev) {
    var deleteUrl = `./api/${version}` + `${pageEntry}/${id}`;
    submitAction(deleteUrl, function () {
      table.ajax.reload();
    });
  });
}).on("hide.bs.modal", function (event) {
  $(this).attr("data-id", "");
  $(this).find("#dialogDelete").off("click");
});

$("#entryForm").submit(function (e) {
  e.preventDefault();
  $.ajax({
    url: $(this).attr("action"),
    type: $(this).attr("method"),
    data: $(this).serialize(),
    headers: headers,
    success: function (data) {
      handleAlert(data);
    },
    error: function (error) {
      handleAlert(error.responseJSON)
    },
  });
});

function submitAction(url, callback) {
  $.ajax({
    url: url,
    type: "delete",
    headers: headers,
    success: function (data) {
      if (data && data.code == "200") {
        $("#alertActionError").hide();
        $("#alertActionSuccess").show();
        if (typeof callback === "function") {
          callback();
        }
      }
      else {
        $("#alertActionSuccess").hide();
        $("#alertActionError").show();
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      swalWarning({
        title: "Warning",
        description: errorThrown,
      });
    },
  });
}

function handleAlert(args, redirect = true) {
  if (args.code == "200") {
    $("#alertTitle").html("Success: ");
    $("#alertMessage").html("Save Successful.");
    $("#alertHandler").addClass("alert-success").show();
    var postFrm = $("#postSuccessForm");
    window.setTimeout(function () {
      if (redirect) postFrm.submit();
      $("#alertHandler").removeClass("alert-success").hide();
    }, 1 * 1000);
  }
  else {
    $("#alertTitle").html("Error: ");
    $("#alertMessage").html("Save Unsuccessful.");
    $("#alertHandler").addClass("alert-danger").show();
    window.setTimeout(function () {
      $("#alertHandler").removeClass("alert-danger").hide();
    }, 1 * 1000);
  }
}

function ajaxLoadOption(args) {
  var url = args.url || "#",
    type = args.type || "GET",
    showKey = args.showKey || "",
    selectId = args.selectId || "#",
    filerObj = args.filterObj || {};

  var apiUrl = `/api/${version}` + url;

  $.ajax({
    url: apiUrl,
    type: type,
    headers: headers,
    data: { ...filerObj },
    success: function (data) {
      var items = "";
      items += "<option value='' disabled selected>-- Please Select --</option>";
      if (data.code == "200" && $.isArray(data.data)) {
        $.each(data.data, function (i, item) {
          items += `<option value="${item["_id"]}">${item[showKey]}</option>`;
        });
      }
      else if (data.code == "200") { // for userrole [deprecated]
        $.each(Object.entries(data.data), function (i, item) {
          items += `<option value="${item[0]}">${item[0]}</option>`;
        });
      }
      $(selectId).html(items).val($(selectId).data("value"));
    },
  });
}

function ajaxUploadForm(args) {
  var imgParentDiv = args.imgParentDiv,
    _this = args._this;

  // multi/part form submit
  $.ajax({
    url: $(_this).attr("action"),
    type: $(_this).attr("method"),
    headers: headers,
    cache: false,
    contentType: false,
    processData: false,
    data: new FormData(_this),
    success: function (data) {
      if (data.code == "200") {
        var setSrc = data.data.path.replace("public", "");
        var makeImage = makeDivImage(setSrc);
        $(imgParentDiv).append(makeImage);
      }
    },
    error: function (error) {
      handleAlert(error.responseJSON)
    },
  });
}

function makeDivImage(setSrc) {
  return `
    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-2 item d-flex justify-content-center img-container">
      <input class="uploaded-files" type="hidden" name="images[]" value=${setSrc} />
      <img class="m-1 img img-thumbnail" src=${setSrc} alt="" srcset="" width="360" height="360"/>
      <button type="button" class="btn btn-sm remove-file"><i class="bi bi-trash3"/></button>
    </div>`;
}

function swalWarning(args) {
  const config = Object.assign({
    icon: "warning",
    title: "Warning",
    position: "center",
    description: "Something went wrong. Please try again.",
  }, args);

  Swal.fire({
    icon: config.icon,
    title: config.title,
    text: config.description,
    position: config.position,
    buttonsStyling: true,
    showConfirmButton: true,
    confirmButtonText: "CLOSE",
    customClass: "swal-style",
  });
}