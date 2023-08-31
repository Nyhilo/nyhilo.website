// Some shims and methods that should be moved to a common.js
function setCookie(cname, cvalue, exhours) {
    const d = new Date();
    d.setTime(d.getTime() + (exhours * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

$(document).ready(function () {
    var csrftoken = getCookie('csrftoken');

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
});

// Display powers
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

// New power gadget
(() => {
    const $newPowerResponse = $('#new-power-response')
    const $newPowerInput = $('#new-power-input');
    const $newPowerBtn = $('#new-power-button');

    let passwordVerified = getCookie('passwordVerified') == 'true';
    let passkey = getCookie('passkey');

    $newPowerInput.keydown((e) => { if (e.keyCode == 13) parseNewPowerInput(); })
    $newPowerBtn.click(parseNewPowerInput);

    let processing = false;
    function parseNewPowerInput() {
        // Ignore input if we're in the middle of something
        if (processing) return;

        processing = true;
        if ($newPowerBtn.hasClass('expand-btn')) {
            $newPowerBtn.removeClass('expand-btn');
            $newPowerBtn.addClass('flat-left');
            $newPowerBtn.html('↗');
            $newPowerInput.addClass('open');
            $newPowerInput.focus();
            processing = false;
            return;
        } else if (!passwordVerified) {
            checkPassword();
            return;
        } else {
            sendPowerSuggestion();
            processing = false;
            return;
        }
    }

    // To future explorers, if you're here to see if the passkey can be bypassed/figured out, yes it can
    // You COULD just run this ajax request with a password breaker, and my site would probably respond in kind
    // Please don't do that. This is just for funnies and all it will do is make me sad. Thank you.
    function checkPassword() {
        passkey = prompt('You need a key to do that. You got a key?');
        $.post(
            'passkey',
            { passkey: passkey },
            'json'
        ).done(() => {
            passwordVerified = true;
            setCookie('passwordVerified', 'true', 1)
            setCookie('passkey', passkey, 1)
            sendPowerSuggestion();
        }).fail(() => {
            alert('That ain\'t it, kid.')
        }).always(() => {
            processing = false;
        });
    }

    function sendPowerSuggestion() {
        const suggestion = $newPowerInput.val();

        // No blank suggestions
        if (!suggestion || suggestion.trim() === '') {
            processing = false;
            return;
        }

        $.post(
            'createpower',
            { description: suggestion, key: passkey },
            'json'
        ).done(() => {
            $newPowerInput.val('');
        }).always((data) => {
            $newPowerResponse
                // Cancel previous animation, if in progress
                .stop().fadeIn(0)
                // Update the content of the message
                .text(data)
                // Let the message sit a bit, then start fading it out
                .delay(1000).fadeOut(1000, () => { $(this).hide(); });

            processing = false;
        });
    }
})();