/**
 * Created by siaskov on 10/6/17.
 */

require(['jquery', 'lazy', 'bootstrap', 'mask', 'phone', 'count', 'countru', 'zoomer'], function ($) {

    "use strict";

    var APP = APP || {};

    APP = {

        init: function () {
            this.makeAnimation();
            this.scrollDown();
            this.loadMore();
            this.catalogAnimation();
            //this.shoppingCart();
            this.sendModal();
            //this.openCheckOut();
        },
        makeAnimation: function () {

            var resize = function () {
                var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
                    minH = $('#header__nav').height();

                $('#promo').css('height', h);
            };

            resize();
            $(window).on('resize orientationChange', function(event) {

                //resize();
            });


            if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
                $('.js-catalog_ul').addClass('height-mozila');
            }

            $('.lazy__img').lazyload();

            $('body').scrollspy({ target: '#js-navbar-nav' });

            var newYear = new Date();
            newYear = new Date(newYear.getFullYear() + 1, 1 - 1, 1);

            $('.js-time').countdown({until: newYear});

            var $el = $('.js-zoomer');

            $el.mlens(
                {
                    imgSrc: $el.attr("data-big"),	  // path of the hi-res version of the image
                    imgSrc2x: $el.attr("data-big2x"),  // path of the hi-res @2x version of the image
                                                              //for retina displays (optional)
                    lensShape: "circle",                // shape of the lens (circle/square)
                    lensSize: ["150px","150px"],            // lens dimensions (in px or in % with respect to image dimensions)
                                                        // can be different for X and Y dimension
                    borderSize: 4,                  // size of the lens border (in px)
                    borderColor: "#fff",            // color of the lens border (#hex)
                    borderRadius: 0,                // border radius (optional, only if the shape is square)

                    overlayAdapt: true,    // true if the overlay image has to adapt to the lens size (boolean)
                    zoomLevel: 1,          // zoom level multiplicator (number)
                    responsive: true       // true if mlens has to be responsive (boolean)
                });

        },
        scrollDown: function () {
            $('.js-scroll-down').click(function (e) {
                e.preventDefault();

                var href = $(this).attr('href');

                $("html, body").delay(500).animate({
                    scrollTop: $(href).offset().top
                }, 500);

                $(".navbar-toggler").click();
            });
        },
        loadMore: function () {
            $('.js-load-more').click(function () {

                var catItemHeight = $('.js-catalog_ul li').height() + 27,
                    numberOfElements = $('.js-catalog_ul li').length;

                console.log(catItemHeight + ' ' + numberOfElements);

                var neededHeight = (numberOfElements * catItemHeight);

                $('.js-catalog_ul').css('max-height', neededHeight).addClass('is-open');

                $('.js-load-more').addClass('is-hidden');
                $('.js-load-less').removeClass('is-hidden');

            });

            $('.js-load-less').click(function () {


                $('.js-load-more').removeClass('is-hidden');
                $('.js-load-less').addClass('is-hidden');


                $('.js-catalog_ul').removeAttr('style').removeClass('is-open');

                $("html, body").animate({
                    scrollTop: $('.js-catalog_ul').offset().top
                }, 1500);

            });
        },
        catalogAnimation: function () {
            $(document).on('input change', '.js-range-cat', function() {

                var value = $(this).val();

                value = parseInt(value);

                var coefficient = $(this).data('coefficient');

                var productName = $(this).parent().parent().find('.js-get-product-name').html();

                $(this).parent().find('.js-range-width').html(value);

                $(this).parent().find('.js-show-price').html(value * coefficient + ' руб');

                $(this).parent().find('.js-order-btn').data('name', productName ).data('meters', value ).data('price', value * coefficient);


            });


            $('.js-open-catalog-page').click(function () {
                $('.js-open-catalog-page').removeClass('is-active');

                $('.js-catalog_page').removeClass('is-active');


                var href = $(this).data('href');

                $('#catalog').find("[data-href='" + href + "']").addClass('is-active');

            });
        },
        shoppingCart: function () {
            function Cart() {
                this.goods = [];
            }

            Cart.prototype.add = function(good, id) {
                this.goods.push({item: good, hash: id});
            };

            Cart.prototype.removeItem = function (index) {

                this.goods.splice(index, 1);

            };

            Cart.prototype.open = function () {
                $('#js-open-cst').addClass('cst-is-open');
                $('#js-consultant__wrapper').addClass('is-open');

            };

            Cart.prototype.close = function () {
                $('#js-open-cst').removeClass('cst-is-open');
                $('#js-consultant__wrapper').removeClass('is-open');
            };

            Cart.prototype.pointLast = function () {

                $('#js-place-for-messages .cst__msg-operator').removeClass('last').last().addClass('last');

            };


            Cart.prototype.clearCart = function () {
              this.goods = [];
            };


            Cart.prototype.submitCart = function () {

                var url = 'send.php',
                    formID = $(this).attr('id');

                $.ajax({
                    type: "POST",
                    url: url,
                    data: $('#js-modal__form').serialize(),
                    success: function(data)
                    {
                        $('.alert').removeClass('is-opened');
                        $('.alert-success').addClass('is-opened');
                        $('#js-modal__form')[0].reset();

                        $('#tel').removeClass('is-valid');

                        setTimeout(function () {
                            $('.alert').removeClass('is-opened').css('z-index', '1000');
                        }, 5000);
                    },
                    error: function (request, textStatus, errorThrown) {
                        $('.alert-danger').addClass('is-opened');

                        setTimeout(function () {
                            $('.alert').removeClass('is-opened').css('z-index', '1000');
                        }, 5000);
                    }
                });

            };


            Cart.prototype.renderHTML = function (list) {

                list.innerHTML = "";


                for (var i = 0; i < this.goods.length; i++ ) {
                    list.innerHTML += this.goods[i].item.toHTML(i);
                }

            };


            function Message(text, index) {
                this.text = text;
                this.index = index;

            }

            Message.prototype.toHTML = function (key) {

                var htmlString = '<div class="cst__msg-operator';
                htmlString += '">';
                htmlString += '<div class="msg-operator__message">';
                htmlString += '<div class="msg__content"><p>';
                htmlString += this.text;
                htmlString += '</p></div><div class="js-delete-item pointer" data-index="' + key + '">&#10006;</div>';
                htmlString += '</div></div><br/>';

                return htmlString;

            };


            var cart = new Cart();

            $('#js-open-cst').click(function () {

                if (cart.goods == 0) {
                    $('#js-place-for-messages').addClass('is-empty');
                } else {
                    $('#js-place-for-messages').removeClass('is-empty');
                }

                cart.open();
            });

            $('#js-close-cst').click(function () {
                cart.close();
            });

            $('#js-place-for-messages').on( "click", ".js-delete-item", function() {

                var i = $(this).data('index');

                cart.removeItem(i);

                cart.renderHTML(document.getElementById('js-place-for-messages'));
                cart.renderHTML(document.getElementById('js-place-for-orders'));


                //cart.pointLast();

            });

            $('.js-order-btn').click(function () {

                var meters = $(this).data('meters'),
                    productName = $(this).data('name'),
                    price = $(this).data('price'),
                    index = cart.goods.length,
                    newProduct = new Message(productName + ', ' + meters + 'м., ' + price + ' руб. ', index);


                cart.add(newProduct, index);

                cart.renderHTML(document.getElementById('js-place-for-messages'));
                cart.renderHTML(document.getElementById('js-place-for-orders'));

                var input_val = $('#js-modal_order').val();

                $('#js-modal_order').val(input_val += '' + productName + ', ' + meters + 'м., ' + price + ' руб.; ');


                console.log(cart.goods);

                if (cart.goods == 0) {
                    $('#js-place-for-messages').addClass('is-empty');
                } else {
                    $('#js-place-for-messages').removeClass('is-empty');
                }
                cart.open();

               // cart.pointLast();

            });


            $('#js-modal__form').submit(function (e) {
                e.preventDefault();


               cart.submitCart();


               cart.clearCart();

                $('.modal-checkout').modal('hide').removeClass('in').removeClass('show');
                $('.modal-backdrop').removeClass('show');

                cart.renderHTML(document.getElementById('js-place-for-messages'));
                cart.renderHTML(document.getElementById('js-place-for-orders'));

                cart.close();
            });


        },
        sendModal: function () {
            $('.js-form-submit').submit(function (e) {

                e.preventDefault();

                var url = 'send.php',
                    formID = $(this).attr('id');

                $.ajax({
                    type: "POST",
                    url: url,
                    data: $('#' + formID).serialize(),
                    success: function(data)
                    {
                        $('.alert').removeClass('is-opened').css('z-index', '1000');
                        $('.alert-success').addClass('is-opened');
                        $('#' + formID)[0].reset();

                        $('#tel').removeClass('is-valid');

                        setTimeout(function () {
                            $('.alert').removeClass('is-opened');
                        }, 5000);
                    },
                    error: function (request, textStatus, errorThrown) {
                        $('.alert-danger').addClass('is-opened').css('z-index', '1000');

                        setTimeout(function () {
                            $('.alert').removeClass('is-opened');
                        }, 5000);
                    }
                });


            });
        },
        openCheckOut: function () {

            $('.js-open-check-out').click(function () {

                if ($('#js-place-for-messages .cst__msg-operator').length === 0) {

                    return false;

                } else {

                    $('.modal-checkout').modal('show').addClass('in').addClass('show');
                    $('.modal-backdrop').addClass('show');
                }

            });
        }
    };

    APP.init();

});
