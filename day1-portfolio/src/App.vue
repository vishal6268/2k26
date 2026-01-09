<script setup>
import { ref, onMounted } from 'vue'

const profile = ref({ name: '', role: '', about: '', skills: [] })
const petals = ref([])
const isAdmin = ref(false) // Secret Admin Mode

// 1. Fetch Data
const fetchData = async () => {
  try {
    const res = await fetch('https://twok26.onrender.com/api/profile')
    profile.value = await res.json()
  } catch (e) { console.error("Error loading data") }
}

// 2. Update Data (Day 5 Feature)
const updateProfile = async () => {
  try {
    const res = await fetch('https://twok26.onrender.com/api/profile/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile.value)
    })
    if(res.ok) {
      alert("Profile Updated Successfully! 😎")
      isAdmin.value = false
    }
  } catch (e) { alert("Update failed!") }
}

onMounted(() => {
  fetchData()
  // Sakura Animation
  for (let i = 0; i < 20; i++) {
    petals.value.push({ id: i, left: Math.random() * 100 + 'vw', delay: Math.random() * 10 + 's', duration: (Math.random() * 5 + 5) + 's' })
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
    
    <div v-for="p in petals" :key="p.id" class="petal" :style="{ left: p.left, animationDelay: p.delay, animationDuration: p.duration }"></div>

    <div class="z-10 bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-700 max-w-lg w-full transition-all hover:border-emerald-500">
      
      <div class="text-center mb-6">
        <div @click="isAdmin = !isAdmin" class="w-20 h-20 bg-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold cursor-pointer hover:rotate-12 transition">
          {{ profile.name.charAt(0) }}
        </div>
        <h1 class="text-3xl font-extrabold tracking-tighter uppercase">{{ profile.name }}</h1>
        <p class="text-emerald-400 font-medium">{{ profile.role }}</p>
      </div>

      <div class="mb-6">
        <h2 class="text-xs uppercase text-gray-500 font-bold mb-2 tracking-widest border-b border-gray-700 pb-1">About Polymath</h2>
        <p class="text-gray-300 leading-relaxed">{{ profile.about }}</p>
      </div>

      <div>
        <h2 class="text-xs uppercase text-gray-500 font-bold mb-3 tracking-widest border-b border-gray-700 pb-1">Tech Expertise</h2>
        <div class="grid grid-cols-2 gap-2">
          <span v-for="s in profile.skills" :key="s.name" :class="s.color" class="text-[10px] px-3 py-2 rounded-lg font-bold text-center uppercase shadow-md hover:scale-105 transition">
            {{ s.name }}
          </span>
        </div>
      </div>

      <div v-if="isAdmin" class="mt-8 p-4 bg-gray-700 rounded-xl border border-dashed border-emerald-500">
        <h3 class="text-sm font-bold mb-4 text-emerald-400">Admin Mode: Edit Profile</h3>
        <input v-model="profile.name" class="w-full bg-gray-800 p-2 rounded mb-2 text-sm" placeholder="Name">
        <input v-model="profile.role" class="w-full bg-gray-800 p-2 rounded mb-2 text-sm" placeholder="Role">
        <textarea v-model="profile.about" class="w-full bg-gray-800 p-2 rounded mb-2 text-sm" rows="3"></textarea>
        <button @click="updateProfile" class="w-full bg-emerald-600 py-2 rounded font-bold hover:bg-emerald-700 transition">SAVE CHANGES</button>
      </div>

      <button v-else class="w-full mt-8 bg-emerald-600 py-3 rounded-xl font-bold hover:bg-emerald-700 shadow-lg active:scale-95 transition">
        Hire This Polymath
      </button>
    </div>
  </div>
</template>

<style scoped>
@keyframes fall {
  0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
}
.petal {
  position: absolute; top: -5%; width: 10px; height: 10px;
  background-color: #ffb7c5; border-radius: 150% 0 150% 0;
  animation: fall linear infinite; z-index: 1;
}
</style>