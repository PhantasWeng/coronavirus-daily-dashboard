<template>
  <div class="owltingNav">
    <div class="flex items-center flex-1">
      <img :src="logo" alt="owlting-logo" width="32" class="hidden md:block md:py-4 md:mr-8">
      <div>
        <div class="text-xs text-grey font-bold mb-4">Sponsor</div>
        <a href="http://www.owlting.com/" target="_blank" class="no-underline font-bold uppercase"><span class="text-blue-light">奧丁丁</span> <span class="text-red">Owlting</span></a>
      </div>
    </div>
    <div class="flex items-center flex-wrap justify-end">
      <template v-for="(link, index) in owltingLink">
        <a class="linkStyle" :href="link.url" target="_blank" :key="index">{{ link.name }}</a>
      </template>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/logo.png'
import owltingLink from '@/siteData/owltingLink'
export default {
  name: 'OwltingNav',
  data () {
    return {
      logo: logo,
      owltingLink: owltingLink
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.owltingNav
  @apply bg-black px-16 py-4
  @apply flex justify-between items-center
  @apply fixed w-full
  bottom: 0
.linkStyle
  @apply text-white text-sm no-underline capitalize ease inline-block px-8 leading-md
  &:hover
    @apply text-orange
</style>
