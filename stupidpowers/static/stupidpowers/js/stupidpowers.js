(() => {
    Array.prototype.choose = function () {
        return this[Math.floor((Math.random() * this.length))];
    }

    // Populated in a <script> tag on the document by the server
    const powers = powers_global;

    const $gen = $("#generate-btn");
    const $output = $(".output");

    $gen.click(() => {
        let chosen = powers.choose();

        const $power = $('<h3 class="power text-center py-1"></h3>').html(chosen.power);
        // const $ruling = $('<h4 class="ruling text-center mb-3"></h4>').html(chosen.ruling);

        $output.prepend($power);
        // $output.prepend($ruling);
    });
})();