/* *
 * Onload Scripts
 */

$(function () {
    $('[data-toggle="tooltip"]').tooltip()

    $(".selectpicker").select2({ width: "100%" });

    $('.dataTables_length').find("select").selectpicker({
        width: "60px",
        style: "border-light"
    });

    $(".list-group-item").on("click", function () {
        var eleIcon = this.getElementsByTagName("span")[2];
        eleIcon.classList.contains("bi-chevron-down")
            ? eleIcon.classList.replace(
                "bi-chevron-down",
                "bi-chevron-up"
            )
            : eleIcon.classList.replace(
                "bi-chevron-up",
                "bi-chevron-down"
            );
    });
});