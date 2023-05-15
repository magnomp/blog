<script setup lang="ts">
const props = defineProps<{
    language: string,
    disqusId: number
}>()

onMounted(() => {
    window['disqus_config'] = function () {
        this.language = props.language
        this.page.identifier = `${props.disqusId}_${process.env.NODE_ENV}`
        console.log(this.page)
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

