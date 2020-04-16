<template>
    <div>
        <h1>Vue Router</h1>
        <p>
            <router-link :to="{ name: 'home' }">Home</router-link>
            <router-link :to="{ name: 'hello' }">Hello</router-link>
        </p>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {};
</script>
