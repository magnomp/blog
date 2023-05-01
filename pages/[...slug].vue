<script setup lang="ts">
import IconInstagram from '~icons/fa-brands/instagram'
import IconGithub from '~icons/fa-brands/github'
import IconLinkedin from '~icons/fa-brands/linkedin'
import IconChevronUp from '~icons/fa-solid/chevron-up'
import IconChevronDown from '~icons/fa-solid/chevron-down'

interface Category {
  folder: string
  labelPt: string
  labelEn: string
}

const categories: Category[] = [
  { folder: 'kotlin', labelPt: 'Kotlin', labelEn: 'Kotlin' }
]

const isOpen = ref(false)

const { params } = useRoute()

const language = computed(() => params.slug?.length == 0 ? "pt" : params.slug[0].toLowerCase())

const slugs = computed(() => {
  if (!params.slug)
    return 0
  else if (params.slug[params.slug.length - 1] == "")
    return params.slug.length - 1
  else
    return params.slug.length
})

const mode = computed(() => {
  if (slugs.value == 0)
    return 'index'
  else if (slugs.value == 1)
    return 'index'
  else if ((slugs.value == 3) && (params.slug[1].toLowerCase() == "tag"))
    return 'tag_index'
  else
    return 'article'
})

</script>

<template>
  <!-- Top Bar Nav -->
  <nav class="w-full py-4 bg-blue-800 shadow">
    <div class="w-full container mx-auto flex flex-wrap items-center justify-between">

      <nav>
        <ul class="flex items-center justify-between font-bold text-sm text-white uppercase no-underline">
          <li><a class="hover:text-gray-200 hover:underline px-4" href="#">Shop</a></li>
          <li><a class="hover:text-gray-200 hover:underline px-4" href="#">About</a></li>
        </ul>
      </nav>

      <div class="flex items-center text-lg no-underline text-white pr-6">
        <a class="pl-6" href="https://instagram.com/magnomp">
          <IconInstagram/>
        </a>
        <a class="pl-6" href="https://github.com/magnomp">
          <IconGithub/>
        </a>
        <a class="pl-6" href="https://www.linkedin.com/in/magno-machado-b5557110/">
          <IconLinkedin/>
        </a>
      </div>
    </div>

  </nav>

  <!-- Text Header -->
  <header class="w-full container mx-auto">
    <div class="flex flex-col items-center py-12">
      <a class="font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl" href="#">
        Magno Machado Paulo
      </a>
      <p class="text-lg text-gray-600">
        Lorem Ipsum Dolor Sit Amet
      </p>
    </div>
  </header>

  <!-- Topic Nav -->
  <nav class="w-full py-4 border-t border-b bg-gray-100" x-data="{ open: false }">
    <div class="block sm:hidden">
      <a href="#" class="block md:hidden text-base font-bold uppercase text-center flex justify-center items-center"
        @click="isOpen = !isOpen">
        <IconChevronUp v-if="isOpen"/>
        <IconChevronDown v-else/>
      </a>
    </div>
    <div :class="isOpen ? 'block' : 'hidden'" class="w-full flex-grow sm:flex sm:items-center sm:w-auto">
      <div
        class="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
        <a :href="`/${language}/tag/${category.folder}`" class="hover:bg-gray-400 rounded py-2 px-4 mx-2"
          v-for="category in categories">{{ language == 'pt'?category.labelPt:category.labelEn }}</a>
      </div>
    </div>
  </nav>


  <div class="container mx-auto flex flex-wrap py-6">

    <!-- Posts Section -->
    <section class="w-full md:w-2/3 flex flex-col items-center px-3">

      <ArticleList v-if="mode == 'index'" :query="{ path: language }" :language="language" />
      <ArticleList v-else-if="mode == 'tag_index'"
        :query="{ path: language, where: [{ tags: { $contains: params.slug[2].toLocaleLowerCase() } }] }"
        :language="language" />
      <ArticleControl v-else :language="language" />

      <!-- Pagination: Por enquanto não terá -->
      <div class="flex items-center py-8" v-if="false">
        <a href="#"
          class="h-10 w-10 bg-blue-800 hover:bg-blue-600 font-semibold text-white text-sm flex items-center justify-center">1</a>
        <a href="#"
          class="h-10 w-10 font-semibold text-gray-800 hover:bg-blue-600 hover:text-white text-sm flex items-center justify-center">2</a>
        <a href="#"
          class="h-10 w-10 font-semibold text-gray-800 hover:text-gray-900 text-sm flex items-center justify-center ml-3">Next
          <i class="fas fa-arrow-right ml-2"></i></a>
      </div>

    </section>

    <!-- Sidebar Section -->
    <aside class="w-full md:w-1/3 flex flex-col items-center px-3">

      <div class="w-full bg-white shadow flex flex-col my-4 p-6">
        <p class="text-xl font-semibold pb-5">{{ language == 'pt'?'Sobre mim':'About me' }}</p>
        <p class="pb-2">Desenvolvendo profissionalmente desde 2004, e por hobby há mais alguns anos :) Do desktop ao
          cloud, passando pelo embedded sempre apreciando a troca de conhecimento. Aqui é onde exponho minhas divagações e
          espero aprender mais.</p>
        <a :href="language == 'pt'?'/en/':'/pt/'"
          class="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-4">
          {{ language == 'pt'?'Check my english blog':'Veja meu blog em português' }}
        </a>
      </div>

      <div class="w-full bg-white shadow flex flex-col my-4 p-6">
        <p class="text-xl font-semibold pb-5">Instagram</p>
        <div class="grid grid-cols-3 gap-3">
          <img class="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=1">
          <img class="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=2">
          <img class="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=3">
          <img class="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=4">
          <img class="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=5">
          <img class="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=6">
          <img class="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=7">
          <img class="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=8">
          <img class="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=9">
        </div>
        <a href="#"
          class="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-6">
          <IconInstagram class="mr-2" /> Follow!! @dgrzyb
      </a>
    </div>

  </aside>

</div></template>