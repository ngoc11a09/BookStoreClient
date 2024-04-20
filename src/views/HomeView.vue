<template>
  <v-sheet id="home" class="d-flex justify-center align-center text-center flex-column" color="blue-grey-darken-1"
    position="relative" min-height="600">
    <div class="text-h3 font-weight-medium mb-5">
      Welcome To Book Store Website
    </div>

    <div class="text-h6 font-weight-light mb-5" style="max-width: 468px;">
      Our book lending app provides a convenient platform for users to borrow and lend books.
    </div>
    <div class="text-about-me">
      <div class="text-h6 font-weight-light" style="max-width: 468px;">
        Created by Khuu Thi Bich Ngoc B2203514
      </div>
      <div class="text-h6 font-weight-light mb-5 float-end" style="max-width: 468px;">
        Email: ngocb2203514@student.ctu.edu.vn
      </div>
    </div>
  </v-sheet>
  <v-sheet id="features" class="text-center py-16">
    <div class="text-h4 font-weight-medium">
      Amazing Features
    </div>

    <div class="text-body-1 text-medium-emphasis my-5">
      Discover our features
    </div>

    <v-container>
      <v-row>
        <v-col v-for="item in features" :key="item.title" class="d-flex ga-5 pa-5 text-left" cols="12" md="4">
          <div class="mt-2">
            <v-img :src="item.icon" width="40" />
          </div>

          <div>
            <div class="text-h6 font-weight-bold">
              {{ item.title }}
            </div>

            <div class="text-body-1 text-medium-emphasis mt-2">
              {{ item.description }}
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
  <v-sheet id="about" class="py-16 text-center">
    <div class="text-h4 font-weight-bold">
      What We Do
    </div>

    <div class="text-body-1 font-weight-regular mt-3 text-medium-emphasis mb-12">
      Discover how our amazing team can help your business.
    </div>

    <v-container>
      <v-row>
        <v-col v-for="item in whatWeDo" :key="item.title" class="d-flex flex-column align-center" cols="12" md="4">
          <img :src="item.icon">

          <div class="text-h6 mt-1">
            {{ item.title }}
          </div>

          <div class="text-body-1 mt-2 text-medium-emphasis w-75">
            {{ item.description }}
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
<script setup lang="ts">
const whatWeDo = [
  {
    icon: './assets/what/analytics.png',
    title: 'Google Analitycs',
    description:
      'Type your description here!!!',
  },
  {
    icon: './assets/what/awareness.png',
    title: 'Brand Awareness',
    description:
      'Type your description here!!!',
  },
  {
    icon: './assets/what/design.png',
    title: 'Graphic Design',
    description:
      'Type your description here!!!',
  },
]
const features = [
  {
    icon: '/assets/features/support.png',
    title: 'Support 24/7',
    description:
      'Unwavering support whenever you need it: Offering assistance around the clock, 24 hours a day, 7 days a week.',
  },
  {
    icon: '/assets/features/user.png',
    title: 'User Friendly',
    description:
      'Ease your way: Simple solutions for seamless experiences.',
  },
  {
    icon: '/assets/features/bell.png',
    title: 'Notifications',
    description:
      'Stay updated: Instant alerts for effortless awareness.',
  },
  {
    icon: '/assets/features/accessibility.png',
    title: 'Accessibility',
    description:
      'Accessible to all: Our platform ensures inclusivity and ease of use. Join us for a seamless experience.',
  },
  {
    icon: '/assets/features/control.png',
    title: 'Control',
    description:
      'Empowerment through control: Our platform gives you the reins, allowing you to customize and manage your experience with ease. Take control and make the most of our versatile features.',
  },
  {
    icon: '/assets/features/chat.png',
    title: 'Chat With Us',
    description:
      'Engage with us: Start a conversation today and let us assist you every step of the way. Chat with us for personalized support and expert guidance.',
  },
]
</script>
<style>
.text-about-me {
  position: absolute;
  bottom: 0;
  align-items: center;
}
</style>