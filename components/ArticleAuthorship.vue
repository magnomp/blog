<script setup lang="ts">
const props = defineProps<{
    publishedDate: string
    author: string
    language: string
}>()
</script>

<template>
    <p class="text-sm pb-3">
        {{ props.language=='pt'?'Por':'By' }} <span class="font-semibold hover:text-gray-800">{{ props.author }}</span>, {{ props.language == 'pt'?'em':'on' }} {{ new
            Date(publishedDate).toLocaleString(language) }}
    </p>
</template>