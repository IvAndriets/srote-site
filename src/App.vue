<template>
    <div class="full_height">
        <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
            <a class="navbar-brand col-sm-3 col-md-2 mr-0"
               href="#">Shop name</a>
            <ul class="navbar-nav px-3">
                <li class="nav-item text-nowrap">
                    <a class="nav-link"
                       href="#">Sign in</a>
                </li>
            </ul>
        </nav>
        <div class="container-height container-fluid">
            <div class="row full_height">
                <side-bar-menu></side-bar-menu>
                <main role="main"
                      class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                    <router-view>

                    </router-view>

                </main>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'App',
    };
</script>

<style>
    html {
        height: 100%;
    }

    body {
        height: 100%;
    }

    .full_height {
        height: 100%;
    }

    .container-height {
        height: calc(100% - 40px);
    }
</style>
