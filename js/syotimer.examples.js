jQuery(function($){
    /* Simple Timer. The countdown to 18:00 2020.10.01 */
    $('#simple-timer').syotimer({
        year: 2020,
        month: 10,
        day: 1,
        hour: 18,
        minute: 00,
    });


    /* Timer with Head and Foot. Countdown is over */
    $('#expired-timer').syotimer({
        year: 1990,
        headTitle: '<h3>Timer with header and footer. Countdown is over</h3>',
        footTitle: '<i style="color: brown;">Footer of timer.</i>'
    });


    $('#layout-timer_reversed-units').syotimer({
        hour: 0,
        minute: 0,
        second: 0,
        layout: 'smhd',

        headTitle: '<h3>Units of countdown in reverse order</h3>' +
            '<p>Demonstrate layout. ' +
            'Period is equal 2 days and 5 hours.</p>',
        effectType: 'opacity',

        periodic: true,
        periodInterval: 53,
        periodUnit: 'h'
    });


    /* Periodic Timer.
       Change options: doubleNumbers, effect type, language */
    var EFFECT_TYPES = ['opacity', 'none'],
        LANGUAGES = ['eng', 'rus', 'heb'],
        changeOptionsTimer = $('#periodic-timer_change-options'),
        changeOptionsEffectType = $('#change_options__effect-type'),
        changeOptionsDoubleNumbers = $('#change_options__double-numbers'),
        changeOptionsLang = $('#change_options__lang');

    changeOptionsTimer.syotimer({
        periodic: true,
        periodInterval: 10,
        periodUnit: 'd',
        headTitle: '<div>Effect type: ' +
                '<span class="option option_type_effect-type">none</span>' +
            '</div>' +
            '<div>Use double numbers: ' +
                '<span class="option option_type_double-numbers">true</span>' +
            '</div>' +
            '<div>Language: ' +
                '<span class="option option_type_language">eng</span>' +
            '</div>'
    });

    /**
     * Getting a next of current index of array by circle
     * @param array
     * @param currentIndex
     * @returns {*}
     */
    function getNextIndex(array, currentIndex) {
        return ( currentIndex === (array.length - 1) )
            ? 0
            : (currentIndex + 1);
    }

    /**
     * Update values in header title of timer `#periodic-timer_change-options`
     */


    changeOptionsEffectType.click(function() {
        var button = $(this),
            effectIndex = parseInt( button.data('index') ),
            nextEffectIndex = getNextIndex(EFFECT_TYPES, effectIndex);
        button.data('index', nextEffectIndex);
        changeOptionsTimer.syotimer(
            'setOption',
            'effectType',
            EFFECT_TYPES[nextEffectIndex]
        );
        updateOptionTitles();
    });
    changeOptionsDoubleNumbers.click(function() {
        var button = $(this),
            index = parseInt( button.data('index') ),
            useDoubleNumbers = Math.abs(index - 1);
        button.data('index', useDoubleNumbers);
        changeOptionsTimer.syotimer(
            'setOption',
            'doubleNumbers',
            useDoubleNumbers === 1
        );
        updateOptionTitles();
    });
    changeOptionsLang.click(function() {
        var button = $(this),
            langIndex = parseInt( button.data('index') ),
            nextLangIndex = getNextIndex(LANGUAGES, langIndex);
        button.data('index', nextLangIndex);
        changeOptionsTimer.syotimer(
            'setOption',
            'lang',
            LANGUAGES[nextLangIndex]
        );
        updateOptionTitles();
    });


/* Localization in timer.
   Add new language */

// Adding of a words for signatures of countdown
$.syotimerLang.neng = {
    second: ['secondone', 'secondfive', 'seconds'],
    minute: ['minuteone', 'minutefive', 'minutes'],
    hour: ['hourone', 'hourfive', 'hours'],
    day: ['dayone', 'dayfive', 'days'],
    handler: 'nengNumeral'
};

// Adding of the handler that selects an index from the list of words
// based on ahead the going number
$.syotimerLang.nengNumeral = function(number) {
    var lastDigit = number % 10;
    if ( lastDigit === 1 ) {
        return 0;
    } else if ( lastDigit === 5) {
        return 1;
    } else {
        return 2;
    }
};

$('#periodic-timer_localization_new-english').syotimer({
    lang: 'neng',
    layout: 'ms',
    periodic: true,
    periodInterval: 6,
    periodUnit: 'm',
    headTitle: '<h3>Adding new language</h3>' +
        '<p>Demonstrate adding the new language of signatures.</p>'
});
});
