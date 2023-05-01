<script setup lang="ts">
const props = defineProps<{
    language: string,
    disqusId: string
}>()

onMounted(() => {
    window['disqus_config'] = function () {
        this.language = props.language
        this.page.identifier = props.disqusId
    }

    useHead({
        script: [
            {
                src: `https://magnomachado-pt.disqus.com/embed.js`,
                'data-timestamp': new Date().toString()
            }
        ]
    })
})
</script>

<template>
    <div id="disqus_thread" class="m-4"></div>
</template>

