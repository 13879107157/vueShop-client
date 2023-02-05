
<template>
    <RouterView />
</template>
<script setup lang="ts">
import { clippingParents } from '@popperjs/core';
import { RouterView } from 'vue-router'
import { useRouter } from 'vue-router'


let token: string | null = localStorage.getItem('token')
if (token === null) {
    useRouter().push({ path: 'login1', replace: true })
}
</script>
<style scoped>

</style>