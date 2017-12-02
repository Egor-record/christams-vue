<template lang="pug">
    .catalog
        .tabs-wrapper
            .tab-nav
                ul.list-unstyled.d-md-flex.justify-content-between
                    li.g-color-green.js-open-catalog-page(
                        v-for="category in categories"
                        :key="category.item"
                        v-bind:class="{ 'is-active': category.active }" ) {{ category.item }}
        .catalog_wrapper.pt-44.js-catalog_page
            ul.list-unstyled.row.catalog_wrapper__ul.js-catalog_ul
                li.col-12.col-md-6.col-lg-4(v-for="post in posts")
                    .cat__inner
                        .catalog_img.text-center
                        h3.g-color-dark-green.text-center.pt-7.pb-11.js-get-product-name {{ post.title }}
                        .d-flex.justify-content-between
                            div
                                .small Материал: PE+ПВХ
                                .small Цвет: зеленый

                            div
                                .small Производитель:
                                .small Подставка: пластмасса
                        .cat_range
                            button.btn.js-order-btn.g-bg-red.g-color-white.mt-8(@click="handleClick") Заказать
</template>

<script>

    import axios from 'axios';

    export default {
        name: 'catalog',
        data () {
            return {
                categories: [
                  { item: 'Классика', active: false },
                  { item: 'Премиум', active: false},
                  { item: 'Елки с декором', active: false},
                  { item: 'Дизайнерские', active: false},
                  { item: 'Украшения', active: false}
                ],
                posts: []
            }
        },
        methods: {
            handleClick()  {
                console.log('click!')
            }
        },
        created () {
            axios.get('/static/download.json')
                 .then(response => {

                     this.posts = response.data

                        //console.log(ress);

            }, function(errors) {

                console.log('error')

            }).catch(e => {

                console.log('Ошибка - ' + e);

                if (e.response) {

                }
            });
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .catalog_wrapper {
        opacity: 1;
        display: block;
    }

    .cat__inner {
        max-width: 232px;
        margin: 0 auto;
    }
</style>