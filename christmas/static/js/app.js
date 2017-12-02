/**
 * Created by siaskov on 10/6/17.
 */


requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../static/js/app',
        jquery: '../static/js/lib/jquery-3.2.1.min',
        bootstrap: '../static/js/lib/bootstrap.min',
        lazy: '../static/js/lib/jquery.lazyload.min',
        mask: '../static/js/lib/bootstrap-formhelpers.min',
        phone: '../static/js/lib/bootstrap-formhelpers-phone',
        count: '../static/js/lib/jquery.countdown.min',
        countru: '../static/js/lib/jquery.countdown-ru',
        plugin: '../static/js/lib/jquery.plugin',
        zoomer: '../static/js/lib/zoomer'
    },
    shim: {
        'bootstrap': {
            deps: [ 'jquery' ],
            exports: 'bootstrap'
        },
        'lazy': {
            deps: [ 'jquery' ],
            exports: 'lazy'
        },
        'mask' : {
            deps: [ 'jquery' ],
            exports: 'mask'
        },
        'phone' : {
            deps: [ 'jquery' ],
            exports: 'phone'
        },
        'plugin' : {
            deps: [ 'jquery' ],
            exports: 'plugin'
        },
        'count' : {
            deps: [ 'plugin' ],
            exports: 'count'
        },
        'countru' : {
            deps: [ 'count' ],
            exports: 'countru'
        },
        'zoomer': {
            deps: [ 'count' ],
            exports: 'zoomer'
        }
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app/index']);
