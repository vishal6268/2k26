<script setup>
import { ref, onMounted } from 'vue'

// 1. Skills Data
const skills = ref([
  { name: 'Vue.js', color: 'bg-emerald-500' },
  { name: 'JavaScript', color: 'bg-yellow-400' },
  { name: 'Node.js', color: 'bg-green-600' },
  { name: 'Tailwind', color: 'bg-teal-500' },
  { name: 'Firebase', color: 'bg-orange-500' }
])

// 2. Sakura Logic
const petals = ref([])

onMounted(() => {
  for (let i = 0; i < 25; i++) {
    petals.value.push({
      id: i,
      left: Math.random() * 100 + 'vw',
      delay: Math.random() * 10 + 's',
      duration: (Math.random() * 5 + 5) + 's',
      size: (Math.random() * 10 + 5) + 'px'
    })
  }
})
</script>

<template>
  <div class="relative min-h-screen w-full bg-gray-900 overflow-hidden flex items-center justify-center p-6 font-sans">
    
    <div 
      v-for="p in petals" 
      :key="p.id" 
      class="petal"
      :style="{ 
        left: p.left, 
        animationDelay: p.delay, 
        animationDuration: p.duration,
        width: p.size,
        height: p.size
      }"
    ></div>

    <div class="relative z-20 max-w-md w-full bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-700 hover:border-emerald-500 transition-all duration-300 group">
      
      <div class="flex flex-col items-center mb-8">
        <div class="w-24 h-24 bg-linear-to-tr from-emerald-400 to-cyan-600 rounded-full mb-4 flex items-center justify-center text-3xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform">
          V
        </div>
        <h1 class="text-2xl font-bold text-white tracking-tight">VISHAL</h1>
        <p class="text-emerald-400 text-sm font-medium">Vue Full-Stack Developer</p>
      </div>

      <div class="mb-8">
        <h2 class="text-gray-300 text-xs uppercase tracking-widest font-semibold mb-3 border-b border-gray-700 pb-1">About Me</h2>
        <p class="text-gray-400 text-sm leading-relaxed">
          I build high-performance web apps using Vue 3 and Node.js. Focused on reactive UI and clean architecture.
        </p>
      </div>

      <div>
        <h2 class="text-gray-300 text-xs uppercase tracking-widest font-semibold mb-3 border-b border-gray-700 pb-1">Tech Stack</h2>
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="skill in skills" 
            :key="skill.name"
            :class="[skill.color, 'text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider hover:opacity-80 cursor-default transition-opacity']"
          >
            {{ skill.name }}
          </span>
        </div>
      </div>

      <button class="w-full mt-8 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg active:scale-95">
        Let's Connect
      </button>
    </div>
  </div>
</template>

<style scoped>
@keyframes fall {
  0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
}

.petal {
  position: absolute;
  top: -5%;
  background-color: #ffb7c5;
  border-radius: 150% 0 150% 0;
  pointer-events: none;
  z-index: 1; /* Card ke peeche */
  animation-name: fall;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
</style>