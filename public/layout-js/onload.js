/* *
 * Onload Scripts
 */

$(function () {
    $('[data-toggle="tooltip"]').tooltip()

    $(".selectpicker").select2({ width: "100%" });

    $(".list-group-item").on("click", function () {
        var eleIcon = this.getElementsByTagName("span")[2];
        eleIcon.classList.contains("bi-chevron-compact-down")
            ? eleIcon.classList.replace(
                "bi-chevron-compact-down",
                "bi-chevron-compact-up"
            )
            : eleIcon.classList.replace(
                "bi-chevron-compact-up",
                "bi-chevron-compact-down"
            );
    });
});